const Discord = require('discord.js')
const db = require('quick.db')
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run = async (client, message, member) => {
    if(!message.member.roles.cache.get(roller.registeryetki) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.carpi)

        let uye = message.mentions.users.first() || message.author
  
let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" - <@"+ uye +"> | \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new Discord.MessageEmbed().setColor("0x2f3136").setDescription(top).setTimestamp().setFooter(Config.footer))}

exports.conf = {enabled: true, guildOnly: false, aliases: ['top', 'top-teyit'], permLevel: 0}
exports.help = {name: "topteyit"}