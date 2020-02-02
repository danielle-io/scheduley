let calendarResponse;
let globalCalendar = [];

$(function() {
    document.getElementById("submit").onclick = function loadCal() {
        document.getElementById("cal").classList.remove('collapse');
        // document.getElementById("form").classList.add('collapse');
        
        document.getElementById("form").classList.add('garbage');
        document.getElementById("groups").classList.remove('garbage');


        var username = document.getElementById('calKey').value;

        // send username to db and get back cal id & set it to apiUrl

        var apiUrl = '';

        var prefix = 'https://www.googleapis.com/calendar/v3/calendars/';

        
        var url = prefix + apiUrl + '/events?key=AIzaSyAzSkGZ7YtaaepNA-r_g7glspLmct-avfs';

        fetch(url).then(response => response.json()).then(response => {
            // console.log(JSON.stringify(response));
            globalCalendar = parseCalendarResponse(response);
            return globalCalendar;
        }).then((globalCalendar) => {
            let calendar = $("#calendar").calendar(
                {
                    tmpl_path: "../bower_components/bootstrap-calendar/tmpls/",
                    events_source: globalCalendar
                }
            );
        });
    }
    $("#groupName").change(function() {
        console.log('true')
        document.getElementById("join").classList.remove('disabled');
    });

    
    


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

