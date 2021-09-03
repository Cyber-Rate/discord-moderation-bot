const Config = require('../../config.json')
const db = require("quick.db");
const tdb = new db.table("temp");
const client = global.client;
module.exports = () => {

    setInterval(() => {
        checkingAll();
    }, 5000);

    function checkingAll() {

        let mute = tdb.get("tempMute") || [];
        let vmute = tdb.get("tempVoiceMute") || [];


        for (let muteMember of mute) {
            let member = client.guilds.cache.get(Config.General.Server).members.cache.get(muteMember.id)

            if (Date.now() >= muteMember.bitis) {
                client.channels.cache.get(Config.Channels.Log).send(`${member} adlı kişinin mute cezası sona erdi.`)
                m.roles.remove(Config.Roles.Mute);
                tdb.set("tempMute", mute.filter(x => x.id !== muteMember.id));

            } else {
                if (member && !member.roles.cache.has(Config.Roles.Mute)) member.roles.add(Config.Roles.Mute).catch();
            }
        }

        for (let vMuteMember of vmute) {
            let member = client.guilds.cache.get(Config.General.Server).members.cache.get(vMuteMember.id);

            if (Date.now() >= vMuteMember.bitis) {
                if (member && member.voice.channel) {
                    client.channels.cache.get(Config.Channels.Log).send(`${member} adlı kişinin voice mute cezası sona erdi.`);
                    member.voice.setMute(false);
                    if (member.roles.cache.has(Config.Roles.VoiceMute)) member.roles.remove(Config.Roles.VoiceMute);
                    tdb.set("tempVoiceMute", vmute.filter(x => x.id !== vMuteMember.id));
                } else {
                    if (member && !member.voice.channel) {
                        client.channels.cache.get(Config.Channels.Log).send(`${member} kişisinin sesli mute cezası sona erdi fakat sesli bir odada bulunmadığı için susturması kaldırılamadı.`)
                        tdb.set("tempVoiceMute", vmute.filter(x => x.id !== vMuteMember.id));
                        member.roles.remove(Config.Roles.VoiceMute);
                        member.send('Sesli kanallarda susturulma cezanız sonlanmıştır fakat sesli bir kanalda olmadığınız için kaldırılamamıştır. Lütfen bir yetkiliye durumu bildirerek cezanızı kaldırmasını isteyiniz.').catch()
                    }
                }
            }
        }
    }
}