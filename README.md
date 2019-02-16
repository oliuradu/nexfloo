<center><img src="https://i.imgur.com/UQE0xw4.png"></center>

Nexfloo is a web app that help the people who love to freestyle 
We will use this website https://rapscript.net as reference.

<center><img src="https://i.imgur.com/CiQYnTV.png?1"></center>
Design concept: https://xd.adobe.com/view/5acc6fca-ecf2-4d8f-6aae-d70406f572d0-2cfd/?fullscreen



	If you get the error
    Access to script at '//Nexfloo/js/nexfloo.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
  
	Is because you need to run the file from a server (Open with live
    server from Visual Code or put it in xampp public folder);

  
  
  
  

### <center>USE VERY DESCRIPTIVE VARIABLE NAMES !</center>

  

### This is not good

 - var time = 10;
 - var x = "Hello";
 - var pause = false; 
 - var data = "Maria"

### This is good

- let seconds_until_next_round: 10;
- let principal_word = "Hello"
- let game_in_pause = false;
- let user_name = "Maria";

  
  

#### For all variables that hold a document element please use DOM_ before

  

#### NOT GOOD
- var timeSetting = document.getElementID("user-time-setting");

  

#### GOOD
- var DOM_time_setting = document.getElementID("user-time-setting");