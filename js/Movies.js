const url = "https://changeable-sharp-talk.glitch.me/movies"

function toggleLoading() {
    $("#loading-message").toggleClass("d-none");
}

function toggleMovieHTML() {
    $("#movies-cards-container").toggleClass("d-none");
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
                toggleLoading();
                let moviesHTML = "";
                listOfMovies.forEach(function (element) {
                    moviesHTML += `<div class="card" data-id="${element.id}"><div class="card-body">`
                    moviesHTML += `<button type="button" data-id="${element.id}" id="${element.id}-button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
                    moviesHTML += `<h5 class="card-title">Title: ${element.title}</h5>`
                    moviesHTML += `<p class="card-text">Rating: ${element.rating}</p>`
                    moviesHTML += `<p class="card-text">ID: ${element.id}</p>`
                    moviesHTML += `</div></div>`
                })
                $("#movies-cards-container").append(moviesHTML);
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

    // Modal closes
    $("#add-modal").modal("hide");

    // HTML disappears, Loading appears
    toggleMovieHTML();
    toggleLoading();

    fetch(url)
        .then(response => response.json())
        .then(listOfMovies => {
            let moviesHTML = "";
            moviesHTML += `<div class="card" data-id="${listOfMovies[listOfMovies.length - 1].id}"><div class="card-body">`
            moviesHTML += `<button type="button" data-id="${listOfMovies[listOfMovies.length - 1].id}" id="${listOfMovies[listOfMovies.length - 1].id}-button" class="close" data-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">&times;</span></button>`
            moviesHTML += `<h5 class="card-title">Title: ${listOfMovies[listOfMovies.length - 1].title}</h5>`
            moviesHTML += `<p class="card-text">Rating: ${listOfMovies[listOfMovies.length - 1].rating}</p>`
            moviesHTML += `<p class="card-text">ID: ${listOfMovies[listOfMovies.length - 1].id}</p>`
            moviesHTML += `</div></div>`

            $("#movies-cards-container").append(moviesHTML);
            toggleLoading();
            toggleMovieHTML();

            // todo get the HTML appended properly, not currently appending for some reason
        })
        .catch(error => console.error(error));

    // HTML refreshed
}

$(document).ready(function () {
    fetch(url)
        .then(response => response.json())
            .then(listOfMovies => {
                toggleLoading();
                let moviesHTML = "";
                listOfMovies.forEach(function (element) {
                    moviesHTML += `<div class="card" data-id="${element.id}"><div class="card-body">`
                    moviesHTML += `<button type="button" data-id="${element.id}" id="${element.id}-button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
                    moviesHTML += `<h5 class="card-title">Title: ${element.title}</h5>`
                    moviesHTML += `<p class="card-text">Rating: ${element.rating}</p>`
                    moviesHTML += `<p class="card-text">ID: ${element.id}</p>`
                    moviesHTML += `</div></div>`
                })
                $("#movies-cards-container").append(moviesHTML);


                // todo We needed this event listener to be after the cards are populated, otherwise there were issues with the scope
                $(".close").click(function() {
                    deleteMovies($(this).attr("data-id"))
                    console.log("Movie ID: ", $(this).attr("data-id"));
                    console.log("Movie Deleted");
                    // $("#movies-cards-container").empty();
                    // fetch(url)
                    //     .then(response => response.json())
                    //     .then(listOfMovies =>{
                    //         toggleLoading();
                    //         let moviesHTML = "";
                    //         listOfMovies.forEach(function(element) {
                    //             moviesHTML += `<div class="card" data-id="${element.id}"><div class="card-body">`
                    //             moviesHTML += `<button type="button" data-id="${element.id}" id="${element.id}-button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
                    //             moviesHTML += `<h5 class="card-title">Title: ${element.title}</h5>`
                    //             moviesHTML += `<p class="card-text">Rating: ${element.rating}</p>`
                    //             moviesHTML += `<p class="card-text">ID: ${element.id}</p>`
                    //             moviesHTML += `</div></div>`
                    //         })
                    //         $("#movies-cards-container").append(moviesHTML);
                    //     });

                })
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
    pushToMovies(movieObject);
})
