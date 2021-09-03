const { MessageEmbed } = require('discord.js');
const ayarlar = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

module.exports.run = async(client, message, args) => {
    if (!message.member.hasPermission(8)) return message.react(ayarlar.carpi)
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))


    let otuzbir = message.guild.members.cache.filter(s => s.voice.channel && !s.user.bot)

    otuzbir.array().forEach(async(member, index) => {
        setTimeout(async() => {
            await member.voice.kick().catch()
        }, index * 750)
    })
    message.channel.send(embed.setDescription(`${otuzbir.size} Kullanıcı sesten çıkarılıyor.`)).then(m => m.delete({ timeout: 7000 }) && message.delete({ timeout: 7000 }))

}
exports.conf = {
    aliases:["herkesisestenat","herkesisestençıkar"]
}
exports.help = {
    name:'allsesçıkar',
    description:'Herkesi sesten atar.'
}
