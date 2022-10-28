const baseUrl = "http://www.omdbapi.com/?apikey=288f6a33&";

let movieInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let moviesContainer = document.getElementById("movies-container");

searchBtn.addEventListener("click", updateMovie);

async function updateMovie() {
    let data = await fetchMovieInfos();
    renderMovies(data, moviesContainer);
}

async function fetchMovieInfos() {
    let url = baseUrl + `s=${movieInput.value}`;
    let responce = await fetch(url);
    let data = await responce.json();
    if (data.Response == "False") {
        renderEmptyResult(moviesContainer);
        return;
    }

    let urls = data.Search.map((movie) => baseUrl + `i=${movie.imdbID}`);
    let requests = urls.map((url) => fetch(url));
    let responses = await Promise.all(requests);
    let movieInfos = await Promise.all(
        responses.map((response) => response.json())
    );
    return movieInfos;
}

function renderEmptyResult(moviesContainer) {
    moviesContainer.innerHTML = `
        <div class="default-container">
            <p class="grey-font">Unable to find what you’re looking for. Please try another search.</p>
        </div>
    `;
}

function renderMovies(movieInfos, container) {
    container.innerHTML = "";
    for (let movieInfo of movieInfos) {
        let isMovieInlist = isMovieInWatchlist(movieInfo);
        let movieElement = document.createElement("div");
        movieElement.className = "movie-item";
        movieElement.innerHTML = `
            <img class="movie-poster" src="${movieInfo.Poster}" alt="Poster" />
            <div class="movie-info-container">
                <span class="movie-title">${movieInfo.Title}</span>
                <img src="images/star.svg" />
                <span class="movie-info">${movieInfo.imdbRating}</span>
                <br />
                <span class="movie-info">${movieInfo.Runtime}</span>
                <span class="movie-info movie-genre">${movieInfo.Genre}</span>
                <img id="action-img" src="${getActionImagePath(
                    isMovieInlist
                )}" />
                <span id="action-label" class="movie-info">${getActionLabelText(
                    isMovieInlist
                )}</span>
                <p class="movie-description">${movieInfo.Plot}</p>
            </div>
        `;
        let img = movieElement.querySelector("#action-img");
        img.addEventListener("click", () =>
            handleRemoveMovieClick(movieInfo, movieElement)
        );
        container.appendChild(movieElement);
    }
}

function handleRemoveMovieClick(movieInfo, movieElement) {
    let isMovieInList = isMovieInWatchlist(movieInfo);
    updateStorage(isMovieInList, movieInfo);
    updateMovieElement(!isMovieInList, movieElement);
}

function updateMovieElement(isMovieInWatchlist, movieElement) {
    let actionImg = movieElement.querySelector("#action-img");
    actionImg.setAttribute("src", getActionImagePath(isMovieInWatchlist));
    let actionLabel = movieElement.querySelector("#action-label");
    actionLabel.textContent = getActionLabelText(isMovieInWatchlist);
}

function updateStorage(isMovieInWatchlist, movieInfo) {
    if (isMovieInWatchlist) localStorage.removeItem(movieInfo.imdbID);
    else localStorage.setItem(movieInfo.imdbID, JSON.stringify(movieInfo));
}

function isMovieInWatchlist(movieInfo) {
    return !!localStorage.getItem(movieInfo.imdbID);
}

function getActionImagePath(isMovieInWatchlist) {
    return isMovieInWatchlist ? "images/minus.svg" : "images/plus.svg";
}

function getActionLabelText(isMovieInWatchlist) {
    return isMovieInWatchlist ? "Remove From Watchlist" : "Add To Watchlist";
}
