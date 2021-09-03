const { MessageEmbed } = require("discord.js")
const ayar = require("../../config.json")
const roller = require("../../roller.json")
const db = require("quick.db")
const kdb = new db.table("kullanıcı")

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(roller.jailyetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
    let embed = new MessageEmbed().setColor('RANDOM')

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
    let user = message.guild.member(member)

    let puan = await kdb.fetch(`cezapuan.${user.id}`) || "0"
    let x = await kdb.fetch(`sicil.${user.id}`)
    if (!x) return message.channel.send(embed.setDescription(`Kullanıcının datası temiz.`)).then(m => m.delete({ timeout: 7000 }))
    let sicil = x.map((data, index) => ` \`>\` (#${data.cezaID}) | ${data.adminID} tarafından **${data.start}** süresince \`${data.Tip}\` cezası almış.`)

    const aptulaskim = embed.setDescription(`${sicil.join("\n") || "Kullanıcının datası temiz."}`).setFooter(`Kullanıcının toplam ${puan} ceza puanı bulundu. `).setTimestamp()
    message.channel.send(aptulaskim).then(m => m.delete({ timeout: 10000 }) && message.delete({ timeout: 7000 }))}

exports.conf = {enabled: true, guildOnly: true, aliases: ['data'], permLevel: 0}
exports.help = {name: 'sicil'}