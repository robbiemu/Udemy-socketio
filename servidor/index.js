const express = require('express')
const app = express();
const servidor = require('http').Server(app)

const io = require('socket.io')(servidor)

app.get('/')
app.get('/hola-mundo', function(req,res){
    res.status(200).send('hola mundo desde esta ruta')
})

servidor.listen(6677, function(){
    console.log('Servidor está funcionando: http://localhost:6677/')
})
