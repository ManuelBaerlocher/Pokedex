let pokedex
let currentPokemon;


async function loadPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log(currentPokemon);

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


        await loadPokemon(name);



        /*let name = newtest['name']*/


        /*console.log(newtest);*/

        document.getElementById('pokedexGeneralList').innerHTML += `
        <div class="pokemonGeneral">
            <div class="pokedexGeneralName">
                <h3>${name}</h3>
            </div>
            <div class="listbottom">
                <div>
                    <div>Klasse 1</div>
                    <div>Klasse 2</div>
                </div>
            
                <div>
                    <img class="listimg" id="pokedexGeneralImg-${i}">
                </div>
            </div>
            
        </div>
        `;

        document.getElementById('pokedexGeneralImg-' + i).src = currentPokemon['sprites']['other']['dream_world']['front_default'];

    }
}