const {JSDOM} = require('jsdom')

async function crawlPage(currURL) {
    console.log(`Actively crawling ${currURL}`)

    try {
        const resp = await fetch(currURL)

        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page ${currURL}`)
            return
        }

        const contentType = resp.headers.get('content-type')

        if (!contentType.includes("text/html")) {
            console.log(`non html response with content type ${contentType} on page ${currURL}`)
            return
        }

        console.log(await resp.text())
    } catch (err) {
        console.log(`${err.message} in ${currURL}`)
    }
}

function normalizeURL (urlString) {
    const urlObj = new URL(urlString)
    let hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostpath.length >0 && hostpath[hostpath.length - 1] == '/'){
        hostpath = hostpath.substring(0,hostpath.length -1)
    }
    return hostpath
}

function getURLsFromHTML(htmlbody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlbody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href[0] == '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with relative url : ${err.message}`)
            }
        } else {
            // absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (err) {
                console.log(`error with absolute url : ${err.message}`)
            }
        }
    }
    return urls
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}