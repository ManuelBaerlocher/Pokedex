let pokedex
let currentPokemon;


async function loadPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    /*console.log(currentPokemon);*/

}

async function loadPokedex() {
    let urlpokedex = 'https://pokeapi.co/api/v2/pokedex/2/';
    let responsepokedex = await fetch(urlpokedex);

    pokedex = await responsepokedex.json();
    /*console.log(pokedex);*/

    loadGeneralPokemon();
}



function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['dream_world']['front_default']

}

async function loadGeneralPokemon() {

    document.getElementById('pokedexGeneralList').innerHTML = '';

    let pokemonList = pokedex['pokemon_entries'];

    for (let i = 0; i < pokemonList.length; i++) {
        let pokemon = pokemonList[i]['pokemon_species'];
        let name = pokemon['name'];

        namefomat = name[0].toUpperCase() + name.slice(1).toLowerCase();

        await loadPokemon(name);
        renderHtml(i, namefomat);
        renderHtmlgeneralClass(i);
        checkClass(i);
        loadImg(i, currentPokemon);
    }
}

function loadImg(i, currentPokemon){
    document.getElementById('pokedexGeneralImg-' + i).src = currentPokemon['sprites']['other']['dream_world']['front_default'];

}

function renderHtml(i, namefomat) {
    document.getElementById('pokedexGeneralList').innerHTML += `
    <div id="pokemonGeneral${i}" class="pokemonGeneral">
        <div class="pokedexGeneralName">
            <h3>${namefomat}</h3>
        </div>
        <div class="listbottom">
            <div id="generalClass${i}"></div>
            <div><img class="listimg" id="pokedexGeneralImg-${i}"></div>
        </div>
    </div>`;
}

function renderHtmlgeneralClass(i){
    types = currentPokemon['types']

    for (let j = 0; j < types.length; j++) {
        let sort = types[j]['type']['name'];

        sortformat = sort[0].toUpperCase() + sort.slice(1).toLowerCase();

        if (document.getElementById(`generalClass${i}`).innerHTML == 0) {
            document.getElementById(`generalClass${i}`).innerHTML += `<div class="sort" id="sort${i}">${sortformat}</div>`
        } else {
            document.getElementById(`generalClass${i}`).innerHTML += `<div class="sort">${sortformat}</div>`
        }
    } 
}

function checkClass(i) {
    let typclass = document.getElementById(`sort${i}`).innerHTML;
    let backgroundColor = document.getElementById(`pokemonGeneral${i}`);

    if (typclass == 'Grass') {
        backgroundColor.style.backgroundColor = "#7fdd6d";
    } else if (typclass == 'Fire') {
        backgroundColor.style.backgroundColor = "#ff5f6e";
    } else if (typclass == 'Water') {
        backgroundColor.style.backgroundColor = "#2d97eb";
    } else if (typclass == 'Normal') {
        backgroundColor.style.backgroundColor = "#9e9ca0";
    } else if (typclass == 'Electric') {
        backgroundColor.style.backgroundColor = "#e2c700";
    } else if (typclass == 'Bug') {
        backgroundColor.style.backgroundColor = "#a25757";
    } else if (typclass == 'Poison') {
        backgroundColor.style.backgroundColor = "#ffae03";
    } else if (typclass == 'Ground') {
        backgroundColor.style.backgroundColor = "#743b3b";
    } else if (typclass == 'Fairy') {
        backgroundColor.style.backgroundColor = "#9147bb";
    } else if (typclass == 'Fighting') {
        backgroundColor.style.backgroundColor = "#eb3434";
    } else if (typclass == 'Psychic') {
        backgroundColor.style.backgroundColor = "#7c1457";
    } else if (typclass == 'Rock') {
        backgroundColor.style.backgroundColor = "#7c1457";
    } else if (typclass == 'Ghost') {
        backgroundColor.style.backgroundColor = "#194600";
    } else if (typclass == 'Ice') {
        backgroundColor.style.backgroundColor = "#2accc6";
    } else if (typclass == 'Dragon') {
        backgroundColor.style.backgroundColor = "#836312";
    }
}
