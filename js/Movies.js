
function hideLoading() {
    $("#loading-message").css("display", "none");
}

$(document).ready(function () {

    fetch("https://changeable-sharp-talk.glitch.me/movies")
        .then(response => response.json())
            .then(listOfMovies =>{
                hideLoading();
                let moviesHTML = "";
                listOfMovies.forEach(function(element) {
                    moviesHTML += `<div class="card"><div class="card-body">`
                    moviesHTML += `<h5 class="card-title">Title: ${element.title}</h5>`
                    moviesHTML += `<p class="card-text">Rating: ${element.rating}</p>`
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

