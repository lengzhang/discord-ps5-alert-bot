import directPS5C from './directPS5C.js'

const commands = {
    directps5c: {
        register:
            /**
             * @param {Discord.Message} message
             */
            (message) => {
                directPS5C.addChannel(message.channel.id)
                message.reply(`Channel registered to DirectPS5C`)
                const status = directPS5C.getStatus()
                message.channel.send(status)
            },
        unregister:
            /**
             * @param {Discord.Message} message
             */
            (message) => {
                directPS5C.removeChannel(message.channel.id)
                message.reply(`Channel unregistered from DirectPS5C`)
            },
        status:
            /**
             * @param {Discord.Message} message
             */
            (message) => {
                const status = directPS5C.getStatus()
                message.reply(status)
            },
        detail:
            /**
             * @param {Discord.Message} message
             */
            (message) => {
                const detail = directPS5C.getDetail()
                message.reply(JSON.stringify(detail))
            },
    },
}

/**
 * Handle Discord message
 * @param {Discord.Client} client
 */
const handler = (client) =>
    /**
     * @param {Discord.Message} message
     */
    async (message) => {
        const msg = message.content.toLowerCase()
        if (!/^\!\?/.test(msg)) return
        const command = msg.split(' ')
        command[0] = command[0].replace(/^\!\?/, '')

        let c = commands
        for (let i = 0; i < command.length; i++) {
            const cmd = command[i]
            c = c[cmd]
            if (typeof c === 'function') break
        }
        if (typeof c === 'function') c(message)
    }

export default handler
