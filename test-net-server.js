const server = require('net').createServer(connection =>{
    console.log("КЛиент присоед")


    const first = '{"type": "changer", '
    const second = ' "time": 123456789000} \n'

    connection.write(first)

    const timer = setTimeout(()=>{
        connection.write(second)
        connection.end()
    }, 1000)

    connection.on('end', ()=>{
        clearTimeout(timer)
        console.log("Клиент отвалился")
    })
})
server.listen(60300, ()=> console.log("сервер слушает"))