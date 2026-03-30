const assert = require('assert')
const YAMPClient = require('../lib/yamp-client.js')
const EventEmitter = require('events').EventEmitter


it('мы что-то тестим', done => {
    assert.equal(2 + 2, 4)
    done()
})

describe('YAMPClient',  () =>{
    let stream = null
    let client = null
    
    beforeEach(() =>{
        stream = new EventEmitter()
        client = new YAMPClient(stream)
    })
    

    it('Должен прийти одиночное сообщение', done => {
        client.on("message", message =>{
            assert.deepEqual(message, {foo: 'bar'})
            done()
        })
        stream.emit('data', '{"foo": "bar"}\n')
    })   

    it('Должен прийти из разбитого в не разбитое', done => {
        client.on("message", message =>{
            assert.deepEqual(message, {foo: 'bar'})
            done()
        })
        stream.emit('data', '{"foo": ')
        process.nextTick(()=>{
            stream.emit('data', '"ba')
        })
        process.nextTick(()=>{
            stream.emit('data', 'r"}')
        })
        process.nextTick(()=>{
            stream.emit('data', '\n')
        })
    })   
})

