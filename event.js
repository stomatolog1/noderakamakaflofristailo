const EventEmitter = require('events')
// const obj = new EventEmitter()
// obj.on('greet', name=>{
//     console.log(`HEllow ${name}`)
// })
// obj.off('greet', (date)=>{})
// obj.emit('greet', 'John')

class UserManger extends EventEmitter{
    constructor(){
        super()
        this.users = []
    }
    addUser(user){
        this.users.push(user)
        this.emit('userAdded', user)
    }
    removeUser(userId){
        let user = this.users.find(u => u.id == userId)
        if(user){
            this.users = this.users.filter(u => u.id != userId)
            this.emit('removeUser', user)
        }
    }
}
//{id: 1, name: 'JOng'}
const userManger = new UserManger()
userManger.on('userAdded', user => console.log(`Пользователь добавлен; ${user.name}`))
userManger.on('removeUser', user => console.log(`Удалёе; ${user.name}`))

userManger.addUser({id: 1, name: 'John'})
userManger.addUser({id: 2, name: 'Koke'})
userManger.removeUser(1)
console.log(userManger)