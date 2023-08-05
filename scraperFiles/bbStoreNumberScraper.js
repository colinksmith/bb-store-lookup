let example = {
    '0448':{
        "title":"Plymouth Meeting",
        "number":"Store 448",
        "address-1":"2010 Chemical Rd",
        "address-2":"Plymouth Meeting, PA 19462",
        "link":"https://stores.bestbuy.com/pa/plymouth-meeting/2010-chemical-rd-448.html"       
    }
}

const puppeteer = require('puppeteer')
const fs = require('fs')
const homeLink = 'https://stores.bestbuy.com/'
const directoryLink = 'https://stores.bestbuy.com/index.html'
const urlLink = 'https://stores.bestbuy.com/al/mobile/1310-tingle-cir-e-340.html'

const dirPath = './data'
const filePath = './data/storeData.json'
const errorFilePath = './data/error.txt'
const urlListPath = './data/urls'



const createDir = (dirPath) => {
    fs.mkdirSync(dirPath, {recursive: true}, (error) => {
        if (error) {
            console.error('An error occurred: ', error)
        } else {
         //    console.log('Your directory is made!')
        }
    })
 }
 const createFile = (filePath, fileContent) => {
    fs.writeFile(filePath, fileContent, (error) => {
        if (error) {
            console.error('An error occurred: ', error)
        } else {
         //    console.log('Your file is made!')
        }
    })
 }

function formatStoreNumber(storeNumber) {
    while(storeNumber.length > 0 && storeNumber.includes('-')){
        storeNumber = storeNumber.slice(1)
    }
    if (storeNumber.length < 4) {
        storeNumber = storeNumber.padStart(4, '0')
    }
    return storeNumber ? storeNumber : 'trash'
}

async function getTextContent(selector, page) {
    let element = await page.waitForSelector(selector)
    let text = await page.evaluate(element => element.textContent, element)
    return text
}

async function scrapePageData(url, page) {
 
    await page.goto(url)
    
    let storeNumber = formatStoreNumber(page.url().slice(-9, -5))
    let title = await getTextContent('span.LocationName-geo', page)
    let storeNumberStr = `Store ${storeNumber}`
    let address1 = await getTextContent('.c-address-street-1', page)

    let address2 = `${await getTextContent('.c-address-city', page)}, ${await getTextContent('.c-address-state', page)} ${await getTextContent('.c-address-postal-code', page)}`

    let output = {}
    output[storeNumber] = {}
    output[storeNumber].title = title
    output[storeNumber].number = storeNumberStr
    output[storeNumber].address1 = address1
    output[storeNumber].address2 = address2
    output[storeNumber].link = page.url()

    console.log(output)
    return output
}

async function writeDate(data) {
    let json = ''
    try {
        if (fs.existsSync(filePath)){
            const prevData = JSON.parse(await fs.readFileSync(filePath))
            const newData = {
                ...prevData,
                ...data
            }
            json = JSON.stringify(newData, null, 4)

            fs.writeFile(filePath, json, (err) => {
                if (err) throw err
            })
            // console.log(`${filePath} already exists, and data has been added for "${urlLink}"`)
        } else {
            json = JSON.stringify(data, null, 4)
            createDir(dirPath)
            createFile(filePath,json)
            console.log(`created ${filePath} for "${urlLink}"`)
        }
    } catch (err){
        console.error(err)
    }
}

async function writeError(message) {
    const date = new Date()
    message = `${date}: ${message}`
    try {
        if (fs.existsSync(errorFilePath)){
            fs.appendFile(errorFilePath, `\n\n${message}`, (err) => {
                if (err) throw err
            })
            console.log(`added error to ${errorFilePath} for "${urlLink}"`)
        } else {
            createDir(dirPath)
            createFile(errorFilePath,message)
            console.log(`created ${errorFilePath} for "${urlLink}"`)
        }
    } catch (err){
        console.error(err)
    }
}

async function writeUrls(data) {
    data = JSON.stringify(data)
    data = data.replaceAll(',', ',\n')
    try {
        if (fs.existsSync(urlListPath)){

            fs.writeFile(urlListPath, data, (err) => {
                if (err) throw err
            })
            // console.log(`${urlListPath} already exists, and the data array has been updated for "${urlLink}"`)
        } else {
            createDir(dirPath)
            createFile(urlListPath,data)
            console.log(`created ${urlListPath} for "${urlLink}"`)
        }
    } catch (err){
        console.error(err)
    }
}

async function getUrls(url, page) {
    const urls = []
    await page.goto(url)
    await page.waitForSelector('.c-directory-list-content-item-link')
    let arr = await page.$$('.c-directory-list-content-item-link')
    for (let i = 0; i < arr.length; i++) {
        const url = await page.evaluate(anchor => anchor.getAttribute('href'), arr[i])
        urls.push(`${homeLink}${url}`)
    }
    return urls
}

async function getTeaserUrl(url, page) {
    const urls = []
    await page.goto(url)
    await page.waitForSelector('.Teaser-link.Link')
    let arr = await page.$$('.Teaser-link.Link')
    for (let i = 0; i < arr.length; i++) {
        const url = await page.evaluate(anchor => anchor.getAttribute('href'), arr[i])
        urls.push(`${homeLink}${url.slice(3)}`)
    }
    return urls
}

async function main() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    let linkDirectory = []

    linkDirectory = await getUrls(directoryLink, page)

    for (let i = 0; i < linkDirectory.length; i++) {
        // console.log(linkDirectory[i])
        if (linkDirectory[i].split('/').length === 5 ) {
            try {
                linkDirectory.splice(i, 1, ...(await getTeaserUrl(linkDirectory[i], page)))
                i--
                writeUrls(linkDirectory)
            } catch (error) {
                console.log(`an error occured on this url: ${linkDirectory[i]}, #${i}`)
                writeError(`an error occured on this url: ${linkDirectory[i]}, #${i} \n ${error}`)
                console.log(error)
            }
        } else if (linkDirectory[i].split('/').length < 5 ) {
            try {
                linkDirectory.splice(i, 1, ...(await getUrls(linkDirectory[i], page)))
                i--
                writeUrls(linkDirectory)
            } catch (error) {
                console.log(`an error occured on this url: ${linkDirectory[i]}, #${i}`)
                writeError(`an error occured on this url: ${linkDirectory[i]}, #${i} \n ${error}`)
                console.log(error)
            }
        } else {
            try {
                let pageData = await scrapePageData(linkDirectory[i], page)
                await writeDate(pageData)
            } catch (error) {
                console.log(`an error occured on this url: ${linkDirectory[i]}, #${i}`)
                writeError(`an error occured on this url: ${linkDirectory[i]}, #${i} \n ${error}`)
                console.log(error)
            }
        }
    }

    browser.close()

}

main()