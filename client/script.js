function getCalendar(){
    fetch('http://localhost:3000/getCalendars').then(response => response.json()).then(response => {
        console.log(JSON.stringify(response));
    })
}

function getEvents(){
    fetch('http://localhost:3000/getEvents').then(response => response.json()).then(response => {
        console.log(JSON.stringify(response));
    })
}


