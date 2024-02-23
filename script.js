const submit = document.querySelector("#submit");
const inputVal = document.querySelector("#inputWord");
const searchResult = document.querySelector(".searchResult");
const audio = document.querySelector(".audio i");


function getMeaning() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal.value}`)
        .then(res => {
            return res.json();
        })
        .then(defi => {
            console.log(defi);
            const partofspeech = defi[0].meanings[0].partOfSpeech;
            word = defi[0].word;
            const meaning = defi[0].meanings[0].definitions[0].definition;
            const Example = defi[0].meanings[0].definitions[0].example;
            searchResult.innerHTML =
                `<p class="partofSpeech"><b>PartOfSpeech:</b><br>${partofspeech}</p>
                <p><b>Word:</b><br>${word}</p>
                <p><b>Definition:</b><br>${meaning}</p>
                <p><b>Example:</b><br>${Example}</p>`;
            return defi[0].phonetics[1].audio;
        })
        .then((audio => {
            const audiourl = new Audio(audio);
            audioResult(audiourl);
        }))
        .catch(err => {
            console.log(err);
        })

}

submit.addEventListener('click', () => {
    getMeaning();
    inputVal.value = "";
});


function audioResult(gotParam){
    audio.addEventListener('click', () => {
        gotParam.play();
        gotParam = "";
    })
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        getMeaning();
        inputVal.value = "";
    }
})