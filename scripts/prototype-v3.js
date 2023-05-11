
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
const body = document.querySelector('body');
copyButtons[0].classList.add('hidden');
pasteButtons[0].classList.add('hidden');



document.addEventListener('mouseup', event => {
    const selectMessage = document.createElement('p');
    if (window.getSelection().toString().length) {
        body.classList.add('green');
        // selectMessage.textContent = 'Je hebt tekst geselecteerd';
        body.appendChild(selectMessage);
        let exactText = window.getSelection().toString();
        console.log(exactText);

    }
    else {
        console.log('nothing selected');
        // selectMessage.textContent = '';
        body.classList.remove('green');
    }

});


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
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add('hidden');
    }
    console.log(slideIndex);
    slides[slideIndex - 1].classList.remove('hidden');
}

// Dit is de selecteer button van de eerste paragraaf
//selecteer tekst met een button
selectButton.addEventListener("click", () => {
    selectText("text-to-select");
    copyTextFunction();
    copyButtons[0].classList.remove('hidden');
    feedbackMessage[0].innerHTML = 'Tekst is geselecteerd';
    feedbackMessage[0].classList.add('select-active');

});

//
function selectText(nodeId) {
    const node = document.getElementById(nodeId);
    console.log(node)
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

// Dit is de tweede paragraaf

//When a key is pressed show the key name and key code
const copyKey = document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    console.log(`Key pressed ${name} | Code value: ${code}`)
    if (name === 'c' || name === 'C') {
        // Do nothing.
        navigator.clipboard.writeText(paragraphTwo.innerText);
        copiedText = paragraphTwo.innerText
        console.log('Tekst gekopieerd');
        console.log(copiedText);
        feedbackMessage[1].innerHTML = 'Tekst is gekopieerd';

    } else if (name === 'v' || name === 'V') {
        textAreas[1].value = copiedText;
        copiedText = ""
        console.log('Tekst is geplakt')
        feedbackMessage[1].innerHTML = 'Tekst is geplakt';
        body.classList.add('green');
    }else {
        console.log('niks geplakt');
        // selectMessage.textContent = '';
        body.classList.remove('green');
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
            feedbackMessage[0].classList.add('copy-active');
            pasteButtons[0].classList.remove('hidden');

        })

        pasteButtons[i].addEventListener('click', () => {
            textAreas[i].value = copiedText;
            copiedText = ""
            console.log('Tekst is geplakt')
            feedbackMessage[0].innerHTML = 'Tekst is geplakt';
            feedbackMessage[0].classList.add('past-active');
        })



    }
}

