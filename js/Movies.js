const url = "https://changeable-sharp-talk.glitch.me/movies"

function displayLoading() {
    $("#loading-message").modal("show");
}

function toggleMovieHTML() {
    $("#movies-cards-container").toggleClass("d-none");
}
// todo: Function to build a movie card using a movie object
function buildMovieCard(movieObject) {
    let movieHTML = "";
        movieHTML += `<div class="card" data-id="${movieObject.id}"><div class="card-body">`
        movieHTML += `<button type="button" data-id="${movieObject.id}" id="${movieObject.id}-button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
        movieHTML += `<h5 class="card-title">Title: ${movieObject.title}</h5>`
        movieHTML += `<p class="card-text">Rating: ${movieObject.rating}</p>`
        movieHTML += `<p class="card-text">ID: ${movieObject.id}</p>`
        movieHTML += `</div></div>`
    return movieHTML;
}

function appendMovieHTML(movieHTML){
    $("#movies-cards-container").append(movieHTML);
}

function setupListeners(){
    $(".close").click(function() {
        deleteMovies($(this).attr("data-id"))
        console.log("Movie ID: ", $(this).attr("data-id"));
        console.log("Movie Deleted");
    })
}

function createMovies() {
        let movieObject = {
            title: $("#modalMovieTitle").val(),
            rating: $("input[name='inlineRadioOptions']:checked").val()
        }
        pushToMovies(movieObject);
}

function deleteMovies(movieId) {
    const deleteOptions ={
        method: "DELETE",
    }
    fetch(`${url}/${movieId}`, deleteOptions)
        .then(response => console.log(response))
        .then( moviesRerender =>{ fetch(url)
            .then(response => response.json())
            .then(listOfMovies => {
                $("#movies-cards-container").empty();
                listOfMovies.forEach(function (element) {
                    appendMovieHTML(buildMovieCard(element));
                })
                setupListeners();
            })
        });
// .catch(error => console.error(error))
}

function pushToMovies(movieObject) {
    const options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(movieObject)
    };
    // Movie added
    fetch(url,options)
        .then(response => console.log(response))
        .catch(error => console.error(error))
        .then( movieLoad => {
            fetch(url)
                .then(response => response.json())
                .then(listOfMovies => {
                    let newestMovie = listOfMovies[listOfMovies.length - 1]
                    console.log(newestMovie);
                    appendMovieHTML(buildMovieCard(newestMovie));
                    toggleMovieHTML();
                    setupListeners();
                    // todo get the HTML appended properly, not currently appending for some reason
                })
        })

    // Modal closes
    $("#add-modal").modal("hide");

    // HTML disappears, Loading appears
    toggleMovieHTML();
    // toggleLoading();







}

$(document).ready(function () {
    displayLoading();
    setTimeout(function () {
        $("#loading-message").modal("hide");
    },3000)
    fetch(url)
        .then(response => response.json())
            .then(listOfMovies => {
                listOfMovies.forEach(function (element) {
                    appendMovieHTML(buildMovieCard(element));
                })
                // todo We needed this event listener to be after the cards are populated, otherwise there were issues with the scope
                setupListeners();
            })
        .catch(error => console.error(error));


    $("#add-btn").click((e) => {
        e.preventDefault();
        $("#add-modal").modal("show")
    })


});

$("#save-changes-button").click(function () {
   createMovies();

})
