const { MessageEmbed, ReactionCollector } = require('discord.js')
const Database = require('quick.db')
const db = require('quick.db')
const config = require('../../config.json')
const ayarlar = require('../../roller.json')

exports.run = async(client, message, args) => {

let embed = new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic : true })).setColor("RANDOM").setFooter(config.footer)
    
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.channel.send(embed.setDescription(`${message.author} Lütfen bir kullanıcı belirtin @Cyber/İD gibi.`)).then(tedoa => tedoa.delete({timeout : 8000})).then(message.react(config.carpi))

if (member.user.bot) return message.channel.send(embed.setDescription(`${message.author} Botların isim geçmişi olmaz !`)).then(tedoa => tedoa.delete({timeout : 5000})).then(message.react(config.carpi))

let isimler = db.get(`isimler.${member.user.id}`);
if (!isimler) return message.channel.send(new MessageEmbed().setAuthor(message.author.tag,message.author.displayAvatarURL({dynamic:true})).setColor('RANDOM').setDescription(`Bu Kullanıcının Toplam "0" Kayıtlı İsmi Bulundu`)).then(message.react(config.cyber)).then(tedoa => tedoa.delete({timeout:10000}))
let isimlersayı = `${db.fetch(`isimler.${member.id}`).length} `
let isimleri = `${isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n")}`

const tedoa = new MessageEmbed()
    .setColor('BLUE')
    .setDescription(`
 ${member} Kişisi Toplamda ${isimlersayı} Sefer Kayıt Olmuş ${config.onaye} 
 Kişinin Geçmiş İsimleri Aşağıda Listelendiği Gibidir
  
 ${isimleri}`)
    .setFooter(config.footer)
    .setTimestamp()
message.channel.send(tedoa)
}

    
    exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : [], 
         }
    
    exports.help = {
        name : 'isimler',
        help: "isimler [tedoa/ID]",
        cooldown: 0
     }