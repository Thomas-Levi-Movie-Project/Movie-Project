const url = "https://changeable-sharp-talk.glitch.me/movies"

function hideLoading() {
    $("#loading-message").css("display", "none");
}

function toggleLoading() {
    $("#loading-message").toggleClass("d-none");
}

function toggleMovieHTML() {
    $("#movies-cards-container").toggleClass("d-none");
}



$(document).ready(function () {

    fetch("https://changeable-sharp-talk.glitch.me/movies")
        .then(response => response.json())
            .then(listOfMovies =>{
                toggleLoading();
                let moviesHTML = "";
                listOfMovies.forEach(function(element) {
                    moviesHTML += `<div class="card"><div class="card-body">`
                    moviesHTML += `<button type="button" id="${element.id}-button" class="close" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">&times;</span></button>`
                    moviesHTML += `<h5 class="card-title">Title: ${element.title}</h5>`
                    moviesHTML += `<p class="card-text">Rating: ${element.rating}</p>`
                    moviesHTML += `<p class="card-text">ID: ${element.id}</p>`
                    moviesHTML += `</div></div>`
                })
                $("#movies-cards-container").append(moviesHTML);
            })
        .catch(error => console.error(error));

    $("#add-btn").click((e) => {
        e.preventDefault();
        $("#add-modal").modal("show")
    })
});

$("#save-changes-button").click(function () {
    let movieObject = {
        title: $("#modalMovieTitle").val(),
        rating: $("input[name='inlineRadioOptions']:checked").val()
    }
    console.log("Movie Object: ", movieObject);
    pushToMovies(movieObject);
})

function pushToMovies(movieObject) {

     const url = "https://changeable-sharp-talk.glitch.me/movies"
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

    // Modal closes
    $("#add-modal").modal("hide");

    // HTML disappears, Loading appears
    toggleMovieHTML();
    toggleLoading();

    fetch("https://changeable-sharp-talk.glitch.me/movies")
        .then(response => response.json())
        .then(listOfMovies => {
            let moviesHTML = "";
            moviesHTML += `<div class="card"><div class="card-body">`
            moviesHTML += `<h5 class="card-title">Title: ${listOfMovies[listOfMovies.length - 1].title}</h5>`
            moviesHTML += `<p class="card-text">Rating: ${listOfMovies[listOfMovies.length - 1].rating}</p>`
            moviesHTML += `</div></div>`

            $("#movies-cards-container").append(moviesHTML);
            toggleLoading();
            toggleMovieHTML();

            // todo get the HTML appended properly, not currently appending for some reason
        })
        .catch(error => console.error(error));

    // HTML refreshed

    // $(".close").click(function () {
    //     deleteMovies()
    // })

}

// pushToMovies();

function deleteMovies(movieId) {

    const deleteOptions ={
        method: "DELETE",
        // headers:{
        //     "Content-Type": "applications/json"
        // }
    }
    fetch(`https://changeable-sharp-talk.glitch.me/movies/${movieId}`, deleteOptions)
        .then(response => console.log(response))
        .catch(error => console.error(error))

}