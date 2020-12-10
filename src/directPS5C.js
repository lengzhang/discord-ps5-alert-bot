import utils from './utils.js'
const { log, wait } = utils

import axios from 'axios'

const ITEM_URL =
    'https://direct.playstation.com/en-us/consoles/console/playstation5-console.3005816'
const ITEM_API =
    'ttps://api.direct.playstation.com/commercewebservices/ps-direct-us/users/c9dad115328d8196835b2e09b77c0b82b1bd1785320583797c3ae1b9e91bccbb/products/productList?fields=BASIC&productCodes=3005816'

/********** Discord Client **********/
/** @type {Discord.Client | null} */
let discordClient = null
/**
 * @param {Discord.Client} client
 */
const setClient = (client) => {
    discordClient = client
}

/********** Discord Channels **********/
/** @type {string[]} */
const channels = []
/**
 * @param {string} id
 */
const addChannel = (id) => {
    channels.push(id)
    log(`DirectPS5C add channel ${id}`)
}
/**
 * @param {string} id
 */
const removeChannel = (id) => {
    const index = channels.indexOf(id)
    if (index > -1) channels.splice(index, 1)
    log(`DirectPS5C remove channel ${id}`)
}
/**
 * @param {string} id
 */
const hasChannel = (id) => channels.includes(id)

/********** Detail **********/
let detail = null
const setDetail = async (product) => {
    const prevStock = detail?.stock
    detail = {
        name: product?.name || null,
        stock: product?.stock?.stockLevelStatus || null,
        price: product?.price,
        updateAt: Date.now(),
    }
    if (discordClient === null) return

    if (prevStock === detail.stock) return
    // send notice when stock update
    channels.forEach((channel) => {
        discordClient.channels.cache.get(channel).send(getStatus())
    })
}

const getStatus = () => {
    return detail === null
        ? 'No Details'
        : `${detail.name}: ${
              detail.stock === 'outOfStock' ? 'Out of Stock' : 'In Stock'
          } at ${new Date(detail.updateAt).toLocaleString(
              'en-GB'
          )}\n${ITEM_URL}`
}

/********** Main Loop **********/
const timeout = [2, 2, 2, 5, 5, 10]
let counter = 0
;(async () => {
    while (true) {
        try {
            const res = await axios.get(ITEM_API)
            const product = res?.data?.products?.[0]
            if (!!product) await setDetail(res?.data?.products?.[0])
        } catch (error) {
            log(error, 'error')
        }
        await wait(timeout[counter % (timeout.length - 1)] * 1000)
        counter++
    }
})()

export default (() => ({
    setClient,
    addChannel,
    removeChannel,
    hasChannel,
    getDetail: () => detail,
    getStatus,
}))()
