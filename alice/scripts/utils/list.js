function range(max) {
    return Object.keys([... new Array(max)])
}

module.exports = {
    range
}