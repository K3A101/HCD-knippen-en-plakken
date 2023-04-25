console.log('hallo');
const section = document.querySelector('section');
const selectButton = document.querySelector('.select-button');
const textToCopy = document.querySelector('.text-to-copy');
const feedbackMessage = document.querySelector('.select-confirmed-message');

// Example usage: add a button to the page that activates the text selection

//selecteer tekst met een button
selectButton.addEventListener("click", () => {
    selectText("text-to-select");
    feedbackMessage.innerHTML = 'Tekst is geselecteerd';

});


function selectText(nodeId){
    const node = document.getElementById(nodeId);
    console.log(node)
if(document.body.createTextRange){
    var range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
}else if(window.getSelection){
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
} else {
    console.warn("Could not select text in node: Unsupported browser.");
}
}
//get selected text with selionchange event
// const selectedText = document.addEventListener("selectionchange", () => {
//     const selection = document.getSelection().toString();
//     console.log(selection);
// });

let copiedText;

//When a key is pressed show the key name and key code
const copyKey = document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    console.log(`Key pressed ${name} | Code value: ${code}`)
    if (name === 'c'|| name === 'C') {
        // Do nothing.
       navigator.clipboard.writeText(textToCopy.innerText);
         copiedText = textToCopy.innerText
         console.log('Tekst gekopieerd');
         console.log(copiedText);
    }
});

