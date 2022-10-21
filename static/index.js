const ws = new WebSocket("ws://localhost:8000/test")

const editorText = document.getElementById("editor-text");
const editorPlaceholder = document.querySelector('.editor-placeholder');
const clickMe = document.querySelector('.click-me');

// --[EVENT LISTENERS]-- //
clickMe.addEventListener('click', () => {
    ws.send(editorText.innerHTML);
})    

editorText.addEventListener('focusin', (e) => {
    editorPlaceholder.classList.add('hidden');
})

editorText.addEventListener('focusout', (e) => {
    let content = e.target.innerHTML;
    if (!content || content == '<br>') {
        editorPlaceholder.classList.remove('hidden');
        isEmpty = true;
    }
})

// --[WEB SOCKET STUFF]-- //

ws.onmessage = event => {
    var number = document.getElementById("number")
    number.innerHTML = event.data
}