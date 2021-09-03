const { MessageEmbed } = require("discord.js")
const ayar = require("../../config.json")
const db = require("quick.db")
const kdb = new db.table("kullanıcı")

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)
    kdb.delete(`sicil.${user.id}`)
    kdb.delete(`cezapuan.${user.id}`)
    message.react(ayar.cyber)}

exports.conf = {enabled: true, guildOnly: true, aliases: ['sicil-sil', 'sicil-sıfırla', 'sicilsıfırla', 'datasil', 'data-sil', 'dsil'], permLevel: 0}
exports.help = {name: 'sicilsil'}