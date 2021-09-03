const { MessageEmbed, Discord } = require('discord.js')
const ayar = require('../../config.json')

exports.run = async (client, message, member) => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)

        message.channel.send(new MessageEmbed()
        .setDescription(`${ayar.luna} Kurulumlar şuanlık sadece bot sahibi tarafından yapılabiliyor. Lütfen daha sonra tekrar deneyiniz.`).setTimestamp().setFooter(ayar.footer).setColor('RED'))}

exports.conf = {enabled: true, guildOnly: false, aliases: ['kurulum', 'admin'], permLevel: 0}
exports.help = {name: "kur"}