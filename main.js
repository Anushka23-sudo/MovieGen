
document.addEventListener("DOMContentLoaded", function () {
    const genreForm = document.getElementById("genreForm");
    const movieList = document.querySelector(".movie-list");

    genreForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedGenre = document.getElementById("genreSelect").value;
        fetchMoviesByGenre(selectedGenre);
    });
    let lastSelectedGenre = 0; 

    genreForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedGenre = document.getElementById("genreSelect").value;
        if (selectedGenre === lastSelectedGenre) {
            submitButton.textContent = "Again";
        } else {
            submitButton.textContent = "Submit";
        }
        lastSelectedGenre = selectedGenre;

        fetchMoviesByGenre(selectedGenre);
    });



    function fetchMoviesByGenre(genreId) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer   eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDA3ZDEzODAyMDEwY2ZmZDE0ZjllYjBiODNjYWU4ZSIsInN1YiI6IjY0ZmM4YjY5ZGMxY2I0MDEzZDBmMTc5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6tf3MB2pD3LZTm5TNsDTpze3SiJQDhXZBAdMw4NTx58' // Replace with your API key
            }
        };

        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
            .then(response => response.json())
            .then(data => {
                const shuffledMovies = shuffleArray(data.results);
                displayMovies(shuffledMovies.slice(0, 6));
            })
            .catch(err => console.error(err));
    }
  
    function displayMovies(movies) {
        // Clear previous movie list
        movieList.innerHTML = "";

        movies.forEach(movie => {
            const movieItem = document.createElement("div");
            movieItem.classList.add("movie-item");
            movieItem.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title} Poster">
                `;
            movieList.appendChild(movieItem);
        });
    }
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

});