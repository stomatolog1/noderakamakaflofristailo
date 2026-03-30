const EventEmitter = require('events').EventEmitter

class YAMPClient extends EventEmitter{
    constructor(stream){
        super()
        let buffer = ''

        stream.on('data', data =>{
            buffer += data
            let lineFeed = buffer.indexOf('\n')
            console.log(lineFeed)
            while(lineFeed != -1){
                let input = buffer.substring(0, lineFeed)
                buffer = buffer.substring(lineFeed+1)
                this.emit('message', JSON.parse(input))
                lineFeed = buffer.indexOf('\n')
            }
        })
    }
    static connect(stream){
        return new YAMPClient(stream)
    }
}
module.exports = YAMPClient
/**
 * const client = new YAMPClient(netStream)
 * client.on('message', message =>{})
 */