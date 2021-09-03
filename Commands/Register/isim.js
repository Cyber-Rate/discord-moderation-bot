const { MessageEmbed } = require('discord.js')
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run =  async (client, message, args) => {

if(![(roller.registeryetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.carpi)
  
  const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.react(Config.carpi)
if(member.id === message.author.id) return message.react(Config.carpi)
if(member.id === client.user.id) return message.react(Config.carpi)
if(member.id === message.guild.OwnerID) return message.react(Config.carpi)
if (member.hasPermission(8)) return message.react(Config.carpi)
if(member.roles.highest.position >= message.member.roles.highest.position) return message.react(Config.carpi)
let kayıttabasagelecektag = Config.kayıttabasagelecektag
let isim = args[1]
let yas = Number(args[2])
if(!isim) return message.channel.send(new MessageEmbed().setDescription(`Bir isim girmeyi unuttunuz. \`.i @LunaCyber/ID <İsim>\` `).setTimestamp().setFooter(Config.footer))
member.setNickname(`${kayıttabasagelecektag} ${isim}`)
message.react(Config.onay)}

exports.conf = {enabled: true, guildOnly: true, aliases: ['i', 'nick', 'n'], permLevel: 0}
exports.help = {name: 'isim'}