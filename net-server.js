const fs = require("fs")
const net = require("net")

const filename = process.argv[2]
if(!filename){
    throw Error("Ошибка пу пу пу")
}

net.createServer(connection =>{
    console.log("Клиент на базе")
    connection.write(JSON.stringify({type: "watcher", file: filename}) + "\n")

    const watcher = fs.watchFile(filename, ()=>{
        connection.write(JSON.stringify({type: "changer", time: Date.now()}) + "\n")
    })

    connection.on("close", ()=>{
        console.log("Клиент отвалился")
        fs.unwatchFile(filename)
    })
}).listen(60300, ()=>{
    console.log("Сервер запустился")
})
