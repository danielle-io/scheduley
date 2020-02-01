import * as CronofyElements from "cronofy-elements";



const request = require('request');
const express = require('express');
const app = express();
const port = 3000;
var Cronofy = require('cronofy');

var client = new Cronofy({
  access_token: 'LJF5OlXAk3LkI1paaG77vA3KYMnMa484',
});

var options = {
  tzid: 'Etc/UTC'
};

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (req, res) =>{
    res.send({"data": "Hello!"});
});

app.get('/getCalendars', (req, res) =>{
    getUsers(res);
});

app.get('/getEvents', (req, res) =>{
    getEvents(res);
});

/**
 * @function getUsers - simulates a backend calling a database to get list of
 * users which then gets returned to the frontend that calls through the default
 * route
 * @param {@} res 
 */


getEvents();


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




app.listen( port, () => console.log(`Backend server listening on port ${port}!`) );