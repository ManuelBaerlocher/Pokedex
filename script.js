let currentPokemon;
let pokemons;
let lengthGeneral = 26;
let a = 0;


async function loadPokedex() {
    await loadInternJson();
    loadGeneralPokemon();
}

async function loadInternJson() {
    let url = "pokemons.json";
    let response = await fetch(url);

    pokemons = await response.json();
}

async function loadPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
}

async function loadGeneralPokemon() {

    document.getElementById('pokedexGeneralList').innerHTML = '';

    for (a; a < lengthGeneral; a++) {
        let nameformat = pokemons[a];
        let name = nameformat.toLowerCase();

        await loadPokemon(name);
        renderHtml(a, nameformat);
        renderHtmlgeneralClass(a);
        checkClass(a);
        loadImg(a, currentPokemon);
    }
}

async function addGeneralPokemon() {

    for (a; a < lengthGeneral; a++) {
        let nameformat = pokemons[a];
        let name = nameformat.toLowerCase();

        await loadPokemon(name);
        renderHtml(a, nameformat);
        renderHtmlgeneralClass(a);
        checkClass(a);
        loadImg(a, currentPokemon);
    }
}


function scrollload() {
    let container = document.getElementById('pokedexGeneralList')

    let scrollHeight = container.scrollHeight
    let offsetHeight = container.offsetHeight
    let scrollTop = container.scrollTop

    let scrollBottom = scrollHeight - (offsetHeight + scrollTop)

    if (scrollBottom == 0) {
        if (lengthGeneral <= 125) {
            lengthGeneral += 26;
        } else {
            lengthGeneral = 151;
        }
        addGeneralPokemon();
    }
}

function loadImg(i, currentPokemon) {

    let pokemonimg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokedexGeneralImg-' + i).src = pokemonimg;
}

function renderHtml(i, nameformat) {
    document.getElementById('pokedexGeneralList').innerHTML += `
    <div onclick="loadSingleView(${i})" id="pokemonGeneral${i}" class="pokemonGeneral">
        <div class="pokedexGeneralName">
            <h3>${nameformat}</h3>
        </div>
        <div class="listbottom">
            <div id="generalClass${i}"></div>
            <div><img class="listimg" id="pokedexGeneralImg-${i}"></div>
        </div>
    </div>`;
}

function renderHtmlgeneralClass(i) {
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

    backgroundColor.style.backgroundColor = getColorForClass(typclass);
}



function getColorForClass(typclass) {
    switch (typclass) {
        case 'Grass':
            return '#7fdd6d';
        case 'Fire':
            return '#ff5f6e';
        case 'Water':
            return '#2d97eb';
        case 'Normal':
            return '#9e9ca0';
        case 'Electric':
            return '#e2c700';
        case 'Bug':
            return '#a25757';
        case 'Poison':
            return '#ffae03';
        case 'Ground':
            return '#743b3b';
        case 'Fairy':
            return '#9147bb';
        case 'Fighting':
            return '#eb3434';
        case 'Psychic':
            return '#eb3434';
        case 'Rock':
            return '#7c1457';
        case 'Ghost':
            return '#194600';
        case 'Ice':
            return '#194600';
        case 'Dragon':
            return '#836312';
    }
}


async function loadSingleView(i) {
    let name = pokemons[i].toLowerCase();

    changeClasslist();
    await loadPokemon(name);
    renderHtmlSingleName(name);
    renderHtmlSingleClass();
    checkSingleClass();
    renderHtmlSingleImg();


}

function changeClasslist() {
    document.getElementById('pokedexSingleView').classList.remove('d-none');
    document.getElementById('infoSingleView').classList.remove('d-none');
    document.getElementById('pokedexGeneralView').classList.add('d-none');
}

function renderHtmlSingleName(name) {
    let nameformat = name[0].toUpperCase() + name.slice(1).toLowerCase();

    document.getElementById('pokemonName').innerHTML = nameformat;
}

function renderHtmlSingleImg() {
    let pokemonimg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonImg').src = pokemonimg;

}

function renderHtmlSingleClass() {
    types = currentPokemon['types'];

    document.getElementById(`pokemonSort`).innerHTML = '';

    for (let j = 0; j < types.length; j++) {
        let sort = types[j]['type']['name'];

        sortformat = sort[0].toUpperCase() + sort.slice(1).toLowerCase();

        if (document.getElementById(`pokemonSort`).innerHTML == 0) {
            document.getElementById(`pokemonSort`).innerHTML += `<div class="sort" id="singleSort">${sortformat}</div>`
        } else {
            document.getElementById(`pokemonSort`).innerHTML += `<div class="sort">${sortformat}</div>`
        }
    }
}

function checkSingleClass() {
    let typclass = document.getElementById('singleSort').innerHTML;
    let backgroundColor = document.getElementById('pokedexContainer');

    backgroundColor.style.backgroundColor = getColorForClass(typclass);
}


function loadGeneralView() {
    document.getElementById('pokedexSingleView').classList.add('d-none');
    document.getElementById('infoSingleView').classList.add('d-none');

    document.getElementById('pokedexGeneralView').classList.remove('d-none');
}

/*async function searchPokemon() {

    let searchinput = document.getElementById('searchInput').value;
    searchinput = searchinput.toLowerCase();

    document.getElementById('pokedexGeneralList').innerHTML = '';


    for (let i = 0; i < pokemons.length; i++) {
        let name = pokemons[i];

        if (name.toLowerCase().includes(searchinput)) {
            nameformat = name[0].toUpperCase() + name.slice(1).toLowerCase();
            nameklein = name.toLowerCase()
            console.log(name)
            await loadPokemon(nameklein);

            await renderHtml(i, nameformat);
            /*await loadImg(i, nameklein);
            await renderHtmlSearchSort(i);
            /*checkClass(i);
        }
    }




}

function renderHtmlSearchImg(i) {
    let pokemonimg = pokemons[i]['img'];

    document.getElementById('pokedexGeneralImg-' + i).src = pokemonimg;
}

function renderHtmlSearchSort(i) {
    let pokemonsort = pokemons[i]['sort']

    /*for (let j = 0; j < pokemonsort.length; j++) {
        let sort = pokemons[i]['sort'][j];


        if (document.getElementById(`generalClass${i}`).innerHTML == 0) {
            document.getElementById(`generalClass${i}`).innerHTML += `<div class="sort" id="sort${i}">${sort}</div>`
        } else {
            document.getElementById(`generalClass${i}`).innerHTML += `<div class="sort">${sort}</div>`
        }
    }

}*/