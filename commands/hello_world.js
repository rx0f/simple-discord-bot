module.exports = {
    name: "hello_world",
    description: "Says hello world",

    async run(message) {
        message.channel.send("Hello World!")
    }
}