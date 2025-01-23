"use strict";

// Selectors
const searchBtn = document.getElementById("search-btn");
const searchField = document.getElementById("search-field");
const moviePlaceHolder = document.getElementById("movie-placeholder");
const notFoundText = document.getElementById("not-found"); /* = 'No movies found. Please try another title.';  This throws errors*/

// Event listener for the search button
searchBtn.addEventListener("click", function () {
    const searchTerm = searchField.value.trim(); // Get the user input

    if (!searchTerm) {
        alert("Please enter a movie title"); // Alert if input is empty
    } else {
        // Fetch movies using the OMDb API
        fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=1aa511d0`)
            .then((response) => response.json())
            .then((data) => {
                // Clear previous movie results
                moviePlaceHolder.innerHTML = "";

                if (data.Response === "True") {
                    console.log(data);
                    // Iterate through the results and display each movie
                    data.Search.forEach((movie) => {
                        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=1aa511d0`) // Fetch full movie details
                            .then((response) => response.json())
                            .then((imdb) => {
                                const movieCard = `
                                    <div class="movie-card">
                                        <div id="poster">
                                            <img src="${imdb.Poster}" alt="${imdb.Title}" />
                                        </div>
                                        <div id="details">
                                            <div id="text-group-one">
                                                <h3 class="movie-title">${imdb.Title}</h3>
                                                <p id="add-to-watchlist">Watchlist</p>
                                                <button class="add">+</button>
                                                <span id="star">⭐</span>
                                                <p id="rating">${imdb.imdbRating || "N/A"}</p>
                                            </div>
                                            <div id="text-group-two">
                                                <p id="duration">${imdb.Runtime || "N/A"}</p>
                                                <p id="genre">${imdb.Genre || "N/A"}</p>
                                            </div>
                                            <div id="description">
                                                ${imdb.Plot || "No description available."}
                                            </div>
                                        </div>
                                    </div>
                                `;
                                // Append the movie card to the placeholder
                                moviePlaceHolder.innerHTML += movieCard;
                            });
                    });
                } else {
                    // Display 'not found' message if no movies match
                    moviePlaceHolder.innerHTML = `<p>${notFoundText}</p>`;
                }
            })
            .catch((err) => {
                console.error("Error fetching data from OMDb API:", err);
                moviePlaceHolder.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
            });
    }
});

moviePlaceHolder.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("add")) {
        const movieCard = event.target.closest(".movie-card");
        const movieTitle = movieCard.querySelector(".movie-title").textContent;
        const moviePoster = movieCard.querySelector("img").src;

        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        const movieIndex = watchlist.findIndex((movie) => movie.title === movieTitle);

        if (event.target.textContent === "+") {
            if (movieIndex === -1) {
                watchlist.unshift({ title: movieTitle, poster: moviePoster });
                console.log(`Adding "${movieTitle}" to the watchlist.`);
            }
            event.target.textContent = "-";
        } else if (event.target.textContent === "-") {
            if (movieIndex !== -1) {
                watchlist.splice(movieIndex, 1);
                console.log(`Removing "${movieTitle}" from the watchlist.`);
            }
            event.target.textContent = "+";
        }

        localStorage.setItem("watchlist", JSON.stringify(watchlist));

        if (watchlist.length === 0) {
            watchlistPlaceholder.innerHTML = "<p>Your watchlist is empty.</p>";
        } else {
            watchlist.forEach((movie) => {
                const movieCard = `
                    <div class="movie-card">
                        <img src="${movie.poster}" alt="${movie.title}" />
                        <h3>${movie.title}</h3>
                        <div class="details"></div>
                    </div>
                `;
                watchlistPlaceholder.innerHTML += movieCard;
            });
        }
    }
});
