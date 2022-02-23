// Client
const Discord = require('discord.js')

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGES",
        "GUILD_MEMBERS",
    ]
})

const config = require('./config.json')

const TOKEN = config.token;

const prefix = "#"

client.login(TOKEN)

// Commands
const fs = require('fs')

client.commands = new Discord.Collection()

const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// Events
client.once("ready", () => {
    console.log("Connected")
})

client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return

    const args = message.content.slice(prefix.length).trim().split(/\s+/)

    const command = args.shift().toLowerCase();

    switch (command) {
        case "hello_world":
            client.commands.get("hello_world").run(message)
            break
        default:
            break
    }
})