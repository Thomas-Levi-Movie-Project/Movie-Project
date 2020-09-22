
// setTimeout(hideLoading, 1500);

function hideLoading() {
    $("#loading-message").css("display", "none");
}

$(document).ready(function () {

fetch("https://changeable-sharp-talk.glitch.me/movies")
    .then(response => response.json())
    // .catch(error => console.error(error))
    .then(listOfMovies =>{
        hideLoading();
        let moviesHTML = "";
        // movies += listOfMovies;
        // console.log(listOfMovies);
        listOfMovies.forEach(function(element) {
            console.log(element)
            moviesHTML += `<p>Title: ${element.title}</p>`
            moviesHTML += `<p>Rating: ${element.rating}</p>`
        })
        $("#movies-html").append(moviesHTML);
    });
});



