const net = require('net')
const client = net.connect({port: 60300})

client.on('data', data => {
    const message = JSON.parse(data)
    switch(message.type){
        case 'watcher': 
            console.log(`Наблюдаю за файлом ${message.file}`);
            break;
        case 'changer':
            const data = new Date(message.time)
            console.log(`файл изменился ${data}`);
            break;
        default:
            console.log(`Не известный тип ${message.type}`);
            break;
    }
})