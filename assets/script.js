// Food API ID and key
const APP_ID = "5e3b7a77";
const APP_key = "5abc82d0bdb50534215cd56836a967fd";

const recipeContainer = document.querySelector(".ingredients-form");
let ingredients = document.querySelector(".ingredients");
let genre = "";
let id = "";
let listDiv = document.getElementById("listHolder");
let recipeHold = document.getElementById("recipe-hold");
let container = document.querySelector(".movies");


function genreSelect() {
  let selectId = document.getElementById("movie-genre");
  if (selectId.selectedIndex > 0) {
    let genre = selectId.value;

    movieGenre(genre);
    console.log(selectId.value);
  }
}
document.getElementById("movie-genre").addEventListener("change", genreSelect);

// Start of Get Movie

function movieGenre(genre) {
  // Fetch to get 100 most popular movies by genre
  // Return is an array of movie title values
  fetch(
    `https://imdb8.p.rapidapi.com/title/get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F${genre}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "35d3a3dcbbmsh051f4f9ca050ca4p1fd323jsn0e5e19e852a3",
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
      selected.forEach((titleString) => {
        let titleId = titleString.split("/")[2]; // extracts the movie Id
        getMovieData(titleId);
      });

      // .catch((error) => {
      //   console.log(error);
      // });
    });
  // Second fetch call uses returned tile value and provide needed data including image
  function getMovieData(id) {
    container.innerHTML = "";
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${id}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        // API key allows for 500 calls per month, then stops working
        "x-rapidapi-key": "35d3a3dcbbmsh051f4f9ca050ca4p1fd323jsn0e5e19e852a3",
      },
    })
      .then((response) => response.json())
      .then((data) => {

        console.log(data); // shows an array with all movie data
        

        // Selects the div to append to and creates title and image elements
        var movieTitle = document.createElement("h2");
        var moviePoster = document.createElement("img");
        let movieCard = document.createElement("div");
        movieCard.className = "card";
        movieCard.style.width = "600px";

        // Assigns specified data from the array to the created elements
        movieTitle.textContent = `${data.d[0].l}`;
        moviePoster.src = `${data.d[0].i.imageUrl}`;

        movieCard.innerHTML = "";
        // Adds the title and image to the selected Div
        movieCard.append(movieTitle, moviePoster);
        // container.innerHTML = "";
        container.append(movieCard);
      });
    // .catch((error) => {
    //   console.log(error);
    // });
  }
}

// Start of Dinner Function

document.getElementById("form").addEventListener("submit", dinner);

function dinner(e) {
  e.preventDefault();
  recipeHold.innerHTML = "";
  const form = document.getElementById("form");
  let formValue = document.getElementById("ingredients");
  let ingredient = formValue.value;
  
  console.log(ingredient);
  fetch(
    `https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_key}&imageSize=REGULAR&random=true`
  )
    .then((response) => response.json())
    .then((data) => {
      createHTML(data.hits);
      // console.log(data.hits); // log shows array with all recipe info for 10 results
    });
  function createHTML(neededData) {

    neededData.map((result) => {
        console.log(result); // Console log shows object with all needed data

        //  Created elements
        let madeCard = document.createElement("div");
        madeCard.className = "card";
        madeCard.style.width = "300px";
        let foodImage = document.createElement("img");
        let recipeName = document.createElement("h2");
        let recipeButton = document.createElement("a");
        let buttonText = document.createTextNode("Get Recipe");
        let ingredients = document.createElement("p");
        let lineBreak = document.createElement("br");

        //  Create a link (button) in the div that send the user to the recipe page
        recipeButton.appendChild(buttonText);
        recipeButton.title = "submit";
        recipeButton.href = `${result.recipe.url}`;
        recipeButton.className = "button";

        // Element values
        foodImage.src = `${result.recipe.image}`;
        recipeName.innerHTML = `${result.recipe.label}`;
        ingredients = `${result.recipe.ingredientLines}`;
        // console.log(ingredients);

        // Append elements to created div
        madeCard.innerHTML = "";
        madeCard.append(
          foodImage,
          recipeName,
          ingredients,
          lineBreak,
          recipeButton
          );
        recipeHold.append(madeCard);
        // Append made div to HTML container after form
        recipeContainer.appendChild(recipeHold);
      });

    // .catch((error) => {
    //   console.log(error);
    // });
  }
  saveSearch();
  listDiv.innerHTML = "";

  retrieveSearch();
}

listDiv.addEventListener("click", seconds);

function seconds(e) {
  e.preventDefault();
  recipeHold.innerHTML = "";
  const form = document.getElementById("form");
  let ingredient = e.target.innerHTML;
  
  console.log(ingredient);
  fetch(
    `https://api.edamam.com/search?q=${ingredient}&app_id=${APP_ID}&app_key=${APP_key}&imageSize=REGULAR&random=true`
  )
    .then((response) => response.json())
    .then((data) => {
      createHTML(data.hits);
      // console.log(data.hits); // log shows array with all recipe info for 10 results
    });
  function createHTML(neededData) {

    neededData.map((result) => {
        console.log(result); // Console log shows object with all needed data

        //  Created elements
        let madeCard = document.createElement("div");
        madeCard.className = "card";
        madeCard.style.width = "300px";
        let foodImage = document.createElement("img");
        let recipeName = document.createElement("h2");
        let recipeButton = document.createElement("a");
        let buttonText = document.createTextNode("Get Recipe");
        let ingredients = document.createElement("p");
        let lineBreak = document.createElement("br");

        //  Create a link (button) in the div that send the user to the recipe page
        recipeButton.appendChild(buttonText);
        recipeButton.title = "submit";
        recipeButton.href = `${result.recipe.url}`;
        recipeButton.className = "button";

        // Element values
        foodImage.src = `${result.recipe.image}`;
        recipeName.innerHTML = `${result.recipe.label}`;
        ingredients = `${result.recipe.ingredientLines}`;
        // console.log(ingredients);

        // Append elements to created div
        madeCard.innerHTML = "";
        madeCard.append(
          foodImage,
          recipeName,
          ingredients,
          lineBreak,
          recipeButton
          );
        recipeHold.append(madeCard);
        // Append made div to HTML container after form
        recipeContainer.appendChild(recipeHold);
      });

    // .catch((error) => {
    //   console.log(error);
    // });
  }
}

// Start of Local Storage - Saved Searches

// Loads past searches or an empty array
let pastSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
// adds user supplied value from input to the pastSearches array
function saveSearch() {
  let formValue = document.getElementById("ingredients");
  let ingredient = formValue.value.trim();

  let searchedIngredient = ingredient;
  pastSearches.push(searchedIngredient);
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
}

function retrieveSearch() {
  // gets saved searches from local storage
  let storedSearches = JSON.parse(localStorage.getItem("pastSearches")) || [];
  // For each of the saved searches obtained from local storage, a list item is created
  // and added to Ul in list holder
  storedSearches.slice(-5).forEach((result) => {
    let addedItem = document.createElement("li");

    addedItem.innerHTML = result;
    addedItem.style.cursor="pointer";
    // console.log(addedItem);
    listDiv.append(addedItem);
  });
}

retrieveSearch();

// movieGenre();
// dinner();
