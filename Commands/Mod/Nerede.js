const { MessageEmbed } = require("discord.js");
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(roller.registeryetki) && !message.member.hasPermission("ADMINISTRATOR")) return message.reply('Yetersiz yetki.')
    let embed = new MessageEmbed().setColor('2F3136').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))

   

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let user = message.guild.member(member)
    if (!user) return message.reply('Bir kullanıcı belirt')
    if (!user.voice.channel) return message.reply('Bu kullanıcı ses kanalında değil')

    let kanal = user.voice.channel
    let mik = user.voice.selfMute ? "\`Kapalı\`" : "\`Açık\`"
    let kulak = user.voice.selfDeaf ? "\`Kapalı\`" : "\`Açık\`"
    let yayın = user.voice.streaming ? "\`Açık\`" : "\`Kapalı\`"
    let kanalinfo = user.voice.channel.userLimit
    let kanaldakiler = message.guild.members.cache.filter(x => x.voice.channel && x.voice.channel.id === kanal.id).size
    if (kanal && user.voice.channel) {
        message.channel.send(embed.setDescription(`
${user} Adlı kullanıcı \`${kanal.name}\` adlı ses kanalında bulunuyor.
Mikrofonu: ${mik}
Kulaklığı: ${kulak}
Yayın Bilgisi: ${yayın}
Kanal Bilgisi: \`${kanaldakiler}/${kanalinfo}\`
`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))
    }
};
exports.conf = {
    aliases:[]
};

exports.help = {
    name:'nerede'
}