const netclient = require('net').connect({port: 60300})
const yampClient = require('./lib/yamp-client.js').connect(netclient)

yampClient.on('message', message => {
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