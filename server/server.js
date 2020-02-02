import * as CronofyElements from "cronofy-elements";

const request = require('request');
const express = require('express');
const app = express();
const port = 3000;
var Cronofy = require('cronofy');

var client = new Cronofy({
  access_token: 'Q712k-tPoP9hFSZo49VSTLste1k8eC2p',
});

var options = {
  tzid: 'Etc/UTC'
};

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// app.get('/', (req, res) =>{
//     res.send({"data": "Hello!"});
// });

app.get('/getCalendars', (req, res) =>{
    getUsers(res);
});

app.get('/getEvents', (req, res) =>{
    getEvents(res);
});


// app.get('/getUserInfo', (req, res) =>{
//     getUserInfo(res);
// });

// app.get('/getToken', (req, res) =>{
//     getToken(res);
// });

/**
 * @function getUsers - simulates a backend calling a database to get list of
 * users which then gets returned to the frontend that calls through the default
 * route
 * @param {@} res 
 */
function getUsers(res){    
    client.listCalendars(options)
    .then(function (response) {
        var calendars = response.calendars;
        res.send(calendars)
    });
}

function getEvents(res){
    client.readEvents(options)
  .then(function (response) {
      var events = response.events;
      res.send(events)
  });
}

// function getUserInfo(){
//     $.ajax({
//         type: 'GET',
//         ContentType: 'application/json',
//         Authorization: 'Bearer gOdFGD1beUllEtYtFagvM5WRn9atafnc',
//         url: "https://api.cronofy.com/v1/userinfo",
//         // data: {"version": "1", "permissions": ["agenda"], 'subs': ["acc_1234"], 'origin': "http://localhost"
//     },
//         success: function(resultData) { console.log("Save Complete") }
//   });
// }

// function getToken(){
    // client.listCalendars(options)
    // .then(function (response) {
    //     var token = response.token;
    //     res.send(token)
    // });

    // var jqxhr = $.post( "/v1/element_tokens", function() {
    //     alert( "success" );
    //   })
    //     .done(function() {
    //       alert( "second success" );
    //     })
    //     .fail(function() {
    //       alert( "error" );
    //     })
    //     .always(function() {
    //       alert( "finished" );
    //     });
        
//    $.ajax({
//         type: 'POST',
//         ContentType: 'application/json',
//         Authorization: 'Bearer LJF5OlXAk3LkI1paaG77vA3KYMnMa484',
//         url: "https://api.cronofy.com/v1/element_tokens",
//         data: {"version": "1", "permissions": ["agenda"], 'subs': ["acc_1234"], 'origin': "http://localhost"
//     },
//         success: function(resultData) { console.log("Save Complete") }
//   });
// }


getEvents();


app.listen( port, () => console.log(`Backend server listening on port ${port}!`) );