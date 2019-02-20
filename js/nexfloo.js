//FLickr api (not mine )
function GetFlickApi(image_keyword) {
    var flickrAPI = "";
    flickrAPI += "https://api.flickr.com/services/rest/?";
    flickrAPI += "&method=flickr.photos.search";
    flickrAPI += "&api_key=9012151640d5486e63780579ff3b9cae";
    flickrAPI += "&tags=" + image_keyword;
    flickrAPI += "&per_page=3";
    flickrAPI += "&page=1";
    flickrAPI += "&format=json";
    flickrAPI += "&nojsoncallback=1";
    return flickrAPI;
}

// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/
var bar = new ProgressBar.SemiCircle(timecontainer, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 300,
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
        array_to_output.indexOf(random_word) == -1 ? array_to_output.push(random_word) : i--;
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
            init();
            }
        };
        if(language == "spanish"){
            xhttp.open("GET", "./js/dictionary/spanish-dictionary.js", true);
        }
        else if(language == "french"){
            xhttp.open("GET", "./js/dictionary/french-dictionary.js", true);            
        }
        else if(language == "romanian"){
            xhttp.open("GET", "./js/dictionary/romanian-dictionary.js", true);            
        }
        else {
            xhttp.open("GET", "./js/dictionary/english-dictionary.js", true); 
        }
        xhttp.send();
    }
}

model.changeLenguage("spanish");


// Vista 
let vista = {
    //Doms in Header
    DOM_header : document.getElementById("header"),
    DOM_settings_button : document.getElementById("settings"),

    DOM_language_english_button : document.getElementById("english"),
    DOM_language_french_button : document.getElementById("french"),
    DOM_language_spanish_button : document.getElementById("spanish"),
    DOM_language_romanian_button : document.getElementById("romanian"),
    //Doms in Left div
    DOM_playstop_button : document.getElementById("playstop"),
    DOM_playstop_image : document.getElementById("playstopimage"),
    DOM_principal_word : document.getElementById("principal-word"),
    DOM_helping_words_div : document.getElementById("helping-words"),
    DOM_spell_letters_div : document.querySelector(".spell"),

    //Doms in Right div
    DOM_right_div : document.querySelector(".rigthContent"),
    DOM_settings_div : document.getElementById("settingsDiv"),
    DOM_settings_helping_words_title : document.getElementById("numberOfWord"),
    DOM_settings_slider_helping_words : document.getElementById("helping-words-slider"),
    DOM_settings_slider_time_interval : document.getElementById("time-inverval-slider"),
    // Footer 

    //Methods
    toggle_DOM_settings_div : function () {
        vista.DOM_settings_div.classList.contains("hide") ? vista.DOM_settings_div.classList.remove("hide") : vista.DOM_settings_div.classList.add("hide");
    },
    toggle_playstop_button : function (status_wanted = "") {
        if(status_wanted == "reset"){
            controlador.app_in_pause = true;
            vista.DOM_playstop_image.src = "./images/playbutton.svg";  
        }
        else if(status_wanted == "pause"){
            if(vista.DOM_playstop_image.src.indexOf("play") > -1){
                controlador.set_image_random();
                vista.DOM_principal_word.innerHTML = controlador.words_to_show_list[0];
                vista.DOM_helping_words_div.innerHTML = vista.show_helping_words()
                controlador.app_in_pause = false;
                vista.DOM_playstop_image.src = "./images/stopbutton.png";
            }
            else{
                controlador.app_in_pause = true;
                vista.DOM_playstop_image.src = "./images/playbutton.svg";
                updateVista("pause");
            }   
        }
    },
    show_helping_words : function () {
        let helpingwordsoutput = "";
        let backgroundcolor = "";
        controlador.words_to_show_list.forEach((e,i) => {
            switch(true) {
                case e.length > 12:
                    backgroundcolor = "#ec3232";
                    break;
                case e.length > 8:
                    backgroundcolor = "#afb947";
                    break;
                case e.length > 4:
                    backgroundcolor = "#548a43";
                    break;
                default:
                    backgroundcolor = "#2e4bdb";
              }
            if(i != 0){
                let padding = e.length > 9 ? "2px" : "2px 7px";
                helpingwordsoutput += `<span class="helping-word">${e}<span style="background :${backgroundcolor}; padding:${padding}" class="helplenght">${e.length}</span></span>`;
            }
        })
        return helpingwordsoutput;
    },
    refresh : function(){
        controlador.words_to_show_list = controlador.generate_random_words_list();
        vista.DOM_principal_word.innerHTML = controlador.words_to_show_list[0];
        vista.DOM_helping_words_div.innerHTML = vista.show_helping_words();
        controlador.set_image_random();
        //model.words_already_showed.push(controlador.words_to_show_list[0]);
    }

}

function updateVista(status) {
    vista.DOM_settings_button.textContent = model.language.dom.settings;
    vista.DOM_principal_word.innerHTML = model.language.dom.welcome;
    vista.DOM_helping_words_div.innerHTML = model.language.dom.welcome_message;
    vista.DOM_settings_helping_words_title.textContent = model.language.dom.number_of_helping_words;
    if(status == "pause"){
        vista.DOM_principal_word.innerHTML = model.language.dom.pause;
        // De adaugat scris cand sunt in pauza
    }
}

// Event listener 
vista.DOM_settings_button.addEventListener("click", vista.toggle_DOM_settings_div);
vista.DOM_playstop_button.addEventListener("click", ()=>{vista.toggle_playstop_button("pause")});
vista.DOM_language_english_button.addEventListener("click", ()=> { model.changeLenguage("english")});
vista.DOM_language_french_button.addEventListener("click", ()=> { model.changeLenguage("french")});
vista.DOM_language_spanish_button.addEventListener("click", ()=> { model.changeLenguage("spanish")});
vista.DOM_language_romanian_button.addEventListener("click", ()=> { model.changeLenguage("romanian")});
vista.DOM_settings_slider_helping_words.addEventListener("change", ()=> { 
    controlador.user_numberOfHelpingWord_setting = Number(vista.DOM_settings_slider_helping_words.value);
    init();
})
vista.DOM_settings_slider_time_interval.addEventListener("change", ()=> { 
    if(vista.DOM_settings_slider_time_interval.value == 0){
        controlador.user_timeInterval_setting = 9999999999;
    }
    else{
        controlador.user_timeInterval_setting = Number(vista.DOM_settings_slider_time_interval.value);
    }
    init();
})

document.onkeydown = function checkKey(e) {

    e = e || window.event;
    if (e.keyCode == '32' ) {
        //space
        vista.toggle_playstop_button("pause");
    }
    else if (e.keyCode == '82'  && controlador.app_in_pause == false) {
        if(controlador.app_in_pause == true){
            vista.toggle_playstop_button("pause");
        }
        vista.refresh();
    }
    else if (e.keyCode == '70' && controlador.app_in_pause == false) {
        vista.DOM_spell_letters_div.innerHTML = "";
        vista.toggle_playstop_button("reset");
        // For each letter
        controlador.words_to_show_list[0].toLowerCase().split("").forEach( (e,i) => {
            if(model.language.letters[e] == undefined){
                vista.DOM_spell_letters_div.innerHTML += `<span class="spellLetter" id="spellLetter-${i}">${e}</span>`;
            }
            else{
                vista.DOM_spell_letters_div.innerHTML += `<span class="spellLetter" id="spellLetter-${i}">${model.language.letters[e]}</span>`;
            }
                setTimeout( () => {
                     document.getElementById(`spellLetter-${i}`).style.color = "#fff";
                     document.getElementById(`spellLetter-${i}`).style.background = "#2E4BDB";
                 // At the last word add 500 ms until i disable pause and hide the div
                     setTimeout( () => {
                         document.getElementById(`spellLetter-${i}`).style.background = "#eaeaea";
                         document.getElementById(`spellLetter-${i}`).style.color = "#1E1E24";
                         if(i ==  controlador.words_to_show_list[0].length - 1){
                             vista.DOM_spell_letters_div.innerHTML = "";
                             vista.toggle_playstop_button("pause");
                         }
                     } , 500)
                }, i * 500);
        })
    }
    else if (e.keyCode == '73') {
       // letter i
    }

}
// Controlador 
let controlador = {
    words_to_show_list : [],
    app_in_pause : true,
    // MODIFICA AICI 2-urile
    user_timeInterval_setting : 10,
    user_numberOfHelpingWord_setting : 5,
    generate_random_words_list : function () {
        return model.language.words.randomKey().random(controlador.user_numberOfHelpingWord_setting + 1);
    },

    set_image_random : function (keyword = controlador.words_to_show_list[0]) {
            var xhr= new XMLHttpRequest();
            xhr.open("GET",GetFlickApi(keyword),true);   // 
            xhr.send();
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4 && xhr.status==200) {
                    var myArray = JSON.parse(xhr.responseText);
                    vista.DOM_right_div.style.background = "";
                    if(myArray.photos.photo.length != 0){
                        var n = Math.floor(Math.random() * myArray.photos.photo.length );
                        var farm_id = myArray.photos.photo[n].farm
                        var server_id = myArray.photos.photo[n].server
                        var id = myArray.photos.photo[n].id
                        var secret = myArray.photos.photo[n].secret
                        vista.DOM_right_div.style.backgroundImage = `url("https://farm${farm_id}.staticflickr.com/${server_id}/${id}_${secret}.jpg")`;    
                    }
                    else {
                        vista.DOM_right_div.style.background = `#1E1E24 url(./images/imagenotfound.png) 92% 10vh  / 30% no-repeat fixed`;

                    }
} 
            };
    }

}

// INIT OR RESET
function init(){
    // Reset time interval
    second_Counter_1 = 0;
    second_Counter_2 = 0;
    progress_bar_timmer = controlador.user_timeInterval_setting;
    bar.animate(1);
    //Generate the first word list
    controlador.words_to_show_list = controlador.generate_random_words_list();
    vista.toggle_playstop_button("reset");
    controlador.set_image_random(`art`);
    updateVista();
}

////////////////////////// CLOCK  /////////////////////////
var second_Counter_1 = 0;
var second_Counter_2 = 0;
var progress_bar_timmer = controlador.user_timeInterval_setting;

var clock = setInterval(() => {
    // ON PAUSE
    if(!controlador.app_in_pause){
        second_Counter_1++;
        second_Counter_2++;
    }

    //After user setted seconds
    if(second_Counter_2 / 10 == controlador.user_timeInterval_setting + 1){
        bar.animate(1);
        second_Counter_2 = 0;
        second_Counter_1 = 0;
        vista.refresh();
    }

    //After one second
    else if(second_Counter_1 / 10 == 1){
        second_Counter_1 = 0;
        progress_bar_timmer--;
        bar.animate(progress_bar_timmer / controlador.user_timeInterval_setting);
    }
    // Reset the bar progress
    progress_bar_timmer == 0 ? progress_bar_timmer = controlador.user_timeInterval_setting : "";

}, 100);



