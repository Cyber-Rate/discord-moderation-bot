// Komut Alanı 
const Discord = require("discord.js");
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed().setColor("#313136").setFooter().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
if(message.member.roles.cache.has(roller.EKO) && message.member.hasPermission("ADMINISTRATOR")) message.channel.send(embed.setDescription(`Yetersiz Yetki Lütfen Yetkili Çağır :))`))
let erkekrol = roller.erkek
let kadınrol = roller.kadın
let taglırol = roller.taglırol
let Tag = config.tag
let kk = roller.kayıtsızRolleri
let isimi = config.isismi

let kullanıcılar = message.guild.members.cache
let etagsız = kullanıcılar.filter(a => !a.user.bot).filter(s => s.roles.cache.has(erkekrol)).filter(a => !a.user.username.includes(Tag)).size
let ktagsız = kullanıcılar.filter(a => !a.user.bot).filter(s => s.roles.cache.has(kadınrol)).filter(a => !a.user.username.includes(Tag)).size

message.channel.send(embed.setDescription(`
**${message.guild.name}** Sunucusunda Yapılan Tagsız Kayıtlar`))
await kullanıcılar.filter(a => !a.user.bot)
.filter(s => s.roles.cache.has(erkekrol) || s.roles.cache.has(kadınrol))
.filter(a => !a.roles.cache.has(taglırol)).array().forEach(async element  => {

    await element.roles.set(kk)

})

await message.reply("Tagsızları kayıtsıza atma işlemi başladı aşkoo ")

};

exports.conf = {
  aliases: ["tagsızalım", "tagsız"]
}
exports.help = {
    name: "tagsız-Unregister"
}