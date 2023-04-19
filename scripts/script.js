console.log('Hello World!');
const copyButton = document.querySelector('.copy-button');
const pasteButton = document.querySelector('.paste-button');


copyButton.addEventListener('click', () => {
    const textCopy = document.querySelector('.text-to-copy').innerText;
    navigator.clipboard.writeText(textCopy)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch((error) => {
            console.log('Text failed to copy');
        })
})

pasteButton.addEventListener('click', () => {
    navigator.clipboard.readText()
        .then((textCopy) => {
            if (textCopy) {
                document.getElementById('paste-input').value = textCopy;
            } else {
                console.warn("Clipboard is empty or does not contain text.");
            }

        })
        .catch((error) => {
            console.log('Text failed to paste');
        })
})

// ----------------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(SpeechRecognition){
    const recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL';
    recognition.continuous = true;
    recognition.interimResults = false;
}