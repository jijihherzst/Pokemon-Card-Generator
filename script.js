const card = document.querySelector('.card');
const front = document.querySelector('.front');
card.addEventListener('click', () => {
  card.classList.toggle('flip');
});

async function fetchData(pokemonName) {
  try {
    const responce = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const data = await responce.json();
    console.log(data);
  } catch (error) {
    console.log('ERROR: ', error);
  }
}
fetchData('charizard');
