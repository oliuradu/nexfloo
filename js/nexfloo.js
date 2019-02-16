// Library 
// This will return n elements from the array all the element are unique the return is also an array;
Array.prototype.random = function (n = 1) {
    let array_to_output = [];
    n > this.length ? n = this.length : n = n;
    for(let i = 0; i < n; i++){
        let random_word = this[Math.floor((Math.random()*this.length))];
        if(array_to_output.indexOf(random_word) == -1){
            array_to_output.push(random_word);
        }
        else {
            i--;
        }
    }
    return array_to_output;
}

// MODEL
let model = {

    words_already_showed : [],

    changeLenguage : (language) => {  
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            model.language = JSON.parse(xhttp.responseText);
            }
        };
        if(language == "spanish"){
            xhttp.open("GET", "./js/dictionary/spanish-dictionary.js", true);
        }
        else if(language == "french"){
            xhttp.open("GET", "./js/dictionary/french-dictionary.js", true);            
        }
        else {
            xhttp.open("GET", "./js/dictionary/english-dictionary.js", true); 
        }
        xhttp.send();
    }
}

model.changeLenguage();


// Vista 
let vista = {

}

// Controlador 
let controlador = {
    app_in_pause : false,
    seconds_until_next_round : 10,
    


}