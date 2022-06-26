// IIFE that returns 'add' and 'getAll' to pokemonRepository
let pokemonRepository = (function () {
  let repository = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Ivysaur", height: 1.0, types: ["grass", "poison"] },
    { name: "Venusaur", height: 2.0, types: ["grass", "poison"] },
  ];

  //Function that allows you to add pokemon to the Pokedex and validates it's the right input type
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      !Array.isArray(pokemon) &&
      pokemon !== null &&
      Object.keys(repository[0]).every((key) => key in pokemon)
    ) {
      repository.push(pokemon);
      console.log("Your Pokemon was successfully added!");
    } else {
      console.log(
        "The Pokemon you tried to add is not in the correct format. Please add an object with name: , height: , and types: "
      );
    }
  }

  //Gets all objects from the repository Array
  function getAll() {
    return repository;
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
    //Run buttonClick function to log the Pokemon that's clicked on
    buttonClick(button, pokemon);
  }

  function buttonClick(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //Logs the name of the clicked Pokemon to the console
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon,
    addListItem: addListItem,
  };
})();

//Testing validation (not an object)
pokemonRepository.add("Pikachu");

//Testing validation (undefined);
pokemonRepository.add();

//Testing validation (not all Object.keys are included)
pokemonRepository.add({
  name: "Pikachu",
  height: 0.7,
});

//Testing validation and adding this Pokemon since it's the correct data type
pokemonRepository.add({
  name: "Pikachu",
  height: 0.7,
  types: ["electric"],
});

//Filters by Pokemon name and returns array that matches Pokemon name
pokemonRepository.filterPokemon("Bulbasaur");
console.log(thesePokemon);

// Creates a list item and button for every Pokemon by iterating on the addListItem function
// let bigPokemon = " - Wow, that's big!";
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
