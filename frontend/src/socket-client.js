import io from "socket.io-client"

function getEl(id) {
    return document.getElementById(id)
}

function createSocket() {
    var socket = io('http://localhost:8002', {
    cors: {
        origin: "*",
    }
    });
    const editor = getEl("editor")
    editor.addEventListener("keyup", (evt) => {
        const text = editor.value
        socket.send(text)
    })
    socket.on('message', (data) => {
        editor.value = data
    })
    return socket
}


export default createSocket