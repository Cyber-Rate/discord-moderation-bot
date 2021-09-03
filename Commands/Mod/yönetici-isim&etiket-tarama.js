const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const roller = require("../../roller.json");

  
exports.run = async(client, message, args) => {
	
	  if (
    !message.member.roles.cache.has(roller.RegisterYetki) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    
    return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setDescription(`Komutu kullanmaya \`erişimin\` yok`)
      .setColor("RED")
      );
  
  
    let embed = new MessageEmbed().setColor('RANDOM').setTimestamp().setFooter(config.footer)
    let rol = roller.taglırol
    let tag = config.tag
    let etiket = config.etiket // etiketi # siz yazin
    message.guild.members.cache.filter(s => s.user.discriminator === etiket || s.user.username.includes(tag) && !s.roles.cache.has(rol)).forEach(m => m.roles.add(rol))
    message.channel.send(embed.setDescription(`
  \`${tag}\` \`#${etiket}\` İsminde tagını taşıyanlara rol veriliyor
`))
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['yönetici-tag-tara'],
    name: 'rate',
    permLevel: 0
};
exports.help = {
	name: 'tag-tara'
}