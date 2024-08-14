function normalizeURL (urlString) {
    const urlObj = new URL(urlString)
    let hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostpath.length >0 && hostpath[hostpath.length - 1] == '/'){
        hostpath = hostpath.substring(0,hostpath.length -1)
    }
    console.log(hostpath)
    return hostpath
}

normalizeURL("https://blog.boot.dev/path/")

module.exports = {
    normalizeURL
}