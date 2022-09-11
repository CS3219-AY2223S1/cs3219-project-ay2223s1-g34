import io from "socket.io-client"

var socket = io('http://localhost:8002', {
    cors: {
        origin: "*",
  }
});
function getEl(id) {
    return document.getElementById(id)
}
const editor = getEl("editor")
editor.addEventListener("keyup", (evt) => {
    const text = editor.value
    socket.send(text)
})
socket.on('message', (data) => {
    editor.value = data
})