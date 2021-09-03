module.exports = message => {
  const Config = require('../../config.json')
  let client = global.client;
  let prefix = Config.Prefix;
  let prefix2 = Config.prefix;
  if (message.author.bot) return;
  if (prefix2) {

    if (!message.content.startsWith(prefix) && !message.content.startsWith(prefix2)) return;

  } else if (!prefix2) {

    if (!message.content.startsWith(prefix)) return;

  }
  let command = message.content.split(' ')[0].slice(prefix.length) || message.content.split(' ')[0].slice(prefix2.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
}

client.elevation = message => {
  const Config = require('../../config.json')

  if (!message.guild) { return; }
  let permlvl = 0;
  let sahip = Config.sahip;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === sahip) permlvl = 4;
  return permlvl;
};
