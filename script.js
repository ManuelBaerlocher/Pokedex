let currentPokemon;
let pokemons;
let lengthGeneral = 26;
let a = 0;
let typclassSingle;

//First String Size Big//
function FirstStringBig(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

//Load intern Json and Home Page//
async function loadPokedex() {
    await loadInternJson();
    loadGeneralPokemon();
}


//Load intern Json//
async function loadInternJson() {
    let url = "pokemons.json";
    let response = await fetch(url);

    pokemons = await response.json();
}

//Load Current Pokemon//
async function loadPokemon(name) {
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
}

//Load Home Page//
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

//add General Pokemon if scroll//
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

// scroll Function on General Side//
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


// load Img for Pokemon//
function loadImg(i, currentPokemon) {

    let pokemonimg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokedexGeneralImg-' + i).src = pokemonimg;
}


// fill Html Home Page//
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


//fill Class to the Pokemon//
function renderHtmlgeneralClass(i) {
    types = currentPokemon['types']

    for (let j = 0; j < types.length; j++) {
        let sort = types[j]['type']['name'];

        let generalClass = document.getElementById(`generalClass${i}`);

        if (generalClass.innerHTML == 0) {
            generalClass.innerHTML += `<div class="sort" id="sort${i}">${FirstStringBig(sort)}</div>`
        } else {
            generalClass.innerHTML += `<div class="sort">${FirstStringBig(sort)}</div>`
        }
    }
}


//Control the Class//
function checkClass(i) {
    let typclass = document.getElementById(`sort${i}`).innerHTML;
    let backgroundColor = document.getElementById(`pokemonGeneral${i}`);

    backgroundColor.style.backgroundColor = getColorForClass(typclass);
}

//define Color for Class//
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

//Load Single View//
async function loadSingleView(i) {
    let name = pokemons[i].toLowerCase();

    changeClasslist();
    await loadPokemon(name);
    renderHtmlSingleName(name);
    renderHtmlSingleClass();
    checkSingleClass();
    renderHtmlSingleImg();
    loadAboutPokemon();
    loadBaseStats();
    showAbout();

    typclass = document.getElementById(`singleSort`).innerHTML;
    document.getElementById('infoHeadAbout').style = `border-color: ${getColorForClass(typclassSingle)}`;

    changeColorSingleViewhaeder();


}

//Change Side for Singleview//
function changeClasslist() {
    document.getElementById('pokedexSingleView').classList.remove('d-none');
    document.getElementById('infoSingleView').classList.remove('d-none');
    document.getElementById('pokedexGeneralView').classList.add('d-none');
}

//Load Html Singleview//
function renderHtmlSingleName(name) {
    let nameformat = name[0].toUpperCase() + name.slice(1).toLowerCase();

    document.getElementById('pokemonName').innerHTML = nameformat;
}

//Load Singleimg Pokemon//
function renderHtmlSingleImg() {
    let pokemonimg = currentPokemon['sprites']['other']['dream_world']['front_default'];
    document.getElementById('pokemonImg').src = pokemonimg;

}


//Load SingleClass//
function renderHtmlSingleClass() {
    types = currentPokemon['types'];

    document.getElementById(`pokemonSort`).innerHTML = '';

    for (let j = 0; j < types.length; j++) {
        let sort = types[j]['type']['name'];

        let pokemonSort = document.getElementById(`pokemonSort`);

        if (pokemonSort.innerHTML == 0) {
            pokemonSort.innerHTML += `<div class="sort" id="singleSort">${FirstStringBig(sort)}</div>`
        } else {
            pokemonSort.innerHTML += `<div class="sort">${FirstStringBig(sort)}</div>`
        }
    }
}


//Change Color for Singleclass//
function checkSingleClass() {
    typclassSingle = document.getElementById('singleSort').innerHTML;
    let backgroundColor = document.getElementById('pokedexContainer');

    backgroundColor.style.backgroundColor = getColorForClass(typclassSingle);
    backgroundColor.style.height = '';

}

//Load General View//
function loadGeneralView() {
    let backgroundColor = document.getElementById('pokedexContainer');

    document.getElementById('pokedexSingleView').classList.add('d-none');
    document.getElementById('infoSingleView').classList.add('d-none');
    backgroundColor.style.height = '80%';

    document.getElementById('pokedexGeneralView').classList.remove('d-none');
}

//Show NavBar About//
function showAbout() {
    let infoHeadAbout = document.getElementById('infoHeadAbout');
    let infoHeadBaseStats = document.getElementById('infoHeadBaseStats');
    /*let infoHeadEvolution = document.getElementById('infoHeadEvolution');*/


    document.getElementById('infoAbout').classList.remove('d-none');
    infoHeadAbout.classList.add('info-head-select');
    document.getElementById('infoBaseStats').classList.add('d-none');
    infoHeadBaseStats.classList.remove('info-head-select');
    /*document.getElementById('infoEvolution').classList.add('d-none');
    infoHeadEvolution.classList.remove('info-head-select');*/

    infoHeadAbout.style = `border-color: ${getColorForClass(typclassSingle)}!important`;
    infoHeadBaseStats.style = '';
    /*infoHeadEvolution.style = '';*/
}

//Show BaseStats//
function showBaseStats() {
    let infoHeadAbout = document.getElementById('infoHeadAbout');
    let infoHeadBaseStats = document.getElementById('infoHeadBaseStats');
    /*let infoHeadEvolution = document.getElementById('infoHeadEvolution');*/


    document.getElementById('infoAbout').classList.add('d-none');
    infoHeadAbout.classList.remove('info-head-select');
    document.getElementById('infoBaseStats').classList.remove('d-none');
    infoHeadBaseStats.classList.add('info-head-select');
    /*document.getElementById('infoEvolution').classList.add('d-none');
    infoHeadEvolution.classList.remove('info-head-select');*/

    infoHeadAbout.style = '';
    infoHeadBaseStats.style = `border-color: ${getColorForClass(typclassSingle)}!important`;
    /*infoHeadEvolution.style = '';*/
}

/*function showEvolution() {
    let infoHeadAbout = document.getElementById('infoHeadAbout');
    let infoHeadBaseStats = document.getElementById('infoHeadBaseStats');
    /*let infoHeadEvolution = document.getElementById('infoHeadEvolution');

    document.getElementById('infoAbout').classList.add('d-none');
    infoHeadAbout.classList.remove('info-head-select');
    document.getElementById('infoBaseStats').classList.add('d-none');
    infoHeadBaseStats.classList.remove('info-head-select');
    /*document.getElementById('infoEvolution').classList.remove('d-none');
    infoHeadEvolution.classList.add('info-head-select');

    infoHeadAbout.style = '';
    infoHeadBaseStats.style = '';
    infoHeadEvolution.style = `border-color: ${getColorForClass(typclassSingle)}!important`;
}*/

// load About Single View//
function loadAboutPokemon() {
    loadAboutHeight();
    loadAboutWeight();
    loadAboutAbilities();
}

//load About height//
function loadAboutHeight() {
    let height = currentPokemon['height'];
    let heightcm = height * 10 + ' cm';

    document.getElementById('aboutHeight').innerHTML = heightcm;
}
//load About weight//
function loadAboutWeight() {
    let weight = currentPokemon['weight'];
    let weightkg = weight / 10 + ' kg';

    document.getElementById('aboutWeight').innerHTML = weightkg;
}

//load About Abilities//
function loadAboutAbilities() {
    let abilities = currentPokemon['abilities'];
    let container = document.getElementById('aboutAbilities');

    container.innerHTML = '';

    for (let i = 0; i < abilities.length; i++) {
        let abilitie = abilities[i]["ability"]["name"];

        if (container.innerHTML == 0) {
            container.innerHTML = FirstStringBig(abilitie);
        } else {
            container.innerHTML += ', ' + FirstStringBig(abilitie);
        }
    }
}

//load Base Stats//
function loadBaseStats() {
    let stats = currentPokemon['stats']
    let sum = 0


    for (let i = 0; i < stats.length; i++) {
        let stat = stats[i]["base_stat"];
        sum = sum + stat;

        document.getElementById(`baseStats${i}`).innerHTML = stat;
        changeProgressBar(i, stat);
    }
    renderBaseStatsTotal(sum);
}

// Change Progress Bar on Base Stats//
function changeProgressBar(i, stat) {
    document.getElementById(`baseStatsPb${i}`).style.width = stat + '%';
    document.getElementById(`baseStatsPb${i}`).style.backgroundColor = colorProgressBar(stat);
}
// Change Color Progress Bar on Base Stats//
function colorProgressBar(stat) {
    if (stat <= 33) {
        return 'red';
    } else if (stat <= 66) {
        return 'orange';
    } else if (stat <= 99) {
        return 'green';
    } else {
        return 'gold';
    }
}

// calculate Basestats Total//
function renderBaseStatsTotal(sum) {
    document.getElementById('baseStatsTotal').innerHTML = sum;
    changeProgressBarTotal(sum);
}
// Change Progress Bar Total//
function changeProgressBarTotal(sum) {
    let baseStatsPbTotal = document.getElementById(`baseStatsPbTotal`);
    let precent = 100 / 600 * sum;

    baseStatsPbTotal.style.width = precent + '%';
    baseStatsPbTotal.style.backgroundColor = colorProgressBarTotal(sum);
}

//Change Color Progress Bar Total//
function colorProgressBarTotal(sum) {
    if (sum <= 200) {
        return 'red';
    } else if (sum <= 400) {
        return 'orange';
    } else if (sum <= 599) {
        return 'green';
    } else {
        return 'gold';
    }
}

//Search Pokemon//
async function searchPokemon() {

    let searchinput = document.getElementById('searchInput').value;
    searchinput = searchinput.toLowerCase();

    document.getElementById('pokedexGeneralList').innerHTML = '';

    if (searchinput == '') {
        lengthGeneral = 26;
        a = 0;

        await loadGeneralPokemon();
    } else {

        lengthGeneral = 151;
        a = 151;

        for (let i = 0; i < pokemons.length; i++) {
            let name = pokemons[i];

            if (name.toLowerCase().includes(searchinput)) {

                nameshort = name.toLowerCase()

                await loadPokemon(nameshort);
                await renderHtml(i, FirstStringBig(name));
                loadImg(i, currentPokemon)
                renderHtmlgeneralClass(i);
                checkClass(i);
            }

        }
    }

}

//Change Singleview Color on hover(Nav-Bar)//
function changeColorSingleViewhaeder() {
    let css = `.info-head p:hover{     border-color: ${getColorForClass(typclassSingle)}; }`;
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementById('infoHeadBaseStats').appendChild(style);
}



