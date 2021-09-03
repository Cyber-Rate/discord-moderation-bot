const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const db = require('quick.db')
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(roller.registeryetki) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.carpi)

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

let kayıttabasagelecektag = Config.kayıttabasagelecektag
let nick = args[1]
if(!member) return message.react(Config.carpi)
if(!nick) return message.react(Config.carpi)
if(member.id === client.user.id) return message.react(Config.carpi)
if (member.hasPermission(8)) return message.react(Config.carpi)

if(db.fetch(`taglıAlım.${message.guild.id}`)) {
    if(!member.user.username.includes(Config.tag) && !member.user.discriminator.includes(Config.etiket) && !member.roles.cache.has(roller.taglırol) && !member.roles.cache.has(roller.booster)) return message.channel.send(new MessageEmbed().setColor('RANDOM').setDescription(`${member}, Adlı Kullanıcı Tagımızı Almadıgı İcin Kayıt Tamamlanamadı!`))
     
     }
data.add(`yetkili.${message.author.id}.kadın`, 1)
data.add(`puan.${message.author.id}.kkayit`, 5)
data.add(`yetkili.${message.author.id}.toplam`, 1)
data.add(`ksayi.${message.author.id}.toplam`, 1)
let kayıtlar = data.fetch(`yetkili.${message.author.id}.toplam`)
let isim =  db.get(`isimler.${member.id}`)
db.push(`isimler.${member.id}`, `\`${nick}\` (<@&${roller.kadın}>)`)

member.setNickname(`${kayıttabasagelecektag} ${nick}`) 
message.react(Config.onay)
member.roles.add(roller.kadın)
member.roles.add(roller.kadın)
member.roles.remove(roller.Unregister)
member.roles.remove(roller.Unregister)
message.channel.send(new MessageEmbed()
//.setTitle("Kayıt Tamamlandı ")
.setDescription(`${member} Adlı Kullanıcı <@&${roller.kadın}> Olarak Kayıt Edildi ${Config.onaye}

\`.isimler @Cyber/ID İle Kontrol Ederek Kayıt Etmeniz Önerilir \` `)
.setFooter(`${message.author.tag} toplam ${kayıtlar} kayıta sahip.`)
.setColor('0x2f3136')
.setTimestamp())

client.channels.cache.get(kanallar.chat).send(`${member} sunucumuza hoşgeldin, seninle birlikte **${message.guild.memberCount}** kişiye ulaştık !`).then(x => x.delete({timeout: 5000}))}

exports.conf = {enabled: true, guildOnly: true, aliases: ["kadın", "k"]}
exports.help = {name: 'kadın'}
