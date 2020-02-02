window.onload = function() {
    document.getElementById("submit").onclick = function loadCal() {
        document.getElementById("cal").classList.remove('collapse');
        // document.getElementById("form").classList.add('collapse');
        
        document.getElementById("form").classList.add('garbage');
        document.getElementById("groups").classList.remove('garbage');
        console.log(document.getElementById('calKey').value)
    }
    $("#groupName").change(function() {
        console.log('true')
        document.getElementById("join").classList.remove('disabled');
    });
}
// function getToken(){
//     fetch('http://localhost:3000/getToken').then(response => response.json()).then(response => {
//         console.log(JSON.stringify(response));
//     })
// }

