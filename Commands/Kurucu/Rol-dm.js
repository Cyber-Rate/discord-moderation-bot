const Discord = require("discord.js");

module.exports.run = async(client, message, args, embed) => {
    if (!message.member.hasPermission(8)) return;
    let rol = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first()
    let msg = args.slice(1).join(' ')
    if (!rol) return;
    let uyeler = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id)).array()
    uyeler.forEach(async(member, index) => {
        setTimeout(async() => {
            await member.send(`${msg ? msg : "https://discord.gg/7s3JEzWZE8"}`).catch(err => message.channel.send(`${member} ${msg ? msg : "https://discord.gg/7s3JEzWZE8"}`))
        }, index * 1000)
    })
}
exports.conf = {
    name: "roldm",
    guildOnly: true,
    aliases: ["roldm"],
    cooldown: 0
};
exports.help = {
    name: "roldm"
}