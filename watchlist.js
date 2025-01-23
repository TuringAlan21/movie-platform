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
        let html = watchlist.map((movie) => `
        <img src="${movie.poster}" alt="${movie.title}">
        <h1>${movie.title}</h1>
        </div>
        `).join("");
        watchlistPlaceholder.innerHTML = html;
    }
}

// add removal func
