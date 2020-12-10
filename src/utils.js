/**
 * @param {string} message
 * @param {'info' | 'error'} type
 */
const log = (message, type = 'info') => {
    const timeString = new Date().toLocaleString('en-GB')
    console.log(`${timeString} : ${message}`)
}

const wait = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

export default { log, wait }
