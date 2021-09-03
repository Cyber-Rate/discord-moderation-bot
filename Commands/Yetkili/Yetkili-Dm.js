const Discord = require('discord.js');
const Config = require('../../config.json')
const ayarlar = require('../../roller.json')
const kanallar = require('../../kanallar.json')
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.react(Config.carpi)
        return message.channel.send(` ${ayarlar.EKO}`).then(m => m.delete({ timeout: 8000 }))
    }
    let enAltYetkiliRolü = message.guild.roles.cache.get(ayarlar.registeryetki); //dauren

    let yetkililer = message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= enAltYetkiliRolü.position && uye.presence.status !== "offline" && !uye.voice.channel).array();
    if (yetkililer.length == 0) return message.reply('Aktif olup, seste olmayan yetkili bulunmuyor!');
    let mesaj = await message.channel.send(`Aktif olup seste olmayan **${yetkililer.length}** Yetkiliye ses çağrısı yapmak istiyor musunuz? (evet/hayır)`);
    var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
    message.channel.awaitMessages(filter, { max: 1, timeout: 10000 }).then(collected => {
        let cevap = collected.first();
        if (cevap.content.toLowerCase().startsWith('hayır')) {
            message.react(Config.onay)
            return message.channel.send(` İşlem iptal edildi!`)//.then(m => m.delete({timeout: ayarlar.basarili}))
        }
        if (cevap.content.toLowerCase().startsWith('evet')) {
            yetkililer.forEach((yetkili, index) => {
                message.react(Config.onay)
                setTimeout(() => {
                    yetkili.send(`selam ekibimizin aktiflihi için sesli odalara geçermisin. İşin varsa afk odalarda durabilirsin.`).then(x => mesaj.edit(new Discord.MessageEmbed().setDescription(`${yetkili} yetkilisine özelden mesaj atıldı!`).setColor(message.member.displayHexColor))).catch(err => message.channel.send(`${yetkili}, aktifsin fakat ses kanallarında değilsin!`).then(x => mesaj.edit(new Discord.MessageEmbed().setDescription(`${yetkili} yetkilisine özelden mesaj atılamadığı için kanalda etiketlendi!`).setColor(message.member.displayHexColor))));
                }, index * 1000);
            });
        };
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yetkiliçağır", "yetkili-çağır", "yçağır"],
    permLevel: 0
};

exports.help = {
    name: 'yetkili-çağır',
    description: 'Sayım yapar.',
    usage: 'yetkili-çağır',
    kategori: 'yetkili'
};