const Discord = require('discord.js')
const Config = require('../../config.json')
const roller = require('../../roller.json')
const kanallar = require('../../kanallar.json')

exports.run = async (client, message, args) => {
        message.channel.send(new Discord.MessageEmbed().setDescription(`\
Öncelikle bir rol vermek istiyorsanız <@&${roller.botkomutyetki}> rolüne sahip olmalısınız!
------------------------------------------------------------
<@&${roller.vocal}>  \`.vocal @Luna/ID\`
<@&${roller.designer}> \`.designer @Luna/ID\`
<@&${roller.sponsor}>   \`.sponsor @Luna/ID\`
`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor('2F3136')
            .setAuthor('Yardım Menüsü!')
            .setFooter(Config.footer)
        ) 
    }

    exports.conf = {
        aliases:[]
    };
    
    exports.help = {
        name:'rolver'
    }