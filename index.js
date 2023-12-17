// Define the PokeAPI URL and base image URL
const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";

// Get result elements by their IDs
const resultElementCorrect = document.getElementById("result");
const resultElementWrong = document.getElementById("result");

// Initialize variables
let currentPokemon;
let score = 0;

// Fetch Pokemon data from the PokeAPI
function fetchPokemonData(pokemonId) {
  fetch(pokemonAPI + pokemonId)
    .then((response) => response.json())
    .then((data) => {
      currentPokemon = data;
      displayPokemon(data);
    })
    .catch((error) => console.log("Error fetching data:", error));
}

// Display Pokemon and render answer options
function displayPokemon(pokemon) {
  // Create an array to store Pokemon names
  const options = [pokemon.name];

  // Generate three more random Pokemon IDs as options
  while (options.length < 4) {
    const randomId = Math.floor(Math.random() * 150) + 1;
    if (!options.includes(randomId)) {
      options.push(randomId);
    }
  }

  // Fetch names for each Pokemon ID
  Promise.all(
    options.map((id) =>
      fetch(pokemonAPI + id)
        .then((response) => response.json())
        .then((data) => data.name)
    )
  )
    .then((pokemonNames) => {
      shuffleArray(pokemonNames); // Shuffle the Pokemon names
      renderOptions(pokemonNames); // Render the shuffled options
    })
    .catch((error) => console.error("Error fetching Pokemon data:", error));

  // Display the image of the Pokemon
  const pokemonImage = document.getElementById("pokemon-image");
  pokemonImage.src = pokemon.sprites.other.dream_world.front_default;
}

// Render options with shuffled Pokemon names
function renderOptions(pokemonNames) {
  for (let i = 0; i < pokemonNames.length; i++) {
    const optionBtn = document.getElementById(`option${i + 1}`);
    optionBtn.textContent = pokemonNames[i];
    optionBtn.style.backgroundColor = ""; // Reset button colors
  }
}

// Shuffle array elements (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Check user-selected answer and update score
function checkAnswer(option) {
  const selectedName = option.textContent;
  if (selectedName === currentPokemon.name) {
    score++;
    resultElementCorrect.textContent = "Correct answer!";
    resultElementCorrect.style.color = "#31A335";
    option.style.backgroundColor = "#31A335"; // Highlight correct answer
  } else {
    resultElementWrong.textContent = "Wrong answer!";
    resultElementWrong.style.color = "#D33838";
    option.style.backgroundColor = "#D33838"; // Highlight wrong answer
  }
  setTimeout(() => {
    fetchNextPokemon();
  }, 2000);
}

// Fetch data for the next Pokemon after a delay
function fetchNextPokemon() {
  scoreElement.textContent = `Points: ${score}`;
  resultElementWrong.textContent = "";
  resultElementCorrect.textContent = "";
  fetchPokemonData(Math.floor(Math.random() * 150) + 1);
}

// Initial fetch for the first Pokemon
fetchNextPokemon();
