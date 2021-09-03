const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const Config = require('../../config.json');
const moment = require('moment');
const prefix = Config.prefix;

module.exports.run = async (client, message, args) => {
  
    if(!message.member.roles.cache.get(Config.reg) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(Config.carpi)

    let db2 = new qdb.table("sunucuayar");

const kayıtsız = await db2.get(`sunucuayar.kayitsiz_uye`);

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.react(Config.carpi)
if(kullanici.id === message.author.id)return message.react(Config.carpi)
if(kullanici.id === client.user.id)return message.react(Config.carpi)
if(kullanici.id === message.guild.OwnerID) return message.react(Config.carpi)
if (kullanici.hasPermission(8)) return message.react(Config.carpi)

kullanici.roles.set([kayıtsız])
kullanici.setNickname("★ Kayıtsız")
moment.locale("tr");}

exports.conf = {enabled: true, guildOnly: false, aliases: ['kayıtsız', 'u'], permLevel: 0}
exports.help = {name: "unregister"}