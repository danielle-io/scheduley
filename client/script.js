let calendarResponse;
let globalCalendar = [];

$(function() {
    document.getElementById("submit").onclick = function loadCal() {
        document.getElementById("calendar").classList.remove('hide');        
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
                let displayId = response.displayID;
                prefix = 'https://www.googleapis.com/calendar/v3/calendars/'

                var url = prefix + calendarId + '/events?key=AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs'

                fetch(url).then(response => response.json()).then(response => {
                    globalCalendar = parseCalendarResponse(response,displayId);
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
    document.getElementById("join").onclick = function loadCal() {  
                    var calendarEl = document.getElementById('calendar');
                    $('#calendar').html('');
    
                    var calendar = new FullCalendar.Calendar(calendarEl, {
                        plugins: [ 'timeGrid', 'googleCalendar' ],
                        defaultView: 'timeGridWeek',
                        googleCalendarApiKey: 'AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs',
                        eventSources: [
                            {
                              googleCalendarId: 'vggugcc53gtuvurvfrhjqhnfa8@group.calendar.google.com',
                              className: 'class-one'

                            },
                            {
                              googleCalendarId: '2r8ke5q0h5msbiu997l15t4u6g@group.calendar.google.com',
                              className: 'nice-event'
                            },
                            {
                                googleCalendarId: 't520rbs0es03s180sksph8shds@group.calendar.google.com',
                                className: 'class-two'
                            }
                          ],
                          minTime: "06:00:00",
                            maxTime: "22:00:00"
                    });
            
                    calendar.render();
    }


    document.getElementById("start").onclick = function loadCal() {  
        var calendarEl = document.getElementById('calendar');
                $('#calendar').html('');

                var calendar = new FullCalendar.Calendar(calendarEl, {
                    plugins: [ 'timeGrid', 'googleCalendar' ],
                    defaultView: 'timeGridWeek',
                    googleCalendarApiKey: 'AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs',
                    eventSources: [
                        {
                            googleCalendarId: '2r8ke5q0h5msbiu997l15t4u6g@group.calendar.google.com',
                            className: 'nice-event'
                        }
                        ],
                        minTime: "06:00:00",
                        maxTime: "22:00:00"
                });
        
                calendar.render();
    }

    $("#groupName").change(function() {
        document.getElementById("join").classList.remove('disabled');
    });    
    }

    function parseCalendarResponse(calendarData, displayId) {
        let calendarDataItems = calendarData['items'];
        let displayStructure = [];
        for (let i = 0; i < calendarDataItems.length; i++) {
            let startDate = new Date(calendarDataItems[i]['start']['dateTime']);
            let endDate = new Date(calendarDataItems[i]['end']['dateTime']);
            let title = calendarDataItems[i]['summary'];

            let url = calendarDataItems[i]['htmlLink'];
            console.log(displayId);
            displayStructure.push(
                {
                    'start' : startDate.getTime(),
                    'end' : endDate.getTime(),
                    'title' : displayId,
                    'url' : url
                }
            );
            
        }
    return displayStructure;
    }
});

