const Discord = require('discord.js');
const db = require('quick.db');
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run = async (client, message, args) => {

    if(db.fetch(`bakim`)) {
        if(message.author.id !== config.owner) {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
      }
if(!message.member.roles.cache.has(roller.botcommander) && !message.member.roles.cache.has(roller.EKO) && !message.member.hasPermission('ADMINISTRATOR')) return;

if(!args[0]) return message.channel.send('Bir hata oluştu: Üyelerin bulunduğu kanalın idsini girmelisin.');
if(!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[0])) return message.channel.send('Bir hata oluştu: '+args[0]+' idli bir kanal bulamadım.');

if(!args[1]) return message.channel.send(`Bir hata oluştu: ${args[0]} kanalında ki üyeleri taşayacağım kanalın idsini yazmadın.`);
if(!message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[1])) return message.channel.send('Bir hata oluştu: '+args[1]+' idli bir kanal bulamadım.');

let çekilecek = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[0])
let aktarılacak = message.guild.channels.cache.filter(a => a.type === 'voice').find(x => x.id === args[1]);
if(çekilecek === aktarılacak) return message.channel.send('Bir hata oluştu: Üyelerin çekileceği kanalın üyelerin taşınacağı kanal ile aynı olmaması gerekiyor.');
interval = 100,
increment = 1;
çekilecek.members.forEach(function(member)  {
var runner = setTimeout(function() {
member.voice.setChannel(aktarılacak.id);
clearTimeout(runner);
}, interval * increment);
increment = increment +1;
});

message.channel.send(`Başarılı bi şekilde **${çekilecek}** - \`${çekilecek}\` kanalındaki üyeler **${aktarılacak}** - \`${aktarılacak}\` kanalına taşındı!`).then(msg => msg.delete({ timeout: 5000 }))
client.channels.cache.get(kanallar.MessageLogs).send(`Bir komut kullanıldı! komut\n kullanan yetkili: \`${message.author.tag}\` - (\`${message.author.id}\`)\n Kullanılan komut: \`.toplu-taşı\``);
}; 
exports.conf = { enabled: true, guildOnly: false, aliases: ["topluçek", "topçek", "toplu-taşı", "toplutaşı"], permLevel: 0 };
 
exports.help = { name: 'toplu-çek' };