const guard = (guard) => require(`./Events/guards/${guard}`)
const general = (general) => require(`./Events/general/${general}`)
const control = (ct) => require(`./Events/control/${ct}`)
module.exports = client => {
    client.on('message', general('message'));
    client.on("ready", () => general("ready")(client));




       client.on('ready', control('check'))
}
