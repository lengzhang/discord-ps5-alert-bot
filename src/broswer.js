import puppeteer from 'puppeteer'
import utils from './utils.js'
const { log } = utils

const isHeadless = process.argv.includes('--headless')

const broswer = await puppeteer.launch({
    slowMo: 100,
    headless: isHeadless,
    ignoreHTTPSErrors: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
log('puppeteer launched')

export default broswer
