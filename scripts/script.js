console.log('Hello World!');
const copyButton = document.querySelector('.copy-button');
const pasteButton = document.querySelector('.paste-button');
const copyConfirmation = document.querySelector('.copied-confirmation'); 

console.log(copyConfirmation);

copyButton.addEventListener('click', () => {
    const textCopy = document.querySelector('.text-to-copy').innerText;
    navigator.clipboard.writeText(textCopy)
        .then(() => {
            console.log('Text copied to clipboard');
            copyConfirmation.innerHTML= 'Paragraaf is gekopieerd';
        })
        .catch((error) => {
            console.log('Text failed to copy');
            copyConfirmation.innerHTML = 'Paragraaf is niet gekopieerd';
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


const commands = {
    "ga naar": destination => navigateTo(destination),
    "ik wil naar": destination => navigateTo(destination)
}

function navigateTo(destination){
    console.log('je bent bij deze secties');
    const destinationLocations = {
        aardkorst: "#aardkorst",
        aardmantel: "#aardmantel",
        aardkern: "#aardkern"
    };
    const location = destinationLocations[destination];

    if(location){
        window.location.href = location;
    }else {
        console.log(`Unknown destination: ${destination}`)
    }
} 

function onSpeechRecognitionEvents() {
    recognition.addEventListener('result', event =>{
        if(typeof event.results === 'undefined') return;
        const transcript = event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();
        for(let command in commands){
            if(transcript.indexOf(command)=== 0){
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
