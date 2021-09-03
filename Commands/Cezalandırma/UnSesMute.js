const { MessageEmbed } = require("discord.js");
const ayar = require("../../config.json");
const db = require("quick.db")
const kdb = new db.table("kullanıcı");
const roller = require("../../roller.json")
const kanallar = require("../../kanallar.json")
exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(roller.muteyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(embed.setDescription(`${message.author} kimin mutesini kaldıracağını yazmadın! \`.unvmute @Cyber/ID\``).setTimestamp().setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    if (!user.voice.channel) return message.react(ayar.carpi)
    if (user.id === message.author.id) return message.react(ayar.carpi)
    if (user.id === client.user.id) return message.react(ayar.carpi)
    if (user.hasPermission(8)) return message.react(ayar.carpi)


    let data = await kdb.get(`durum.${user.id}.vmute`)
    if (!data) return message.channel.send(embed.setDescription(`Kullanıcı zaten muteli değil.`).setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (data) {
        await kdb.delete(`durum.${user.id}.vmute`)
        user.voice.setMute(false).catch()
        message.react(ayar.onay)
        client.channels.cache.get(kanallar.penalties).send(embed.setDescription(`${user} kullanıcısının **voice-mute** cezası ${message.author} tarafından kaldırıldı.`).setTimestamp().setFooter(ayar.footer))}}

        exports.conf = {enabled: true, guildOnly: true, aliases: [], permLevel: 0}
        exports.help = {name: 'unvmute'}