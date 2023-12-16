const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";


let currentPokemon;
let score = 0;
//sprites.other.dream_world.front_default
function fetchPokemonData(pokemonId) {
  fetch(pokemonAPI + pokemonId)
    .then((response) => response.json())
    .then((data) => {
      currentPokemon = data;
      displayPokemon(data);
    })
    .catch((error) => console.log("Error fetching data:", error));
}

function displayPokemon(pokemon) {
  // console.log(pokemon.types[0].type.name, 'pokiieee')
  console.log(pokemon.game_indices, "pokiieee");
  const options = [pokemon.name];
  console.log(options, "opttt");
  while (options.length < 4) {
    const randomId = Math.floor(Math.random() * 150) + 1;
    if (!options.includes(randomId)) {
      options.push(randomId);
    }
  }
  shuffleArray(options);
  console.log(options, "22222");

  // Displaying options and resetting button colors
  for (let i = 0; i < options.length; i++) {
    const optionBtn = document.getElementById(`option${i + 1}`);
    optionBtn.textContent =
      options[i] instanceof Number ? options[i].name : options[i];
    optionBtn.style.backgroundColor = "";
  }

  const pokemonImage = document.getElementById("pokemon-image");
  pokemonImage.src = pokemon.sprites.other.dream_world.front_default;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkAnswer(option) {
  const selectedName = option.textContent;
  if (selectedName === currentPokemon.name) {
    score++;
    const resultElementCorrect = document.getElementById("result");
    resultElementCorrect.textContent = "Correct answer!";
    resultElementCorrect.style.color = "green";
  } else {
    const resultElementWrong = document.getElementById("result");
    resultElementWrong.textContent = "Wrong answer!";
    resultElementWrong.style.color = "red";
  }
  setTimeout(() => {
    fetchNextPokemon();
  }, 2000);
}

function fetchNextPokemon() {
  scoreElement.textContent = `Score: ${score}`;
  fetchPokemonData(Math.floor(Math.random() * 150) + 1);
}

fetchNextPokemon();
