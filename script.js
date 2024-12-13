const card = document.querySelector('.card');
const front = document.querySelector('.front');
const pokemonName = document.getElementById('pokemon-name');
const generate = document.getElementById('gen-btn');
card.addEventListener('click', () => {
  card.classList.toggle('flip');
});

async function fetchData(pokemonName) {
  try {
    const responce = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemon = await responce.json();

    const responce2 = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );
    const species = await responce2.json();
    // console.log(pokemon);
    // console.log(species);
    const root = document.documentElement;

    const pokeType = pokemon.types[0].type.name;
    if (pokeType === 'grass') {
      root.style.setProperty(
        '--background',
        'linear-gradient(0deg, rgba(17,139,80,1) 0%, rgba(251,246,233,1) 12%, rgba(227,240,175,1) 21%, rgba(93,185,150,1) 51%, rgba(242,249,255,1) 100%)'
      );
      root.style.setProperty('--text-color', 'red');
    } else if (pokeType === 'electric') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom, yellow,rgb(255, 247, 180))'
      );
    } else if (pokeType === 'fighting') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom, #FA812F, #D7B26D)'
      );
    } else if (pokeType === 'rock') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom, #B59F78, #A6AEBF)'
      );
    } else if (pokeType === 'water') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom,rgb(207, 236, 248), #7AB2D3)'
      );
    } else if (pokeType === 'steel') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom, #B7B7B7, #697565)'
      );
    } else if (pokeType === 'poison') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom, #8174A0, #EFB6C8)'
      );
    } else if (pokeType === 'normal') {
      root.style.setProperty(
        '--background',
        'linear-gradient(to bottom, #7F7C82,rgb(207, 207, 207))'
      );
    }

    const icon = pokeType + '.png';
    let evolveFrom;
    if (isPropertyNotEmpty(species.evolves_from_species, 'name')) {
      evolveFrom = species.evolves_from_species.name;
    } else {
      evolveFrom = 'nothing';
    }
    front.innerHTML = `
    <p class="evolves-from">Evolves from ${capitalizeFirst(evolveFrom)}</p>
          <div class="name">
            <h2 class="pokemon-name">${capitalizeFirst(pokemon.name)}</h2>
            <h2 class="pokemon-hp">
              ${pokemon.stats[0].base_stat} HP
              <img class="type-icon" src="public/types/${icon}" alt="type" />
            </h2>
          </div>
          <div class="pokemon-img">
            <img src="${
              pokemon.sprites.other['official-artwork'].front_default
            }" crossorigin="anonymous" alt="" />
          </div>
          <div class="size">
            <p>${capitalizeFirst(pokeType)} Pokemon. Length: ${
      pokemon.height
    }, Weight: ${pokemon.weight} lbs.</p>
          </div>
          <p class="description">
            <span class="blue"> Description: </span>
            ${species.flavor_text_entries[0].flavor_text}
          </p>
          <hr/>`;
    card.style.display = 'block';
  } catch (error) {
    console.log('ERROR: ', error);
  }
}
pokemonName.addEventListener('keydown', () => {
  if (event.key == 'Enter') {
    if (pokemonName.value) {
      fetchData(pokemonName.value.toLowerCase());
    } else {
      const p = document.getElementById('warning');
      p.innerHTML =
        "Please make sure the spelling is correct! <br/> If the name consist of two words add '-' between them!";
    }
  }
});
generate.addEventListener('click', () => {
  if (pokemonName.value) {
    fetchData(pokemonName.value.toLowerCase());
  } else {
    const p = document.getElementById('warning');
    p.innerHTML =
      "Please make sure the spelling is correct! <br/> If the name consist of two words add '-' between them!";
  }
});
function capitalizeFirst(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function isPropertyNotEmpty(obj, prop) {
  return (
    obj &&
    obj.hasOwnProperty(prop) &&
    obj[prop] !== undefined &&
    obj[prop] !== ''
  );
}
