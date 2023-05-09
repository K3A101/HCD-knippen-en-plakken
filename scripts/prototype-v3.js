document.addEventListener('mouseup', event => {
    if (window.getSelection().toString().length) {
        let exactText = window.getSelection().toString();
        console.log(exactText);
    }
});