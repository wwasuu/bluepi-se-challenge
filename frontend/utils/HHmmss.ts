function HHmmss(time: number): String {
    if (time <= 0) return "00:00:00"
    var pad = function(num: number, size: number) { return ('000' + num).slice(size * -1); }
    let hours = Math.floor(time / 60 / 60)
    let minutes = Math.floor(time / 60) % 60
    let seconds = Math.floor(time - minutes * 60)    

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2)
}

export default HHmmss