const { MessageEmbed, Discord } = require('discord.js');
const Config = require('../../config.json')
const roller = require('../../roller.json')
const ms = require('ms')
const db = require('quick.db')
const moment = require('moment')

const kanallar = require('../../kanallar.json')
exports.run = async (client, message, args) => {

  
if(![(roller.banyetki)].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için <@&${roller.banyetki}> yetkisine sahip olman gerek`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL()({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));



  
  if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bir @İD belirtmelisin.`).setColor('RANDOM').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  try {
    message.guild.fetchBan(args.slice(0).join(' '))
    .then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(user.tag, user.avatarURL()).setColor('RANDOM').addField(' Kullanıcı:', `${user.tag} \n **Kullanıcı İD**: ${user.id}`).setDescription(`**Ban Sebebi:** ${reason}`)))
  } catch(err) { message.channel.send(new MessageEmbed().setTimestamp().setColor('RANDOM').setDescription('Belirtilen İD\'ye Ait Bir Ban Geçmişi Bulunamadı')) 
                               }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ban-info', 'ban-geçmişi'],
  permLevel: 0
};

exports.help = {
  name: 'ban-bilgi',
  kategori: 'yetkili'
};