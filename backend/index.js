const http = require('http');
const express= require('express')
const app = express();
const socketIO = require('socket.io')
const port = 4500 || process.env.PORT;

const server = http.createServer(app)
const io = socketIO(server)
const users = [{}]

io.on('connection', (socket)=>{
   
    socket.on('joined', ({user})=>{
        users[socket.id]= user
        console.log(`${user} has joined`)
    
 socket.emit('welcome', {user:"Admin", message:`hi ${users[socket.id]} welcome to mychat`})
 socket.broadcast.emit('userjoined', {user:"Admin", message:`${users[socket.id]} has joined`})
})
socket.on('message',({message,id})=>{
    io.emit('sendmessage', ({user:`${users[id]}`, message:message, id:id}))
})
socket.on('disconnect', ()=>{
    console.log('user left')
    socket.broadcast.emit('leave', ({user:'ADMIN', message:`${users[socket.id]} has left`}))
})
})

server.listen(port, ()=>{
  
})