
setTimeout(hideLoading, 1500);

function hideLoading() {
    $("#loading-message").css("display", "none");
}

$(document).ready(function () {

fetch("https://changeable-sharp-talk.glitch.me/movies")
    .then(response => response.json())
    // .catch(error => console.error(error))
    .then(listOfMovies =>{
        let movies = "";
        movies += listOfMovies;
    });
});



