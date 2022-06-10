// Initial List of Pokemon
let pokemonList = [
  {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  {name: 'Ivysaur', height: 1.0, types: ['grass', 'poison']},
  {name: 'Venusaur', height: 2.0, types: ['grass', 'poison']},
  {name: 'Pikachu', height: 0.4, types: ['electric']},
];

// Writes all Pokemon in pokemonList to the DOM, includes message if Pokemon is over 1.2 in height
let bigPokemon = " - Wow, that's big!"

for (i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 1.2) {
    document.write('<p>' + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + '</p>')
  }
  if (pokemonList[i].height >1.2) {
    document.write('<p>' + pokemonList[i].name + " (height: " + pokemonList[i].height + ")" + bigPokemon + '</p>')
  }
}
