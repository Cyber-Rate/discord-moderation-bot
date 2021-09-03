const { MessageEmbed } = require('discord.js');
const lunagalpcyber = require('../../config.json');

exports.run = async (client, message, args) => {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new MessageEmbed().setDescription(`${message.member}, Bu komutu kullanmak için yeterli yetkiye sahip değilsin!`))
        let yt = message.guild.roles.cache.filter(s => s.permissions.has("ADMINISTRATOR"))
        let rolyt = message.guild.roles.cache.filter(s => s.permissions.has("MANAGE_ROLES"))
        let knlyt = message.guild.roles.cache.filter(s => s.permissions.has("MANAGE_CHANNELS"))

        message.channel.send(new MessageEmbed().setDescription(`
Sunucuda Yönetici olan roller; **${yt.size}**
${yt.map(s => `${message.guild.roles.cache.get(s.id)}`)}
Sunucuda Rol yönet olan roller; **${rolyt.size}**
${rolyt.map(s => `${message.guild.roles.cache.get(s.id)}`)}
Sunucuda Kanal yönet olan roller; **${knlyt.size}**
${knlyt.map(s => `${message.guild.roles.cache.get(s.id)}`)}
`).setFooter(lunagalpcyber.footer).setTimestamp())
}
  exports.conf = {
    aliases: ["rolkontroll"],
    };
    
    exports.help = {
    name: "rolkontrol",
    };  