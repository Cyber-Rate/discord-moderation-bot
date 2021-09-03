const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      "Her hangi bir yetkiye sahip değilsin!"
    );
  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!rol)
    return message.channel.send(
      "herkesten rol alabilmek için bir rol belirtmelisin!"
    );

  const embed = new Discord.MessageEmbed()
    .setDescription(`herkesten ${rol} rolü alındı.!`)
    .setColor(rol.hexColor);

  message.guild.members.cache.forEach(u => {
    u.roles.remove(rol);
  });
  message.channel.send(embed);
};
exports.conf = { enabled: true, guildOnly: false, aliases: ["toplurolal", "herkestenrolal", "loreh"], permLevel: 3 };

exports.help = { name: "herkesten-rol-al", description: "Belirlenen Rolü Herkese Verir!", usage: "herkestenrolal" };
