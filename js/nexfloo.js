// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar = new ProgressBar.SemiCircle(timecontainer, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#F9E55B',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });
  
  bar.animate(1.0);  // Number from 0.0 to 1.0

// Library 
// This will return n elements from the array all the element are unique the return is also an array;
Object.prototype.randomKey = function (){
    var keys = Object.keys(this)
    return this[keys[ keys.length * Math.random() << 0]];
}
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
            updateVista();
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

model.changeLenguage("Spanish");


// Vista 
let vista = {
    //Doms in Header
    DOM_settings_button : document.getElementById("settings"),

    //Doms in Left div
    DOM_playstop_button : document.getElementById("playstop"),
    DOM_playstop_image : document.getElementById("playstopimage"),

    //Doms in Right div
    DOM_settings_div : document.getElementById("settingsDiv"),

    //Methods
    toggle_DOM_settings_div : function () {
        vista.DOM_settings_div.classList.contains("hide") ? vista.DOM_settings_div.classList.remove("hide") : vista.DOM_settings_div.classList.add("hide");
    },
    toggle_playstop_button : function () {

        if(vista.DOM_playstop_image.src.indexOf("play") > -1){
            controlador.app_in_pause = false;
            vista.DOM_playstop_image.src = "./images/stopbutton.png";
        }
        else{
            controlador.app_in_pause = true;
            vista.DOM_playstop_image.src = "./images/playbutton.svg";  
        }
    }

}

function updateVista() {
    vista.DOM_settings_button.textContent = model.language.dom.settings;
}
// Event listener 
vista.DOM_settings_button.addEventListener("click", vista.toggle_DOM_settings_div);
vista.DOM_playstop_button.addEventListener("click", vista.toggle_playstop_button);

// Controlador 
let controlador = {
    app_in_pause : true,
    user_timeInterval_setting : 10,
    user_numberOfHelpingWord_setting : 5,

    generate_random_words_list : function () {
        return model.language.words.randomKey().random(controlador.user_numberOfHelpingWord_setting + 1);
    }
}

var second_Counter_1 = 0;
var second_Counter_2 = 0;
var progress_bar_timmer = controlador.user_timeInterval_setting;
var clock = setInterval(() => {
    if(!controlador.app_in_pause){
        second_Counter_1++;
        second_Counter_2++;
    }

    //After one second
    if(second_Counter_1 / 10 == 1){
        second_Counter_1 = 0;
        progress_bar_timmer--;
        bar.animate(progress_bar_timmer / controlador.user_timeInterval_setting);

    }
    //After user setted seconds
    if(second_Counter_2 / 10 == controlador.user_timeInterval_setting){
        second_Counter_2 = 0;
    }
    //After 10 seconds
}, 100);



