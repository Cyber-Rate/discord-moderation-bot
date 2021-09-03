const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      "yeten yok broo`Rolleri Yönet` yetkisine sahip olmalısın kanki"
    );
  let rol =
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args[0]) ||
    message.guild.roles.cache.find(rol => rol.name === args[0]);
  if (!rol)
    return message.channel.send(
      "hey herkese rol verebilmen için rol etiketlemelisin :)"
    );

  const embed = new Discord.MessageEmbed()
    .setDescription(`herkese ${rol} rolü verildi!`)
    .setColor(rol.hexColor);

  message.guild.members.cache.forEach(u => {
    u.roles.add(rol);
  });
  message.channel.send(embed);
};
exports.conf = { enabled: true, guildOnly: false, aliases: ["toplurolver", "herkeserolver", "lorehh"], permLevel: 3 };

exports.help = { name: "herkese-rol-ver", description: "Belirlenen Rolü Herkese Verir!", usage: "herkeserolver" };
