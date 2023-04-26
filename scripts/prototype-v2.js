console.log('hallo');
// const sections = document.querySelector('section');
const selectButton = document.querySelector('.select-button');
const textToCopy = document.querySelectorAll('.text-to-copy');
const paragraphTwo = document.querySelector('.text-to-copy-2');
const feedbackMessage = document.querySelectorAll('.select-confirmed-message');
const copyButtons = document.querySelectorAll('.copy-button');
const pasteButtons = document.querySelectorAll('.paste-button');
const textAreas = document.querySelectorAll('textarea');
// const sections = document.querySelectorAll('.sections');
const nextButton = document.querySelector('.volgende');
const previousButton = document.querySelector('.vorige');
const slides = document.querySelectorAll(".sections");
copyButtons[0].classList.add('hidden');
pasteButtons[0].classList.add('hidden');

slides[1].classList.add('hidden');
slides[2].classList.add('hidden');

let slideIndex = 1;
nextButton.addEventListener('click', () => {
    showSlides(slideIndex += 1);
    console.log('next');
})

previousButton.addEventListener('click', () => {   
    showSlides(slideIndex -= 1);
    console.log('previous');
})

function showSlides(n) {
    let i;
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length} 
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden');
    }
    console.log(slideIndex);
    slides[slideIndex-1].classList.remove('hidden');
}


//selecteer tekst met een button
selectButton.addEventListener("click", () => {
    selectText("text-to-select");
    copyTextFunction();
    copyButtons[0].classList.remove('hidden');
    feedbackMessage[0].innerHTML = 'Tekst is geselecteerd';

});

//
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

//When a key is pressed show the key name and key code
const copyKey = document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    console.log(`Key pressed ${name} | Code value: ${code}`)
    if (name === 'c'|| name === 'C') {
        // Do nothing.
       navigator.clipboard.writeText(paragraphTwo.innerText);
         copiedText = paragraphTwo.innerText
         console.log('Tekst gekopieerd');
         console.log(copiedText);
            feedbackMessage[1].innerHTML = 'Tekst is gekopieerd';
    } else if(name === 'v'|| name === 'V') {
        textAreas[1].value = copiedText;
        copiedText = ""
        console.log('Tekst is geplakt')
        feedbackMessage[1].innerHTML = 'Tekst is geplakt';
    }
});
 let copiedText

function copyTextFunction() {
   
    for (let i = 0; i < copyButtons.length; i++) {
        copyButtons[i].addEventListener("click", () => {
            navigator.clipboard.writeText(textToCopy[i].innerText);
            copiedText = textToCopy[i].innerText
            console.log('Tekst gekopieerd');
            console.log(copiedText);
            feedbackMessage[0].innerHTML = 'Tekst is gekopieerd';
            pasteButtons[0].classList.remove('hidden');

        })

        pasteButtons[i].addEventListener('click', () => {
            textAreas[i].value = copiedText;
            copiedText = ""
            console.log('Tekst is geplakt')
            feedbackMessage[0].innerHTML = 'Tekst is geplakt';

        })



    }
}

