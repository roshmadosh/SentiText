var ws = new WebSocket("ws://localhost:8000/test")

ws.onmessage = event => {
    var number = document.getElementById("number")
    number.innerHTML = event.data
}    

function handleOnClick() {
    ws.send("hi")
}
