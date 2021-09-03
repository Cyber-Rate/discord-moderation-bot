// Komut Alanı 
const Discord = require("discord.js");
const db = require("quick.db");
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')


exports.run = async (client, message, args) => {
  
  const reawen = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
 
  if(message.channel.id !== kanallar.botkomutkanalı) return message.channel.send(`<#${kanallar.botkomutkanalı}>`).then(msg => {msg.delete({timeout: 10000})})
  if (reawen) return;
  const sebep = args[0] ? args.join(" ").replace(new RegExp("@everyone", "g"), "everyone").replace(new RegExp("@here", "g"), "here") : "Sebep Belirtilmedi";
  const b = message.member.displayName
  await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep)
  await db.set(`afkid_${message.author.id}_${message.guild.id}`, message.author.id)
  await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b)
  await db.set(`afk_süre_${message.author.id}_${message.guild.id}`, Date.now())
  message.channel.send(`• ${message.author} seni **AFK** olarak ayarladım ve mesajını şu şekilde ayarladım: **${sebep}**`);
  message.member.setNickname("[AFK] " + b)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Afk"],
  permLevel: 0
};

exports.help = {
  name: "afk",
  usage: "afk"
};