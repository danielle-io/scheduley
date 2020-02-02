let calendarResponse;
let globalCalendar = [];

$(function() {

    document.getElementById("submit").onclick = function loadCal() {
        document.getElementById("calendar").classList.remove('hide');
        // document.getElementById("form").classList.add('collapse');
        
        document.getElementById("form").classList.add('garbage');
        document.getElementById("groups").classList.remove('garbage');
        var username = document.getElementById('calKey').value;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:3000/schedule?user="+username,
            "method": "GET"
          }
          
          $.ajax(settings).done(function (response) {
                let calendarId = response.calendarID;
                        // send username to db and get back cal id & set to
                prefix = 'https://www.googleapis.com/calendar/v3/calendars/'

                var url = prefix + calendarId + '/events?key=AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs'

                fetch(url).then(response => response.json()).then(response => {
                    // console.log(JSON.stringify(response));
                    globalCalendar = parseCalendarResponse(response);
                    return globalCalendar;
                }).then((globalCalendar) => {
                    var calendarEl = document.getElementById('calendar');
    
                    var calendar = new FullCalendar.Calendar(calendarEl, {
                        plugins: [ 'timeGrid' ],
                        defaultView: 'timeGridWeek',
                        events: globalCalendar,
                        minTime: "06:00:00",
                        maxTime: "22:00:00"
                    });
            
                    calendar.render();
                });
          });

        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "http://localhost:3000/schedule?user="+username,
        //     "method": "GET"
        //   }
          
        //   $.ajax(settings).done(function (response) {
        //     console.log(response);
        //   });
        
    document.getElementById("join").onclick = function loadCal() {  
        // document.getElementById("groups").classList.add('garbage');
        // var username = document.getElementById('calKey').value;
        // var settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": "http://localhost:3000/schedule?user="+username,
        //     "method": "GET"
        //   }
          
        //   $.ajax(settings).done(function (response) {
        //         let calendarId = response.calendarID;
        //                 // send username to db and get back cal id & set to
        //         prefix = 'https://www.googleapis.com/calendar/v3/calendars/'

        //         var url = prefix + calendarId + '/events?key=AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs'

        //         fetch(url).then(response => response.json()).then(response => {
        //             // console.log(JSON.stringify(response));
        //             globalCalendar = parseCalendarResponse(response);
        //             return globalCalendar;
        //         }).then((globalCalendar) => {
                    var calendarEl = document.getElementById('calendar');
                    $('#calendar').html('');
    
                    var calendar = new FullCalendar.Calendar(calendarEl, {
                        plugins: [ 'timeGrid', 'googleCalendar' ],
                        defaultView: 'timeGridWeek',
                        googleCalendarApiKey: 'AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs',
                        eventSources: [
                            {
                              googleCalendarId: 'vggugcc53gtuvurvfrhjqhnfa8@group.calendar.google.com'
                            },
                            {
                              googleCalendarId: '2r8ke5q0h5msbiu997l15t4u6g@group.calendar.google.com',
                              className: 'nice-event'
                            },
                            {
                                googleCalendarId: 't520rbs0es03s180sksph8shds@group.calendar.google.com'
                            }
                          ],
                          minTime: "06:00:00",
                            maxTime: "22:00:00"
                    });
            
                    calendar.render();
                // });
        //   });
    }


    document.getElementById("start").onclick = function loadCal() {  
        document.getElementById("groups").classList.add('garbage');
    }

    $("#groupName").change(function() {
        document.getElementById("join").classList.remove('disabled');
    });

    
    
    }

// loads the event source for the calendar
// function getCalendarResponse(){
//     var calKeyValue = document.getElementById('calKey').value;

//     prefix = 'https://www.googleapis.com/calendar/v3/calendars/'

//     var url = prefix + calKeyValue + '/events?key=AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs'

//     fetch(url).then(response => response.json()).then(response => {
//         // console.log(JSON.stringify(response));
//         globalCalendar = parseCalendarResponse(response);
        
//     });
//     return calendarResponse;
// }



// function getToken(){
//     fetch('http://localhost:3000/getToken').then(response => response.json()).then(response => {
//         console.log(JSON.stringify(response));
//     })
// }

// vggugcc53gtuvurvfrhjqhnfa8@group.calendar.google.com
// Returns a structure ready to display on a calendar
function parseCalendarResponse(calendarData) {
//     items: Array(2)
// 0:
// created: "2020-02-02T04:03:19.000Z"
// creator: {email: "mohraa14@gmail.com"}
// end: {dateTime: "2020-02-03T12:30:00-08:00"}
// etag: ""3161232399916000""
// htmlLink: "https://www.google.com/calendar/event?eid=NzIyMmM2ZTV1Z2xiaW8yNTl0aWMwbWFxdTUgdmdndWdjYzUzZ3R1dnVydmZyaGpxaG5mYThAZw"
// iCalUID: "7222c6e5uglbio259tic0maqu5@google.com"
// id: "7222c6e5uglbio259tic0maqu5"
// kind: "calendar#event"
// organizer: {email: "vggugcc53gtuvurvfrhjqhnfa8@group.calendar.google.com", displayName: "Hack Test", self: true}
// sequence: 0
// start: {dateTime: "2020-02-03T11:30:00-08:00"}
// status: "confirmed"
// summary: "test event"
// updated: "2020-02-02T04:03:19.958Z
    let calendarDataItems = calendarData['items'];
    let displayStructure = [];
    for (let i = 0; i < calendarDataItems.length; i++) {
        let startDate = new Date(calendarDataItems[i]['start']['dateTime']);
        let endDate = new Date(calendarDataItems[i]['end']['dateTime']);
        let title = calendarDataItems[i]['summary'];
        let url = calendarDataItems[i]['htmlLink'];

        displayStructure.push(
            {
                'start' : startDate.getTime(),
                'end' : endDate.getTime(),
                'title' : title,
                'url' : url
            }
        );
        
    }

    return displayStructure;


}


});

