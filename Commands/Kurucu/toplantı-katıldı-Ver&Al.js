const Discord = require("discord.js");
const Config = require('../../config.json');
const roller = require('../../roller.json');
const kanallar = require('../../kanallar.json');

exports.run = (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return;
if(args[0] === "ver"){
let x= message.guild.channels.cache.find(a => a.type === "voice" && a.id === args[1])
if(!x){
return message.channel.send("Toplu rol vermek istediğin üyelerin bulunduğu kanalı etiketle!")}
x.members.map(a => {
a.roles.add(roller.katıldı)})
message.channel.send(`Toplantıda bulunan tüm yetkililere katıldı rolü dağıtılmaya başlandı.`)///.then(m =>m.delete(5000))
}if(args[0] === "al"){
        message.guild.roles.cache.get(roller.katıldı).members.forEach(async uye => await uye.roles.remove(roller.katıldı));
        message.channel.send('Katıldı rolleri alındı!');
      };
    
}
exports.conf = {
  aliases:[]
};

exports.help = {
  name:'toplantı-katıldı'
}