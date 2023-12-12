const selectTags = document.querySelectorAll('select');

selectTags.forEach((tag, id) => {
    for (let country_code in languages) {
        let selected = id === 0 ? (country_code === "en" ? "selected" : "") : (country_code === "es" ? "selected" : "");

        let option = `<option ${selected} value="${country_code}">${languages[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

document.getElementById('translateBtn').addEventListener('click',function(){
    const text = document.getElementById('inputText').value;
    const translateFrom = document.getElementById('translateFrom').value;
    const translateTo= document.getElementById('translateTo').value;
    translateText(text, translateFrom, translateTo);
})

function translateText(inputText, fromLanguage, toLanguage){
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(apiUrl).then(response => response.json()).then(data => {
        if (data.responseData) {
            const translatedText = data.responseData.translatedText;
            const formattedText = removeQuestionMarks(translatedText);
            document.getElementById('outputText').innerText = formattedText;
        } else {
            document.getElementById('outputText').innerText = "Error : Could Not Translate!";
        }
    }).catch(error => {
        console.error('Error:', error);
        document.getElementById('outputText').innerText = "Error : An error occurred while translating!";
    });
}

function removeQuestionMarks(text) {
    return text.replace(/^¿+|¿+$/g, '');
}