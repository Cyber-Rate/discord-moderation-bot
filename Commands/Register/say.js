const { MessageEmbed } = require("discord.js");
const Config = require('../../config.json');
const roller = require('../../roller.json');
const kanallar = require('../../kanallar.json');
const { config } = require("process");

module.exports.run = (client, message, args) => {

if(![(roller.registeryetki)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.carpi)
    
let tag = Config.tag;
const bsayi = message.guild.premiumSubscriptionCount 
const blevel = message.guild.premiumTier
const tagges = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
const toplam = message.guild.memberCount
const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 
let etikettag = message.guild.members.cache.filter(m => m.user.discriminator == Config.etiket).size

const embed = new MessageEmbed()
.setColor('BLACK')
 .setDescription(`
\`>\` Sunucumuzda toplam \`${toplam}\` üye bulunmaktadır!
\`>\` Tagımızda toplam \`${tagges+etikettag}\` kullanıcı bulunmaktadır!
\`>\` Ses kanallarında \`${ses}\` kişi mevcut!
\`>\` Sunucumuzda \`${bsayi}\` boost bulunuyor!
`).setFooter(Config.footer).setTimestamp()
message.channel.send(embed)}

exports.conf = {enabled: true, guildOnly: false, aliases: [], permLevel: 0}
exports.help = {name: 'say'}