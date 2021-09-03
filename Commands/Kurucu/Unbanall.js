// Komut Alanı 
const Discord = require('discord.js')

exports.run = async(client, message, args) => {
    const bans = await message.guild.fetchBans()

    for (const cross of bans.array()) {
        await message.guild.members.unban(cross.user.id)
        message.react('✅')
    }

}

exports.conf = {
    name: "unbanall",
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "unbanall"
}