const Discord = require("discord.js")
const ayar = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')
const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const kdb = new db.table("kullanıcı")
const moment = require("moment")
const ms = require("ms")

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(roller.muteyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
    let embed = new MessageEmbed().setColor('RED')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    let reason = args.splice(2).join(" ") || "Belirtilmedi."
    if (!user) return message.channel.send(embed.setDescription(`${message.author} kime cezalandıracağını yazmadın! \`.mute @Cyber/ID <süre> <sebep>\``).setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (!args[1]) return message.channel.send(embed.setDescription(`${message.author} chat-mute süresi belirtmedin! \`.mute @Cyber/ID <süre> <sebep>\``).setFooter(ayar.footer).setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    let sure = args[1]
        .replace("s", " Saniye")
        .replace("m", " Dakika")
        .replace("h", " Saat")
        .replace("d", " Gün")

    if (user.id === client.user.id) return message.react(ayar.carpi)
    if (user.roles.highest.position >= message.member.roles.highest.position) return message.react(ayar.carpi)
    if (user.id === message.author.id) return message.react(ayar.carpi)

    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let bitişAy = moment(Date.now() + ms(args[1])).format("MM");
    let bitişSaat = moment(Date.now() + ms(args[1])).format("HH:mm:ss");
    let bitişGün = moment(Date.now() + ms(args[1])).format("DD");
    let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;
    let cezaID = db.get(`cezaid.${message.guild.id}`) + 1
    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
    let durum = await kdb.get(`durum.${user.id}.mute`)
    if (durum) return message.channel.send(embed.setDescription(`Kullanıcı zaten muteli.`).setTimestamp().setFooter(ayar.footer))

    user.roles.add(roller.muteli)
    message.react(ayar.onay)
    message.channel.send(embed.setDescription(`${user} kullanıcısı ${message.author} tarafından **${reason}** sebebiyle  \`${sure}\` süresince chat-mute cezası verdi.`).setTimestamp().setFooter(ayar.footer)).then(x => x.delete({ timeout: 7000 }) && message.delete({ timeout: 6999 }))

    db.add(`cezaid.${message.guild.id}`, +1)
    db.add(`ceza.${message.author.id}.mute`, 1)
    kdb.add(`cezapuan.${user.id}`, 5)
    kdb.push(`sicil.${user.id}`, { userID: user.id, adminID: message.author.id, Tip: "Chat-Mute", start: muteAtılma, cezaID: cezaID })
    kdb.set(`durum.${user.id}.mute`, true)

    client.channels.cache.get(kanallar.penalties).send(embed.setDescription(`
    
    \`•\` Ceza ID: \`#${cezaID}\`
    \`•\` Mutelenen Kullanıcı: ${user} (\`${user.id}\`) 
    \`•\` Muteleyen Yetkili: ${message.author} (\`${message.author.id}\`)
    \`•\` Mute Süresi: \`${sure}\`
    \`•\` Mute Sebebi: \`${reason}\`
    \`•\` Mute Tarihi: \`${muteAtılma}\`
`).setFooter(ayar.footer).setTimestamp())

    setTimeout(async() => {
        let data = await kdb.get(`durum.${user.id}.mute`)
        if (!data) return;
        if (!user.roles.cache.has(roller.muteli)) return;
        user.roles.remove(roller.muteli)
        let log = client.channels.cache.get(kanallar.penalties)
        if (log) log.send(embed.setDescription(`${user} kullanıcısının **chat-mute** ceza süresi bittiği için mutesini açtım.`).setTimestamp().setFooter(ayar.footer))
        kdb.delete(`durum.${user.id}.mute`)
    }, ms(args[1]))}

exports.conf = {enabled: true, guildOnly: true, aliases: ['chatmute', 'chat-mute', 'cmute'], permLevel: 0}
exports.help = {name: 'mute'}