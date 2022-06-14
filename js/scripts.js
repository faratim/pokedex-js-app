// IIFE that returns 'add' and 'getAll' to pokemonRepository
let pokemonRepository = (function() {
  let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1.0, types: ['grass', 'poison']},
    {name: 'Venusaur', height: 2.0, types: ['grass', 'poison']},
  ];

  //Function that allows you to add pokemon to the Pokedex and validates it's the right input type
  function add(pokemon) {
    if (typeof pokemon === 'object' &&
      !Array.isArray(pokemon) &&
      pokemon !== null &&
      Object.keys(pokemonList[0]).every(key => key in pokemon)
)   {
      pokemonList.push(pokemon);
      console.log("Your Pokemon was successfully added!")
    } else {
      console.log("The Pokemon you tried to add is not in the correct format. Please add an object with name: , height: , and types: ")
    }

  }

  //Gets all objects from the pokemonList Array
  function getAll() {
    return pokemonList;
  }

  //Filters by Pokemon name and returns the object of any matching Pokemon
  function filterPokemon(nameToFilter) {
    thesePokemon = pokemonList.filter(filteredPokemon => filteredPokemon.name === nameToFilter);
    return thesePokemon;
  }

  return {
    add: add,
    getAll: getAll,
    filterPokemon: filterPokemon
  };

})();

//Testing validation (not an object)
pokemonRepository.add("Pikachu");

//Testing validation (undefined);
pokemonRepository.add();

//Testing validation (not all Object.keys are included)
pokemonRepository.add( {
  name: 'Pikachu',
  height: 0.7,
} );

//Testing validation and adding this Pokemon since it's the correct data type
pokemonRepository.add( {
  name: 'Pikachu',
  height: 0.7,
  types: ['electric']
} );

//Filters by Pokemon name and returns array that matches Pokemon name
pokemonRepository.filterPokemon('Bulbasaur');
console.log(thesePokemon);

// Writes all Pokemon in pokemonList to the DOM; includes message if Pokemon is over 1.2 in height
let bigPokemon = " - Wow, that's big!"

pokemonRepository.getAll().forEach(function(item) {
  if (item.height <= 1.2) {
    document.write('<p>' + item.name + " (height: " + item.height + ")" + '</p>');
  } else {
    document.write('<p>' + item.name + " (height: " + item.height + ")" + bigPokemon + '</p>');
  }
});
