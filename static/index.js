const ws = new WebSocket("ws://3.235.159.142:8000/test")

// --[DOM ACCESSORS]-- //
const editorText = document.getElementById("editor-text");
const editorPlaceholder = document.querySelector('.editor-placeholder');
const clickMe = document.querySelector('.click-me');
const scoreDisplayers = Array.from(document.getElementsByClassName('score'))

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

    // reset if editor is empty
    if (isEditorEmpty(text)) {
        document.body.style.backgroundColor = 'ghostwhite';
        scoreDisplayers.forEach(display => display.innerHTML = null);
        return;
    }

    const pre_scores = [NEGATIVE, NEUTRAL, POSITIVE];
    const rgb = []

    // display scores
    scoreDisplayers.forEach((display, ind) => {
        const score = (round(+(pre_scores[ind]) * 100).toFixed(2));
        display.innerHTML = `${score}%`;
    })

    // set rgb values
    const lightenBy = 100;
    pre_scores.forEach(score => { rgb.push(lightenBy + parseFloat(score) * (255 - lightenBy)); });
    
    let color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    document.body.style.backgroundColor = color;
}   

// --[UTILITY FUNCTIONS]-- //
function isEditorEmpty(text) {
    return !text || text == '<br>'
}

function round(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}