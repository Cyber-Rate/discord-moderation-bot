const { MessageEmbed } = require("discord.js");
exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(`Cyber 🖤`)
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!rol) message.reply('rol belirt.')
    let qwe = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.presence.status !== 'offline' && !s.voice.channel)

    let crossArray = new Array()
    let crossÜyeler = rol.members.filter(s => s.presence.status !== "offline" && !s.voice.channel).forEach(cross => { crossArray.push(`<@!${cross.id}>`); })
    message.channel.send(`aktif olupta seste olmayan \n ${rol} rolünde bulunan yetkili sayısı: ${qwe.size}`)
    message.channel.send(`${crossArray.join("\n")}`, { code: "xl", split: true })
}
exports.conf = {
    aliases:[]
};

exports.help = {
    name:'rol-info'
}