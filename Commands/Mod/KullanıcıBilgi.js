const Discord = require('discord.js');
const db = require('quick.db');
const moment = require("moment");

exports.run = async(client, message, args) => {


                var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
                var user = message.guild.member(member);

                let status = member.presence.status.replace("offline", "Gorunmez/Çevrimdışı").replace("online", "Çevrimiçi").replace("idle", "Boşta").replace("dnd", "Rahatsız Etmeyin")
                let katılma = moment(user.joinedAt).format(`HH:mm | DD/MM/YYYY`).replace("/01/", " Ocak ").replace("/02/", " Şubat ").replace("/03/", " Mart ").replace("/04/", " Nisan ").replace("/05/", " Mayıs ").replace("/06/", " Haziran ").replace("/07/", " Temmuz ").replace("/08/", "Ağustos").replace("/09/", " Eylül ").replace("/10/", " Ekim ").replace("/11/", " Kasım ").replace("/12/", " Aralık ")
                let roller = user.roles.cache.filter(x => x.name !== "@everyone").map(x => x).join(', ')

                message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription(`__**Kullanıcı Bilgisi**__ \n\nKullanıcı: ${member}\nID: **__${member.id}__**\nTag: ${member.tag}\nDurum: ${status}\n\n__**Üyelik Bilgisi**__\n\nTakma ad: ${user.displayName.replace("`", "")} ${user.nickname ? "" : "[Yok]"}\nKatılma Tarihi: ${katılma}\nRolleri: ${roller}`).setThumbnail(message.author.avatarURL({ dynamic: true })))
    }
    exports.conf = {
      aliases:[]
  };
  
  exports.help = {
      name:'kullanıcıbilgi'
  }