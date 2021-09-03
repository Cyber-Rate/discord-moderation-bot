const Discord = require('discord.js');
const ayarlar = require('../../config.json');

exports.run = (client, message, args) => {
if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.react(ayarlar.carpi)
message.channel.clone().then(kanal=> {
  let position = message.channel.position;
  kanal.setPosition(position);
  message.channel.delete();
const embed = new Discord.MessageEmbed()
.setTitle('Kanal Başarıyla Yeniden Oluşturuldu!')
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
kanal.send(embed).then(qwe => qwe.delete({ timeout: 5000 }))
});
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["nuke","nuk","nk"],
  permLevel: 0
};

exports.help = {
    name: 'nuke',
    description:"Kullanılan kanalı yeniden oluşturur."
};