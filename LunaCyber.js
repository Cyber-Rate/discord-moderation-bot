const Discord = require('discord.js');
const client = global.client = new Discord.Client();
const config = require('./config.json')
const roller = require('./roller.json')
const kanallar = require('./kanallar.json')
const db = require('quick.db')
const moment = require('moment');
var Jimp = require('jimp');
const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path');
const snekfetch = require('snekfetch');
const mmmonet = require("moment-duration-format")

const ms = require('ms');

const AsciiTable = require('ascii-table');
require('./eventHandler.js')(client);
var table = new AsciiTable('Aello Command Table');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./Commands').forEach(dir => { // Bu Handler Codare'den alıntıdır.
  const commandFiles = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const komutcuklar = require(`./Commands/${dir}/${file}`);
    table.setHeading("Command", 'Status', "Aliases")
    if (komutcuklar.help.name) {
      client.commands.set(komutcuklar.help.name, komutcuklar);
      table.addRow(komutcuklar.help.name, "Başarılı!", komutcuklar.conf.aliases)
    } else {
      table.addRow(komutcuklar.help.name, "Başarısız!")
      continue;
    }
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
    console.log(table.toString())
  }
})

var prefix = config.prefix;

///////  BOTA GİRİŞ YAPMA


client.login(config.yarrakam);

//////  BOTA GİRİŞ YAPMA




///// süre tanımları vs 

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on('ready', () => {
    wait(1000);
    client.guilds.cache.forEach(g => {
        g.fetchInvites().then(guildInvites => {
            invites[g.id] = guildInvites;
        });
    });
})



////// giriste kayıtsı verme şeysi


client.on("guildMemberAdd", member => {
  member.roles.add(roller.Unregister)
  });
  
  
  
  client.on("guildMemberAdd", member => {
  member.roles.add(roller.Unregister)
  });
  
  
  
  client.on("guildMemberAdd", member => {
  member.roles.add(roller.Unregister)
  });
  

////// giriste isim deği$tirme şeysi

client.on("guildMemberAdd", member => {
member.setNickname(config.isimi) 
});

////// giriste isim deği$tirme şeysi

////// client emoji cekilen yer şeysi i$te
         const numbers = {
          "8":"8",
          "9":"9",
          "4":"4",
          "6":"6",
          "2":"2",
          "1":"1",
          "5":"5",
          "7":"7",
          "0":"0",
          "3":"3"
        };
        
        client.emojili = function(sayi) {
          var qwe = "";
          var arr = Array.from(sayi);
          for (var x = 0; x < arr.length; x++) {
            qwe += (numbers[arr[x]] === "" ? arr[x] : numbers[arr[x]]);
          }
          return qwe;
        };
        
        
///// clientteki emojilerin cekildihi yer baby

    // [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
// [ ----------------------------------------------] \\
client.on('guildMemberAdd',async member => {
if (member.guild.id !== config.sunucuid) return
const Emotes = {
' ': '   ',
'0': '0',
'1': '1',
'2': '2',
'3': '3',
'4': '4',
'5': '5',
'6': '6',
'7': '7',
'8': '8',
'9': '9',
}

const Gifler = [
'https://cdn.discordapp.com/attachments/844675141807767563/851100899032301598/My_Video1.gif',
]
const Gif = Gifler[Math.floor(Math.random() * Gifler.length)]
if (config.girişebed == 'evet') {
const Ceon = new Discord.MessageEmbed()
.setColor('BLUE')
.setThumbnail(member.user.avatarURL({dynamic:true,size: 2048}))
.setDescription(`

**${message.guild.name} Sunucusuna Hoşgeldin**


** ${member}- (\`${member.id}\`) hesabın  ${client.gecmisTarihHesaplama(member.user.createdAt)} oluşturulmuş.**

** Ailemiz seninle birlikte** ${member.guild.memberCount} ** kişiye ulaştı! tagımızı alarak bizlere destek olabilirsin, <@&844249087070306305> rolüne sahip yetkililer senin ile ilgilenecektir.**

** İsim tagımız\` ¿ \` veya etiketine \`${config.etikettag}\` bu güzel ortama katılabilirsin #anılar kanalından ortamımıza bakabilirsin** 

`,true)
.setImage(Gif)
.setFooter(`Kayıt etmek için [${config.prefix}erkek, ${config.prefix}kadın]`,member.guild.iconURL({dynamic:true}))
client.channels.cache.get(kanallar.hgkanal).send(`<@&$844249087070306305> & ${member}`)
client.channels.cache.get(kanallar.hgkanal).send(Ceon)
} else {
client.channels.cache.get(kanallar.hgkanal).send(`
${member} Aramıza Hoş Geldin

Seninle beraber sunucumuz ${member.guild.memberCount} üye sayısına ulaştı.
Hesabın ${client.gecmisTarihHesaplama(member.user.createdAt)} oluşturulmuş ${config.onaye}

Kayıt olduktan sonra kuralları okuduğunuzu kabul edeceğiz ve içeride yapılacak cezalandırma işlemlerini bunu göz önünede bulundurarak yapacağız.`,)
} // Burası üyenin ismini değiştirir.
})


client.gecmisTarihHesaplama = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);

  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};
let anliktarih = Date.now()
let aylartoplam = {
"01": "Ocak",
"02": "Şubat",
"03": "Mart",
"04": "Nisan",
"05": "Mayıs",
"06": "Haziran",
"07": "Temmuz",
"08": "Ağustos",
"09": "Eylül",
"10": "Ekim",
"11": "Kasım",
"12": "Aralık"
};
     
/////// xp kısmı vs aşkoooo


/////// XP  SİSTEMİ SON


client.on("message", async message => {
if(message.author.bot || message.channel.type === "dm") return;
if(message.content.toLowerCase() === ""+config.prefix+"link") {
    [message.channel.send(""+ config.Link +"")]
}
})

client.on("message", async message => {
if(message.author.bot || message.channel.type === "dm") return;
if(message.content.toLowerCase() === ""+config.prefix+"tag") {
    [message.channel.send("\`"+ config.tag +"\`")]
}
})

client.on("message", async message => {
if(message.author.bot || message.channel.type === "dm") return;
if(message.content.toLowerCase() === ""+config.prefix+"tag") {
  [message.channel.send("\`"+ config.etikettag +"\`")]
}
})



//////bot oynuyor kank işte


client.on("ready", async() => {
  let botvoicechannel = client.channels.cache.get(kanallar.BotVoiceChannel);
  if(botvoicechannel) botvoicechannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı"));
})


/*Ufak hatalarda botun ofline olmaması için */
process.on('uncaughtException', function(err) { 
  console.log(err) 
});


//////   

const cyberiltifat = [
'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
'Mavi gözlerin, gökyüzü oldu dünyamın.',
'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
'Huzur kokuyor geçtiğin her yer.',
'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
 'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
 'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
 'Etkili gülüş kavramını ben senden öğrendim.',
 'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
 'Gözlerinle baharı getirdin garip gönlüme.',
 'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
 'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
 'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
 'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
 'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
 'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
 'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
'Biraz Çevrendeki İnsanları Takarmısın ?',
'İğrenç İnsansın!',
 'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
 'Onu Bunu Boşver de bize gel 2 bira içelim.',
  'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
  'Zara seni çok sevdi...',
  'Mucizelerden bahsediyordum.',
];
client.on("message", async message => {

if(message.channel.id !== (kanallar.chat)) return;


let Cyber = db.get('chatiltifat');
await db.add("chatiltifat", 1);
if(Cyber >= 60) {

  db.delete("chatiltifat");
  const random = Math.floor(Math.random() * ((cyberiltifat).length - 1) + 1);
  message.reply(`${(cyberiltifat)[random]}`);
};
});
 


let white = {         /////////////////////burada idsini girdihiniz kişiler sunucu içerisinde reklam yapabilcek 
  "585864203412308004": true
  };


//////////// yukarıda eğer idsi yoksa reklam yapamaz
client.on('message', async(message) => {
  if(white[message.author.id] || message.author.id == client.user.id) return;
   let link = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
   if (link.test(message.content)){
        db.add(`xxPornohub.${message.author.id}`, 1);
      message.delete()
    if(db.get(`xxPornohub.${message.author.id}`) >= 5){
     db.push(`${message.author.id}_sicil`, `Metin kanallarında reklam sebebiyle **Süresiz** mutelendi  `)  
     return message.member.roles.add("842844085148844032")// mute rol id
   }
   }
 })



///////// afk işte aqq ellemme 
function afkSil(message, afk, isim) {
  message.channel.send(`${message.author} Artık **AFK** değilsiniz.`);
  db.delete(`afkSebep_${afk.id}_${message.guild.id}`)
  db.delete(`afkid_${afk.id}_${message.guild.id}`)
  db.delete(`afkAd_${afk.id}_${message.guild.id}`)
  db.delete(`afk_süre_${afk.id}_${message.guild.id}`)
  message.member.setNickname(isim)
};

client.on("message" , async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  var fd = false
  var sdd = new Set();
  let afk = message.mentions.users
  if (afk.first()) {
    afk.forEach(async afk => {
      if (sdd.has(afk.id)) return;
      else sdd.add(afk.id)
      var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
      var kisi2 = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
      if (kisi) {
        var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
        if (kisi2) {
          fd = true
          afkSil(message, message.member, isim)
        }
        if (afk.id == message.member.id) {
          if (!fd) afkSil(message, afk, isim)
        }
        if (afk.id !== message.member.id) {
          var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
          if (sebep) {
            let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
            let timeObj = ms(Date.now() - süre);
            message.channel.send(`${afk} Adlı , Kişi ${sebep} Sebepinden Dolayı __AFK__`);
          };
        }
      } else {
        afk = message.member
        kisi = db.fetch(`afkid_${message.member.id}_${message.guild.id}`)
        if (kisi) {
          var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
          if (afk.id == message.member.id) {
            afkSil(message, afk, isim)
          }
          if (afk.id !== message.member.id) {
            var sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
            if (message.content.includes(kisi)) {
              if (sebep) {
                let süre = await db.fetch(`afk_süre_${afk.id}_${message.guild.id}`);
                let timeObj = ms(Date.now() - süre);
                message.channel.send(`${afk} Adlı , Kişi ${sebep} Sebepinden Dolayı __AFK__`);
              };
            }
          }
        }
      }
    })
  } else {
    afk = message.member
    var kisi = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
    if (!kisi) return;
    var isim = db.fetch(`afkAd_${afk.id}_${message.guild.id}`)
    afkSil(message, afk, isim)
  }
});

//////////// afk bittti knks 



/////// TAG ALMA SALMA ETİKETLİ VS İSTE KNKS
    
client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
  const db = require('croxydb');
  let tag = (config.tag)
  const roleID = (roller.taglırol)
   const guildID = (config.sunucuid)
  const chat = (kanallar.chat)
  const log2 = (kanallar.taglog)
  const etiket = (config.etiket)
  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          member.roles.set(roller.kayıtsızRolleri)
          member.roles.remove(roleID)
          member.setNickname(`★ Kayıtsız`)
          db.delete(`isimler_${member.user.id}`)
          db.delete(`kayıt_${member.id}`)
          client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **${tag}** sildi \n \`Alınan Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
          client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **${tag}** tagını aldı \n \`Verilen Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
      }
  }
 if (newUser.discriminator !== oldUser.discriminator) {
      if (oldUser.discriminator == `${etiket}` && newUser.discriminator !== `${etiket}`) {
          member.roles.set(roller.kayıtsızRolleri)
          member.setNickname(`★ Kayıtsız`)
          client.channels.cache.get(log2).send(`${newUser} Adlı kişi isminden **#${etiket}** sildi \n \`Alınan Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
      } else if (oldUser.discriminator !== `${etiket}` && newUser.discriminator == `${etiket}`) {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(`${newUser} Adlı kişi ismine **#${etiket}** tagını aldı \n \`Verilen Rol:\` \`#Of Best\` \n\n \`Kişi Bilgileri;\` \n \`Kişi İd:\` ${newUser.id} \n \`Kişi İsmi:\` ${newUser.tag} \n \`Kişi Etiketi:\` ${newUser} \n  \n\n \`Kişinin Eski İsimi:\` ${oldUser.tag} \n \`Kişinin Yeni İsimi:\` ${newUser.tag}`)
          client.channels.cache.get(chat).send(` ${newUser} \` Tag aldı selam verin.\``).then(x => x.delete({timeout: 10000})) 
      }
  }

}) 
 

////////// TAG ALMA SALMA BOKUNUN BİTTİHİ YER İSTE BABY





/////// GİRİSTE TAG LOG


  
client.on("guildMemberAdd", member => {
  let sunucuid = (config.sunucuid); 
  let tag = (config.tag);
  let rol = (roller.taglırol); 
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
      .setTimestamp()
     client.channels.cache.get(kanallar.taglog).send(tagalma)
}
})


    //////-------etiket girişte-------/////

      
  client.on("guildMemberAdd", member => {
    let sunucuid = (config.sunucuid); 
    let tag = (config.etiket);
    let rol = (roller.taglırol); 
  if(member.user.discriminator.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
        .setTimestamp()
       client.channels.cache.get(kanallar.taglog).send(tagalma)
  }
  })
  


  //////// GİRİSTE TAG LOG



////////////// VOİCE LOG VE SNİPE

client.on('voiceStateUpdate', (oldMember, newMember) => {
{ 
  const voicelog = kanallar.voicelogcuk
  let giriş = client.channels.cache.get(voicelog);
  let çıkış = client.channels.cache.get(voicelog);
  let odadeğişme = client.channels.cache.get(voicelog);
  let logKanali = client.channels.cache.get(voicelog);
  let susturma = client.channels.cache.get(voicelog);
  let sağırlaştırma = client.channels.cache.get(voicelog);

  if (oldMember.channelID && !oldMember.serverMute && newMember.serverMute) return logKanali.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda yetkili tarafından **susturdu!**`).catch();
  if (!oldMember.channelID && newMember.channelID) return giriş.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
  if (oldMember.channelID && !newMember.channelID) return çıkış.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
  if (oldMember.channelID && newMember.channelID && oldMember.channelID != newMember.channelID) return odadeğişme.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newMember.guild.channels.cache.get(oldMember.channelID).name}\` => \`${newMember.guild.channels.cache.get(newMember.channelID).name}\`)`).catch();
  if (oldMember.channelID && oldMember.selfMute && !newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
  if (oldMember.channelID && !oldMember.selfMute && newMember.selfMute) return susturma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
  if (oldMember.channelID && oldMember.selfDeaf && !newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
  if (oldMember.channelID && !oldMember.selfDeaf && newMember.selfDeaf) return sağırlaştırma.send(`\`${newMember.guild.members.cache.get(newMember.id).displayName}\` üyesi \`${newMember.guild.channels.cache.get(newMember.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
};
});   

