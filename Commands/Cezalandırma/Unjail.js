
const roller = require('../../roller.json')
const ms = require('ms')
const { MessageEmbed } = require("discord.js")
const ayar = require("../../config.json")
const kanallar = require("../../kanallar.json")
const db = require("quick.db")
const kdb = new db.table("kullanıcı")
const moment = require("moment")

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(roller.jailyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.channel.send(embed.setDescription(`${message.author} kimin yasağını kaldıracağını yazmadın! \`.unjail @Cyber/ID\``).setTimestamp().setFooter(ayar.footer)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

    if (user.id === message.author.id) return message.react(ayar.carpi)
    if (user.id === client.user.id) return message.react(ayar.carpi)
    if (user.hasPermission(8)) return message.react(ayar.carpi)

    let data = await kdb.get(`durum.${user.id}.jail`)
    if (!data) return message.react(ayar.carpi)
    user.roles.set([roller.kayıtsızrolleri])
    kdb.delete(`durum.${user.id}.jail`)

    client.channels.cache.get(kanallar.penalties).send(embed.setDescription(`${user} kullanıcısının **karantina** cezası ${message.author} tarafından kaldırıldı.`).setTimestamp().setFooter(ayar.footer))}

    exports.conf = {enabled: true, guildOnly: true, aliases: [], permLevel: 0}
    exports.help = {name: 'unjail'}