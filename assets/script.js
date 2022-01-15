const APP_ID = "5e3b7a77";
const APP_key = "5abc82d0bdb50534215cd56836a967fd";
const recipeContainer = document.querySelector(".ingredients-form");
let ingredient = "";

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

function dinner() {
  fetch(
    `https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_key}&imageSize=REGULAR&random=true`
  )
    .then((response) => response.json())
    .then((data) => {
      createHTML(data.hits);
      console.log(data.hits); // log shows array with all recipe info
    });
  function createHTML(neededData) {
    let madeDiv = document.createElement("div");
    madeDiv.innerHTML = ""; // Created an empty div to hold all created elements
    neededData
      .map((result) => {
        // This should create a new div for each recipe
        console.log(result);
        //  Created elements
        let foodImage = document.createElement("img");
        let recipeName = document.createElement("h2");
        let recipeButton = document.createElement("a");
        let buttonText = document.createTextNode("Get Recipe");
        let ingredients = document.createElement("p");
        //  Create a link (button) in the div that send the user to the recipe page
        recipeButton.appendChild(buttonText);
        recipeButton.title = "submit";
        recipeButton.href = `${result.recipe.url}`;
        recipeButton.className = "button";
        // Element values
        foodImage.src = `${result.recipe.image}`;
        recipeName.innerHTML = `${result.recipe.label}`;
        ingredients = `${result.recipe.ingredientLines}`;
        console.log(ingredients);
        // Append elements to created div
        madeDiv.append(foodImage, recipeName, recipeButton, ingredients);
        // Append made div to HTML container after form
        recipeContainer.append(madeDiv);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  recipeContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    ingredient = e.target.querySelector("input").value;
    dinner();
  });
}





















//  Need retrieveSearch() to be called on page load
//  Need saveSearch() to be called on the ingredient search event listener

let pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
function saveSearch() {
  let searchedIngredient = document.querySelector("#ingredients").value;
  pastSearches.push(searchedIngredient);
  pastSearches.slice(0, 5);
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
}

function retrieveSearch() {
  let storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
  storedSearches.forEach((result) => {
    let listDiv = document.querySelector(".listHolder"); // Need to add in a div with this class to HTML
    let addedItem = `<li class="resultList">${result}</li>`;

    listDiv.insertAdjacentHTML("afterbegin", addedItem);
  });
}
