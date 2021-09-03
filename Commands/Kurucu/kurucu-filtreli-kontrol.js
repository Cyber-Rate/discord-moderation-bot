const { MessageEmbed } = require("discord.js");
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.react(config.carpi)
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!rol) message.reply('rol belirt.')

    let offline = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.presence.status === 'offline')
    let ses = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.voice.channel)
    let unses = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && !s.voice.channel)
    await message.channel.send(`Roldeki aktif olmayan kullanıcı sayısı: ${offline.size}`, { code: "xl" })
    await message.channel.send(`${offline.map(s => s).join(', ') || 'Yok'}`)
    await message.channel.send(`Roldeki seste olan kullanıcı sayısı: ${ses.size}`, { code: "xl" })
    await message.channel.send(`${ses.map(s => s).join(', ') || 'Yok'}`)
    await message.channel.send(`Roldeki seste olmayan kullanıcı sayısı: ${unses.size}`, { code: "xl" })
    await message.channel.send(`${unses.map(s => s).join(', ') || 'Yok'}`)
}
exports.conf = {
    aliases:[]
};

exports.help = {
    name:'rol-denetim'
}