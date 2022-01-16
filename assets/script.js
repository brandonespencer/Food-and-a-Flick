// Food API ID and key
const APP_ID = "5e3b7a77";
const APP_key = "5abc82d0bdb50534215cd56836a967fd";


const recipeContainer = document.querySelector(".ingredients-form");
let ingredient = "";
let genre = "";

// Start of Get Movie

function movieGenre() {

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
      console.log(data);

      // Randomizes results and pulls the first 4 to pass to getMovieData
      const shuffled = list.sort(() => 0.5 - Math.random());
      let selected = shuffled.slice(0, 4);
      console.log(selected);
      selected.forEach(titleString => {
        let titleId = titleString.split("/")[2];  // extracts the movie Id
      getMovieData(titleId);
    })

    // .catch((error) => {
    //   console.log(error);
    // });
});
// Second fetch call uses returned tile value and provide needed data including image
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
      console.log(data); // shows an array with all movie data

      // Selects the div to append to and creates title and image elements
      var container = document.querySelector(".movies");
      var movieTitle = document.createElement("h2");
      var moviePoster = document.createElement("img");
      let movieCard = document.createElement("div");
      movieCard.className = "card";
      movieCard.style.width = "600px";

      // Assigns specified data from the array to the created elements
      movieTitle.textContent = `${data.d[0].l}`;
      moviePoster.src = `${data.d[0].i.imageUrl}`;

      // Adds the title and image to the selected Div
      movieCard.append(movieTitle, moviePoster);
      container.append(movieCard);
    })
    // .catch((error) => {
    //   console.log(error);
    // });
}}

// Start of Dinner Function

function dinner() {
  fetch(
    `https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_key}&imageSize=REGULAR&random=true`
  )
    .then((response) => response.json())
    .then((data) => {
      createHTML(data.hits);
      console.log(data.hits); // log shows array with all recipe info for 10 results
    });
  function createHTML(neededData) {
    let madeDiv = document.createElement("div");
    madeDiv.innerHTML = ""; // Created an empty div to hold all created elements
    neededData
    // This creates a new div for each recipe
      .map((result) => {
        console.log(result); // Console log shows object with all needed data

        //  Created elements
        let madeCard = document.createElement("div")
        madeCard.className = "card";
        madeCard.style.width = "300px";
        let foodImage = document.createElement("img");
        let recipeName = document.createElement("h2");
        let recipeButton = document.createElement("a");
        let buttonText = document.createTextNode("Get Recipe");
        let ingredients = document.createElement("p");
        let linebreak = document.createElement("br");
        madeDiv.className = "grid-x grid-padding-x align-justify";
        
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
        madeCard.append(foodImage, recipeName, ingredients, linebreak, recipeButton);
        madeDiv.append(madeCard);

        // Append made div to HTML container after form
        recipeContainer.append(madeDiv);
      })

      // .catch((error) => {
      //   console.log(error);
      // });
  }

// Start of Local Storage - Saved Searches

//  Need saveSearch() to be called on the ingredient search event listener

// Loads past searches or an empty array
let pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
// adds user supplied value from input to the pastSearches array
function saveSearch() {
  let searchedIngredient = document.querySelector("#ingredients").value;
  pastSearches.push(searchedIngredient);
  // Keeps the saved results to the last 5
  pastSearches.slice(0, 5);
  // Pass the 5 results to local storage
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
}

//  Need retrieveSearch() to be called on page load
function retrieveSearch() {
  // gets saved searches from local storage
  let storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
  // For each of the saved searches obtained from local storage, a list item is created
  // and added to Ul in list holder 
  storedSearches.forEach((result) => {
    let listDiv = document.querySelector(".listHolder"); // Need to add in a div with this class to HTML
    let addedItem = `<li class="resultList">${result}</li>`;

    listDiv.insertAdjacentHTML("afterbegin", addedItem);
  });
}

};
// movieGenre();
// dinner();

