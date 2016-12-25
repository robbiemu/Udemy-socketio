const IP = '192.168.1.143'
const PORT = '6677'

const socket = io.connect(`${IP}:${PORT}`, {forceNew:true})

class ViewModel {
    constructor(){
        this.mensajes = []
    }
    render(){
        let html = this.mensajes.map((m, i) => `<div class="mensaje">
            <strong class="nickname">${m.nickname}</strong>
            <p class="text">${m.text}</p>
        </div>`).join("\n")

        document.getElementById('mensajes').innerHTML = html
    }
}
const vm = new ViewModel

socket.on('mensajes', function (txr) {
    //console.dir(txr)
    vm.mensajes = txr
    vm.render()
})