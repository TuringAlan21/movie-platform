// when the page loads, get the movies from localStorage and add to the watchlist variable, then render the watchlist
window.onload = function () {
    let watchlist;
    try {
        watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    } catch (e) {
        watchlist = [];
        console.error("Error parsing watchlist");
    }
    renderWatchlist(watchlist);
};

function renderWatchlist(watchlist) {
    const watchlistPlaceholder = document.getElementById("watchlist-placeholder");

    if (watchlist.length === 0) {
        // add empty state for when nothing is in the watchlist
        watchlistPlaceholder.innerHTML = `<div><h1>Nothing to see here</h1></div>`; /* add empty state html here */
        return;
    } else {
        // if there is something in the watchlist, map over the watchlist array and render it
        let html = watchlist.map((movie) =>  `
        <div class="movie-box">
        <img src="${movie.poster || 'No poster available'}" alt="${movie.title}">
        <div class="movie-details">
        <div class="first-group">
        <h2 class="watchlist-title">${movie.title || 'No title available'}</h2>
        <p class="rating">${movie.rating || 'No rating available'}</p>
        <p class="star">⭐</p>
        <p class="watchlist-watchlist">Watchlist</p>
        <button class="remove">-</button>
        </div>
        <div class="other-details">
        <p class="duration">${movie.duration || 'No duration available' }</p>
        <p class="genre">${movie.genre || 'No genre available'}</p>
        </div>
        <p class="plot">${movie.plot || 'No description available'}</p>
        </div>
        </div>
        `).join("");
        watchlistPlaceholder.innerHTML = html;
    }
}

// add removal func
document.addEventListener('click', function(event){
    if(event.target.classList.contains('remove')){
        const movieBox = event.target.closest('.movie-box');
        const movieTitle = movieBox.querySelector('.watchlist-title').textContent;
        movieBox.remove();


        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        watchlist = watchlist.filter((movie) => movie.title !== movieTitle);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
})
