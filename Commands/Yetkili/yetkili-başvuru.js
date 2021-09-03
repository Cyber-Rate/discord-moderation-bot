const Discord = require("discord.js");
const qdb = require("quick.db");
const kdb = new qdb.table("kullanici");
const moment = require("moment");
require("moment-duration-format");

let seviyebaş = "<:bas:838652520205123594>";
let seviyeileri = "<:ileri:838652520280096768>";
let seviyeorta = "<:orta:838652519941013566>";
let seviyeson = "<:son:838652520175108156>";

exports.run = (client, message, args) => {
  let kullanici =
    message.mentions.users.first() ||
    client.users.cache.get(args[0]) ||
    (args.length > 0
      ? client.users.cache
          .filter(e =>
            e.username.toLowerCase().includes(args.join(" ").toLowerCase())
          )
          .first()
      : message.author) ||
    message.author;
  let uye = message.guild.member(kullanici);
  let sicil = kdb.get(`kullanici.${uye.id}.sicil`) || [];
  sicil = sicil.reverse();
  let sicilPanel =
    sicil.length > 0
      ? sicil
          .map(
            (value, index) =>
              `\`${index + 1}.\` Ceza Bilgisi \n Ceza Türü: **[${
                value.Ceza
              }]** \n Ceza Tarihi: ${new Date(
                value.Zaman
              ).toTurkishFormatDate()} \n Ceza Sebebi: **${
                value.Sebep
              }** \n Yetkili: ${
                message.guild.members.cache.has(value.Yetkili)
                  ? message.guild.members.cache.get(value.Yetkili)
                  : value.Yetkili
              }`
          )
          .join("\n\n")
      : "Bu Kullanıcının Sicili Temiz!";
  function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " gün" : " gün") + " önce";
  }

  var user =
    message.mentions.users.first() ||
    message.client.users.cache.get(args[0]) ||
    message.client.users.cache.find(
      m => m.username === args.slice(0).join(" ")
    ) ||
    message.author;
  message.author;
  const member = message.guild.member(user);

  const isim = args[0];
  if (!isim)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Hata :x:")
        .setDescription(
          "**Kullanım:** İsim,Yaş,Günlük Aktiflik Süresi,İstediğin Yetki"
        )
    );

  const yaş = args[1];
  if (!yaş)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Hata :x:")
        .setDescription("Yaşını belirtmedin?")
    );

  const aktiflik = args[2];
  if (!aktiflik)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Hata :x:")
        .setDescription("Günlük Aktiflik süreni belirtmedin?")
    );

  const yetki = args.slice(3).join(" ");
  if (!yetki)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Hata :x:")
        .setDescription("Hangi yetkiyi istediğini belirtmedin?")
    );

  message.channel.send(
    new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle(":white_check_mark: Başarılı :white_check_mark:")
      .setDescription("Başvurun başarıyla gönderildi!")
  );

  client.channels.cache.get("845007257989414922").send(
    new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(message.guild.name, message.guild.userURL)
      .addField(
        `Kullanıcı Bilgileri`,
        ` Kullanıcı Adı: <@${message.author.id}> \n Kullanıcı ID: \`${
          message.author.id
        }\` \n İlgilenecek Yetkili: <@&844646166535733339> \n Tarih: \`${moment().format(
          "DD/MM/YYYY | H:mm:ss"
        )}\` `
      )
      .addField(
        `Sicil`,
        `${seviyebaş}${seviyeileri}${seviyeileri}${seviyeileri}${seviyeileri}${seviyeorta}${seviyeorta}${seviyeorta}${seviyeorta}${seviyeorta}${seviyeson} \n \`${sicilPanel}\``
      )
      .addField(
        `Sunucuya Katılma Tarihi`,
        `\`${moment.utc(member.joinedAt).format("Do MMMM YYYY")} - ${checkDays(
          member.joinedAt
        )} \``
      )
      .addField(
        `Yetki Bilgi`,
        ` İsim: \`${isim}\` \n Yaş: \`${yaş}\` \n Aktiflik \`${aktiflik}\` \n Başvuru Yetki: \`${yetki}\``
      )
      .addField(`Başvuru Açıklama`, `\`${args}\``)
      .setFooter(`${message.author.username} Tarafından Başvuruldu`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["başvur"],
  permLevel: 0
};

exports.help = {
  name: "başvur",
  description: "Yetkili Başvuru Sistemi",
  usage: "başvur"
};