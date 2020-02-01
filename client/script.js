function getCalendar(){
    console.log('ehllosef');
    fetch('http://localhost:3000/getCalendars').then(response => response.json()).then(response => {
        alert(JSON.stringify(response));
    })
}