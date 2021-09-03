const { MessageEmbed } = require ("discord.js");
const config = require("../../config.json");
const data = require('quick.db')
const db = require('quick.db')
exports.run = async (client, message, args) => {
    const lordan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let FirstStaffRole = ("877622518607912990");
    let StaffRoles = ["877622518607912990", "877610987996446771"];
    let StaffLog = ("877935894722650182");
    let AuthorizedRole = "877935569806708746";
    

if (!message.member.roles.cache.has(AuthorizedRole) && !message.member.hasPermission('ADMINISTRATOR')) return;
if (!lordan) return message.channel.send(new MessageEmbed().setColor("#303136").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setFooter(config.footer).setDescription("Yetkili yapmak istediğin **kişiyi belirtmelisin!**"));
if (lordan.roles.highest.position >= message.guild.roles.cache.get(FirstStaffRole).position) return message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`Zaten yetkili olan birine **yetki veremezsin!**`));
data.add(`yetkili.${message.author.id}.yetkilicek`, 1)
data.add(`puan.${message.author.id}.yetkicek`, 15)

let member = message.guild.member(lordan)       
member.roles.add([StaffRoles[0],StaffRoles[1]]); 

 const log = message.guild.channels.cache.get(StaffLog) 

 const logmesajı = new MessageEmbed().setColor("#303136").setFooter(config.footer).setDescription(`${member} Üyesi ${message.author} Tarafından **yetkili olarak sunucumuza alındı.**`);
 const onay = new MessageEmbed().setColor("#303136").setFooter(config.footer).setDescription(`${member} Üyesine <@&${StaffRoles[0]}> <@&${StaffRoles[1]}> Rollerini vererek **yetkili yaptım**!`);
 return message.channel.send(onay).then(message.react(config.onay)) && (log.send(logmesajı));
};

exports.conf = {
 name: "deneme",
 aliases: ["yetki-başlat","yetkiver", "yetkili-yap"],
 usage: "yetkilial @uye",
 description: "Belirtilen üyeye belirttiğiniz rolleri verirsiniz."
};

exports.help = {
    name: "yetkili-al"
}