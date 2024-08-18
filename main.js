const express = require('express')
const app = express()
const port = 8000
const cors = require('cors')

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET","POST","PUT","DELETE"]
    }),
    express.static('public'),
    express.json({limit: '1mb'}),
)

const {crawlPage} = require("./crawl.js")
const {printReport} = require("./report.js")

async function create(url) {
    url = "https://"+url
    return url
}

async function main(url) {

    let baseURL
    if (url.substring(0,4) != "http"){
        baseURL = await create(url)
    } else {
        baseURL = url
    }

    const pages = await crawlPage(baseURL,baseURL,{})

    return pages

}

app.post('/', async (req, res) => {
    const url = req.body.link
    const pages = await main(url)
    res.send(pages)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})