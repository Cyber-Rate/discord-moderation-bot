const { MessageEmbed, Discord } = require('discord.js')
const data = require('quick.db')
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run = async (client, message, member) => {
   if(!message.member.roles.cache.get(roller.registeryetki) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.carpi)

   let erkek = data.fetch(`puan.${message.author.id}.ekayit`)
   let kadin = data.fetch(`puan.${message.author.id}.kkayit`)
   let tagli = data.fetch(`puan.${message.author.id}.tagaldir`)
   let esayi = data.fetch(`esayi.${message.author.id}.toplam`)
   let ksayi = data.fetch(`ksayi.${message.author.id}.toplam`)
   let tsayi = data.fetch(`tsayi.${message.author.id}.toplam`)

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} ***Kullanıcısının Yetkili Bilgileri***
     
    ${Config.cyber} **Kayıt Bilgileri**
        • Toplam erkek kayıt sayısı: \`${esayi}\`
        • Toplam bayan kayıt sayısı: \`${ksayi}\`
        • Taga çektiği kişi sayısı: \`${tsayi}\`
      
    ${Config.cyber} **Puan Bilgileri:**
        • Erkek kayıt puanı: \`${erkek}\`
        • Bayan kayıt puanı: \`${kadin}\`
        • Taglı çekme puanı: \`${tagli}\`

    ${Config.cyber} 
        • Coinin ne işe yaradığını öğrenmek için \`.system\` yazabilirsin. **[ Yakında ]**
        • Marketten bir şeyler almak istersen \`.market\` yazabilirsin. **[ Yakında ]**
`).setFooter(Config.footer).setTimestamp().setColor('0x2f3136'))}


exports.conf = {enabled: true, guildOnly: false, aliases: ['profil'], permLevel: 0}
exports.help = {name: "profil"}