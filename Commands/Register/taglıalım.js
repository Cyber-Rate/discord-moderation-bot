const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require("../../config.json")
const moment = require("moment");
const ms = require('ms')
const rol = require("../../roller.json")
module.exports.run = async (client, message, args) => {
let embed = new Discord.MessageEmbed().setFooter(" was here!").setTimestamp().setColor("010000").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp();
let no = client.emojis.cache.get("802189318529482763")
let yes = client.emojis.cache.get("802189317941231647")
if (message.author.id != ayarlar.sahip) return;

if(!args[0]) {
message.channel.send(embed.setDescription(`:x: Komutu yanlış kullandınız! ${ayarlar.prefix}taglıalım aç/kapat`))
return;    
}
if (args[0] === "aç") {
if(db.fetch(`taglıAlım.${message.guild.id}`)) return message.channel.send(embed.setDescription(`${no} Taglı alım sistemi zaten aktif!`))
db.set(`taglıAlım.${message.guild.id}`, "taglıAlım")
message.channel.send(embed.setDescription(`${yes} Taglı alım sistemi aktif edildi!`))
return;    
} else if (args[0] === "kapat") {
if(!db.fetch(`taglıAlım.${message.guild.id}`)) return message.channel.send(embed.setDescription(`${no} Taglı alım sistemi zaten devre dışı!`))
db.delete(`taglıAlım.${message.guild.id}`)
message.channel.send(embed.setDescription(`${yes} Taglı alım sistemi devre dışı bırakıldı!`))
return;    
};
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["taglıalım"],
  PermLevel: 0
};

 

exports.help = {
  name: "taglıalım",
  description: "taglıalım",
  usage: "taglıalım"
};// CODED BY CROSS 