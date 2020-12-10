import dotenv from 'dotenv'
import Discord from 'discord.js'

import utils from './utils.js'

import directPS5C from './directPS5C.js'

import messageHandler from './handleMessage.js'

const { log } = utils

dotenv.config()

const { DISCORD_TOKEN } = process.env

const client = new Discord.Client()

client.on('ready', () => {
    log(`Logged in as ${client.user.tag}!`)

    directPS5C.setClient(client)
    directPS5C.main()
    log('Direct PS5C set client')
})

client.on('error', (error) => {
    log(error, 'error')
})

client.on('message', messageHandler(client))

client.login(DISCORD_TOKEN)
