const ws = new WebSocket("ws://localhost:8000/test")

const editorText = document.getElementById("editor-text");
const editorPlaceholder = document.querySelector('.editor-placeholder');
const clickMe = document.querySelector('.click-me');

// --[EVENT LISTENERS]-- //
editorText.addEventListener('keyup', (e) => {
    text = e.target.innerHTML
    ws.send(text)
})

editorText.addEventListener('focusin', (e) => {
    editorPlaceholder.classList.add('hidden');
})

editorText.addEventListener('focusout', (e) => {
    let content = e.target.innerHTML;
    if (isEditorEmpty(content)) {
        editorPlaceholder.classList.remove('hidden');
        isEmpty = true;
    }
})

// --[WEB SOCKET LISTENER]-- //
ws.onmessage = event => {
    const { text, NEGATIVE, NEUTRAL, POSITIVE } = JSON.parse(event.data);

    if (isEditorEmpty(text)) {
        document.body.style.backgroundColor = 'ghostwhite';
    }

    const pre_scores = [NEGATIVE, NEUTRAL, POSITIVE];
    const rgb = []
    pre_scores.forEach(score => { rgb.push(parseFloat(score) * 255); })
    
    color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

    document.body.style.backgroundColor = color;
}   

// --[UTILITY FUNCTIONS]-- //
function isEditorEmpty(text) {
    return !text || text == '<br>'
}