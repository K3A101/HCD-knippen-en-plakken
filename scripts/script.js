
const copyButtons = document.querySelectorAll('.copy-button');
const copyConfirmations = document.querySelectorAll('.copied-confirmation');
const textToCopy = document.querySelectorAll('.text-to-copy');
const pasteButtons = document.querySelectorAll('.paste-button');
const textAreas = document.querySelectorAll('textarea');




//Voeg voeg de class hidden toe aan de paste buttons
for (let i = 0; i < pasteButtons.length; i++) {
    pasteButtons[i].classList.add('hidden');
    
}

let copiedText

for (let i = 0; i < copyButtons.length; i++) {
    copyButtons[i].addEventListener("click", () => {
        navigator.clipboard.writeText(textToCopy[i].innerText);
        copiedText = textToCopy[i].innerText
        console.log('Tekst gekopieerd');
        copyConfirmations[i].innerHTML = 'Paragraaf is gekopieerd';
        pasteButtons[i].classList.remove('hidden');
        
    })


    pasteButtons[i].addEventListener('click', () => {
        textAreas[i].value = copiedText;
        copiedText = ""
        console.log('Tekst is geplakt')
        pasteButtons[i].classList.add('hidden');

    })


}
// ----------------------------
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL';
    recognition.continuous = true;
    recognition.interimResults = false;


    const commands = {
        "ga naar": destination => navigateTo(destination),
        "ik wil naar": destination => navigateTo(destination)
    }

    function navigateTo(destination) {
        console.log('je bent bij deze secties');
        const destinationLocations = {
            aardkorst: "#aardkorst",
            aardmantel: "#aardmantel",
            aardkern: "#aardkern"
        };
        const location = destinationLocations[destination];

        if (location) {
            window.location.href = location;
        } else {
            console.log(`Unknown destination: ${destination}`)
        }
    }

    function onSpeechRecognitionEvents() {
        recognition.addEventListener('result', event => {
            if (typeof event.results === 'undefined') return;
            const transcript = event.results[event.results.length - 1][0].transcript
                .toLowerCase()
                .trim();
            for (let command in commands) {
                if (transcript.indexOf(command) === 0) {
                    if (transcript[command.length] === undefined) {
                        commands[command]();
                    } else {
                        const param = transcript
                            .substring(command.length, transcript.length)
                            .trim();
                        commands[command](param);
                    }
                }
            }
        });
    }

    if (SpeechRecognition) {
        onSpeechRecognitionEvents();
        recognition.start();
    }
}

// ----------------------------
