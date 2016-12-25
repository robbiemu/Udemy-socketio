const IP = '192.168.1.143'
const PORT = '6677'

const socket = io.connect(`${IP}:${PORT}`, {forceNew:true})

class ViewModel {
    constructor(socket){
        this.mensajes = []
        this.socket = socket
    }
    render(){
        let htmlMensajes = this.mensajes.map((m, i) => `<div class="mensaje">
            <strong class="nickname">${m.nickname}</strong>
            <p class="text">${m.text}</p>
        </div>`).join("\n")

        let eleMensajes = document.getElementById('mensajes');
        eleMensajes.innerHTML = htmlMensajes
        eleMensajes.scrollTop = eleMensajes.scrollHeight // parece que no funciona en edge, pero chrome si
    }
    enviarMensaje(ele) {
        let mensaje = {
            nickname: document.getElementById('nickname').value,
            text:  document.getElementById('text').value
        }
         document.getElementById('nickname').style.display = 'none'
         document.getElementById('text').value= ''

         this.socket.emit('añadirMensaje', mensaje)
         return false
    }
}
const vm = new ViewModel(socket)

socket.on('mensajes', function (txr) {
    //console.dir(txr)
    vm.mensajes = txr
    vm.render()
})