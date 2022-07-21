let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonDisplay = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let listButton = document.createElement('button');
        pokemonDisplay.classList.add('group-list-item');
        listButton.innerHTML = `<strong>${pokemon.name}</strong>`;
        listButton.classList.add('pokemon-name');
        listButton.classList.add('selected-button');
        listButton.setAttribute('data-toggle', 'modal');
        listButton.setAttribute('data-target', '#pokemon-modal');
        listItem.appendChild(listButton);
        pokemonDisplay.appendChild(listItem);
        listButtonEventListener(listButton, pokemon);
    }

    function listButtonEventListener(listButton, pokemon) {
        listButton.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                pokemon.imageUrlFront = details.sprites.other.dream_world.front_default;
                pokemon.imageUrlBack = details.sprites.back_shiny;
                pokemon.id = details.id;
                pokemon.height = details.height;
                pokemon.weight = details.weight;
                pokemon.types = details.types.map((type) => type.type.name).join(', ');
                pokemon.abilities = details.abilities.map((ability) => ability.ability.name).join(', ');
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');

        modalTitle.empty();
        modalBody.empty();

        let nameElement = $('<h1>' + pokemon.name + '</h1>');

        let imageElementFront = $('<img class="modal-img" style="width: 40%">');
        imageElementFront.attr('src', pokemon.imageUrlFront);

        let imageElementBack = $('<img class="modal-img" style="width: 40%">');
        imageElementBack.attr('src', pokemon.imageUrlBack);

        let heightElement = $('<p>' + '<strong>Height: </strong>' + pokemon.height + '</p>');
        let weightElement = $('<p>' + '<strong>Weight: </strong>' + pokemon.weight + '</p>');

        let typesElement = $('<p>' + '<strong>Types: </strong>' + pokemon.types + '</p>');
        let abilitiesElement = $('<p>' + '<strong>Abilities: </strong>' + pokemon.abilities + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
    }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// *----  SEARCH FUNCTION ----*
function searchFunction(event) {
    let pokemonNames = document.getElementsByClassName('pokemon-name');
    let { value } = event.target;
    let searchQuery = value.toLowerCase();
    for (let pokemonName of pokemonNames) {
        let name = pokemonName.textContent.toLowerCase();
        if (name.includes(searchQuery)) {
            pokemonName.closest('li').style.display = 'inline-block';
        } else {
            pokemonName.closest('li').style.display = 'none';
        }
    }
}

let search = document.getElementById('search');
search.addEventListener('keyup', searchFunction);
