const express = require('express')
const app = express();
const servidor = require('http').Server(app)

const io = require('socket.io')(servidor)

app.use(express.static('cliente'))

//app.get('/')
app.get('/hola-mundo', function(req,res){
    res.status(200).send('hola mundo desde esta ruta')
})

var mensajes = [{
    id: 1,
    text: 'bienvenido al chat privado de Victor Robles',
    nickname: 'Bot - victor'
}]

io.on('connection', function (socket) {
    console.log(`El cliente con ip ${socket.handshake.address} se ha contectado`)

    socket.emit('mensajes', mensajes)
})

servidor.listen(6677, function(){
    console.log('Servidor está funcionando: http://localhost:6677/')
})
