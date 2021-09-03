const { MessageEmbed } = require("discord.js");

const cfg = require("../../config.json");

module.exports.run = async (client, message, args) => {

  let vegasembed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`<a:iptal:815845753276203018>  Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(m => m.delete({timeout: 5000}), message.react(cfg.carpi));
  let embed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}));
  let miktar = Number (args[0]);
  message.channel.setRateLimitPerUser(miktar).catch(err => {})
  message.channel.send(vegasembed.setDescription(`Slow Mode **${miktar ? miktar : "Kapalı" }** Olarak Ayarlandı.`)).then(m => m.delete({timeout: 5000}))
  message.react(cfg.onay);
  
};
exports.conf = {
  aliases:[]
};

exports.help = {
  name:'slowmode'
}