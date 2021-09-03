const Discord = require("discord.js");
const config = require('../../config.json');
const roller = require('../../roller.json');
const db = require('quick.db');

exports.run = async (bot, message, args) => {

if(!message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission("ADMINISTRATOR")) return;

let lorexcyber = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    lorexcyber.forEach(r => {
r.roles.add(roller.Unregister)
r.setNickname("★ Kayıtsız")
})
const lore = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setColor("#000069")
.setDescription("Sunucuda rolü olmayan \`"+ lorexcyber.size +"\` kişiye kayıtsız rolü verildi!")
message.channel.send(lore).then(m => message.react(config.onay))
} else if(!args[0]) {
const cxyber = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setColor("#000069")
.setDescription("Sunucumuzda rolü olmayan \`"+ lorexcyber.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
message.channel.send(cxyber)
}


}

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["rolsuz"],
permLevel: 0
};

exports.help = {
name: "rolsüz",
description: "[Admin Komutu]",
usage: "rolsüz ver"
};
