editorText = document.getElementById("editor-text");
editorPlaceholder = document.querySelector('.editor-placeholder');

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