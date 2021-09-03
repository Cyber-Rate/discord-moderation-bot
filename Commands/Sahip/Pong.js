const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db");
const ayarlar = require("../../config.json") 

exports.run = async (client, message, args) => {
message.channel.send('Pong!')
};

exports.conf = {
  aliases:[]
};

exports.help = {
  name:'pong'
}