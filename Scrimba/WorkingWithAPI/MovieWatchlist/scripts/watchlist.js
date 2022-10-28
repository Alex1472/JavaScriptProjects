let container = document.getElementById("movies-container");

let movieInfos = [];
for (let i = 0; i < localStorage.length; i++)
    movieInfos.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
renderWatchlist(movieInfos, container);

function renderWatchlist(movieInfos, container) {
    if (movieInfos.length > 0) renderMovies(movieInfos, container);
    else renderEmptyWatchlist(container);
}

function renderEmptyWatchlist(container) {
    container.innerHTML = `
        <div class="default-container">
            <p class="grey-font">
                Your watchlist is looking a little empty...
            </p>
            <div class="add-movies-container">
                <img src="images/plus.svg" />
                <p class="add-movies-label">
                    Let's add some movies
                </p>
            </div>
        </div>
    `;
}

function renderMovies(movieInfos, container) {
    container.innerHTML = "";
    console.log(movieInfos);
    for (let movieInfo of movieInfos) {
        let movieElement = document.createElement("div");
        movieElement.className = "movie-item";
        movieElement.innerHTML = `
            <img class="movie-poster" src="${movieInfo.Poster}" />
            <div class="movie-info-container">
                <span class="movie-title">${movieInfo.Title}</span>
                <img src="images/star.svg" />
                <span class="movie-info">${movieInfo.imdbRating}</span>
                <br />
                <span class="movie-info">${movieInfo.Runtime}</span>
                <span class="movie-info movie-genre">${movieInfo.Genre}</span>
                <img id="action-img" src="images/minus.svg" />
                <span id="action-label" class="movie-info">Remove</span>
                <p class="movie-description">${movieInfo.Plot}</p>
            </div>
        `;
        let img = movieElement.querySelector("#action-img");
        img.addEventListener("click", () =>
            handleRemoveMovieClick(movieInfo, movieElement, container)
        );
        container.appendChild(movieElement);
    }
}

function handleRemoveMovieClick(movieInfo, movieElement, container) {
    localStorage.removeItem(movieInfo.imdbID);
    container.removeChild(movieElement);
    if (localStorage.length === 0) renderEmptyWatchlist(container);
}
