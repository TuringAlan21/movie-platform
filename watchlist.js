// when the page loads, get the movies from localStorage and add to the watchlist variable, then render the watchlist
window.onload = function () {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
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
        let html = watchlist.map((movie) => `<div><h1>${movie.title}</h1><img src="${movie.poster}" alt=""></div> `).join("");
        watchlistPlaceholder.innerHTML = html;
    }
}

// add removal func
