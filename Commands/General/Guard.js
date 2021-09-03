const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komut Adminlere özeldir.');
  if (args[0] === 'server' || args[0] === 'serverGuard') {
    const guild = db.fetch(`guildGuard.${message.guild.id}`)
    if (!guild) {
      db.set(`guildGuard.${message.guild.id}`, 'on')
      message.channel.send('Server Koruması Aktif Edildi!')

    } else if (guild) {
      db.delete(`guildGuard.${message.guild.id}`)
      message.channel.send('Server Koruması Devre Dışı Bırakıldı!')

    }
  } else if (args[0] === 'bot' || args[0] === 'botGuard') {
    const bot = db.fetch(`botGuard.${message.guild.id}`)
    if (!bot) {
      db.set(`botGuard.${message.guild.id}`, 'on')
      message.channel.send('Bot Koruması Aktif Edildi!')
    } else if (bot) {
      db.delete(`botGuard.${message.guild.id}`)
      message.channel.send('Bot Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'chatGuard' || args[0] === 'chat') {
    const chat = db.fetch(`chatGuard`)
    if (!chat) {
      db.set(`chatGuard`, 'on')
      message.channel.send('Chat Koruması Aktif Edildi!')
    } else if (chat) {
      db.delete(`chatGuard`)
      message.channel.send('Chat Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'nickGuard' || args[0] === 'nick') {
    const nick = db.fetch(`nickGuard.${message.guild.id}`)
    if (!nick) {
      db.set(`nickGuard.${message.guild.id}`, 'on')
      message.channel.send('Nick Koruması Aktif Edildi!')
    } else if (nick) {
      db.delete(`nickGuard.${message.guild.id}`)
      message.channel.send('Nick Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'channel' || args[0] === 'kanal') {
    const channel = db.fetch(`channelGuard.${message.guild.id}`)
    if (!channel) {
      db.set(`channelGuard.${message.guild.id}`, 'on')
      message.channel.send('Kanal Koruması Aktif Edildi!')
    } else if (channel) {
      db.delete(`channelGuard.${message.guild.id}`)
      message.channel.send('Kanal Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'member' || args[0] === 'üye') {
    const newMember = db.fetch(`newMemberGuard.${message.guild.id}`)
    if (!newMember) {
      db.set(`newMemberGuard.${message.guild.id}`, 'on')
      message.channel.send('Yeni Üye Koruması Aktif Edildi!')
    } else if (newMember) {
      db.delete(`newMemberGuard.${message.guild.id}`)
      message.channel.send('Yeni Üye Koruması Devre Dışı Bırakıldı!')
    }
  } else {
    var chat = db.fetch(`chatGuard`);
    var bot = db.fetch(`botGuard.${message.guild.id}`);
    var nick = db.fetch(`nickGuard.${message.guild.id}`);
    var guild = db.fetch(`guildGuard.${message.guild.id}`);
    var newMember = db.fetch(`newMemberGuard.${message.guild.id}`);
    var channel = db.fetch(`channelGuard.${message.guild.id}`)

    if (chat) chat = 'AKTİF!'
    if (!chat) chat = 'DEVRE DIŞI!'
    if (channel) channel = 'AKTİF!'
    if (!channel) channel = 'DEVRE DIŞI!'
    if (bot) bot = 'AKTİF!'
    if (!bot) bot = 'DEVRE DIŞI!'
    if (nick) nick = 'AKTİF!'
    if (!nick) nick = 'DEVRE DIŞI!'
    if (guild) guild = 'AKTİF!'
    if (!guild) guild = 'DEVRE DIŞI!'
    if (newMember) newMember = 'AKTİF!'
    if (!newMember) newMember = 'DEVRE DIŞI!'
    message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setFooter('Aello Guard Sy.').setFooter('Aello Guard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setThumbnail('https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
      .addField('Chat Koruması', chat, true).addField('Bot Koruması', bot, true).addField('Nick Koruması', nick, true).addField('Sunucu Kouruması', guild, true).addField(`Kanal Koruması (Beta)`, channel, true).addField('Yeniüye koruması', newMember, true)
      .setDescription('`.ayar <koruma> / .koruma <koruma>` komutları ile koruma sistemlerini kullanabilirsiniz.'))
  }
}

exports.conf = {
  aliases: ['koruma', 'ayar'],
  permLevel: 0
};

exports.help = {
  name: 'guard',
};