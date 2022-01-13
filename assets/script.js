// API for getting recipes by ingredients (includes image)
// https://api.spoonacular.com/recipes/findByIngredients

// API for getting nutritional values bases off recipe ID (get from first API)
// https://api.spoonacular.com/recipes/{id}/nutritionWidget.json



// Start of Get Movie

function movieGenre() {
  let genre = "adventure"; // this value will need to be fed in from a select input in HTML
  // will also need a button and event listener to run function
  // options need to be "Action", "Adventure", "Drama", "Fantasy"

  // Fetch to get 100 most popular movies by genre
  // Return is an array of movie title values
  fetch(
    `https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F${genre}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        // API key allows for 500 calls per month, then stops working
        "x-rapidapi-key": "518e483edbmsh0bb6faee44ded05p1deebajsnc0bbf449acd3",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const list = data;

      var title = list[Math.floor(Math.random() * list.length)];
      console.log(title); // gives a string response of /title/tt1677720/
      // Need to extract the tt value to feed into the next API call

      var titleId = title.split("/")[2]; // Gives the needed value to pass in
      getMovieData(titleId);
    })

    .catch((error) => {
      console.log(error);
    });
}
// Second fetch call will use returned tile value and provide needed data including image
// Will need to use a method to randomize or step through the array of titles
function getMovieData(id) {
  fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      // API key allows for 500 calls per month, then stops working
      "x-rapidapi-key": "518e483edbmsh0bb6faee44ded05p1deebajsnc0bbf449acd3",
    },
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // shows an array

        var container = document.querySelector(".movies");
        var movieTitle = document.createElement("h2");
        var moviePoster = document.createElement("img");

        movieTitle.textContent = `${data.d[0].l}`;
        console.log(movieTitle.textContent);
        moviePoster.src = `${data.d[0].i.imageUrl}`;

        container.append(movieTitle, moviePoster);

    })
    // console log shows good return of array
    // Array is d and needed info is as follows
    // d.0.l  will give the name
    // d.0.i.imageURL will give https for image

    .catch((error) => {
      console.log(error);
    });
}
//movieGenre(); // need event listener to start this once button is clicked

// Event listener when user selects a movie genre
document.getElementById("movie-genre").addEventListener("click", movieGenre);