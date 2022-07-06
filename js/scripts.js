// IIFE that contains functions for creating the Pokemon list
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Function that allows you to add pokemon to the Pokedex and validates it's the right input type
  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
      console.log("Your Pokemon was successfully added!");
    } else {
      console.log(
        "The Pokemon you tried to add is not in the correct format. Please add an object with name: , height: , and types: "
      );
    }
  }

  //Gets all objects from the pokemonList Array
  function getAll() {
    return pokemonList;
  }

  //Filters by Pokemon name and returns the object of any matching Pokemon
  function filterPokemon(nameToFilter) {
    thesePokemon = repository.filter(
      (filteredPokemon) => filteredPokemon.name === nameToFilter
    );
    return thesePokemon;
  }

  //Creates a list item and button for each Pokemon in the repository
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    //Create a button with each Pokemon name, add button-styling class, append button to list of Pokemon
    button.innerText = pokemon.name;
    button.classList.add("button-styling");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //Event listener to log details of the Pokemon that's clicked on
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // Loads list of Pokemon names and URLs from the Pokemon API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          addListItem(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Loads additional details of Pokemon from API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Logs the details of the clicked Pokemon to the console
  function showDetails(item) {
    loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // Returns all functions to be used outside of IIFE
  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// //Testing validation (not an object)
// pokemonRepository.add("Pikachu");

// //Testing validation (undefined);
// pokemonRepository.add();

// //Testing validation (not all Object.keys are included)
// pokemonRepository.add({
//   name: "Pikachu",
//   height: 0.7,
// });

//Testing validation and adding this Pokemon since it's the correct data type
// pokemonRepository.add({
//   name: "Pikachu",
//   height: 0.7,
//   types: ["electric"],
// });

//Filters by Pokemon name and returns array that matches Pokemon name
// pokemonRepository.filterPokemon("Bulbasaur");
// console.log(thesePokemon);

//Function calls to load list of Pokemon from API, create button for each, and listen for clicks to log details
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
