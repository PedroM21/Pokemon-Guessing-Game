const nameElement = document.getElementById('pokemonName');
const spriteElement = document.getElementById('pokemonSprite');
const hintFeedback = document.getElementById('feedback');
const feedbackElement = document.getElementById('feedback');
const guessBtn = document.getElementById('guess');
const lifeVisual = document.querySelectorAll('.life');
const scoreValue = document.getElementById('scoreValue');
let actualPokemonName = '';
let pokemonTypes = '';
let maxLife = 3;
let currentLife = maxLife;
let score = 0;
let guessCount = 0;
const maxGuessCount = 3;


const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        displayPokemon(data);
        displayHint(data);
    } catch(err) {
        console.log("Error fetching Pokemon data: ", err)
    }
}

function displayPokemon (data) {
    spriteElement.src = data.sprites.front_default; // gets the correct sprite of pokemon
    spriteElement.style.filter = "brightness(0)"; // Hides sprite

    actualPokemonName = data.species.name.toLowerCase(); // Sets pokemon name to actualPokemonName
    nameElement.textContent = "Who's That Pokemon?"
}

function displayHint (data) {
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', '); 
    pokemonTypes = types // Sets pokemon type to pokemonTypes
    hintFeedback.textContent = '';
}

function nextPokemon () {
    guessCount = 0; // reset guess count
    feedbackElement.textContent = ""; // reset feedback 
    document.getElementById("pokemonGuess").value = ""; // clear input feld

    guessBtn.textContent = "Guess"; // change next btn text back to guess
    const randomPkmnId = Math.floor(Math.random() * 1025) + 1; // Random pokemon id from 1-1025
    fetchPokemon(randomPkmnId); // fetch a new pokemon
}

function resetGame () {
    guessCount = 0; // reset guess count
    feedbackElement.textContent = ""; // reset feedback 
    document.getElementById("pokemonGuess").value = ""; // clear input feld
    guessBtn.textContent = "Guess"; // change next btn text back to guess
    lifeVisual.forEach(life => {
        life.classList.add('active')
        life.classList.remove('inactive')
    });
    currentLife = maxLife
    scoreValue.textContent = 0;
    score = 0;

    const randomPkmnId = Math.floor(Math.random() * 1025) + 1; // Random pokemon id from 1-1025
    fetchPokemon(randomPkmnId); // fetch a new pokemon
}

document.getElementById("guess").addEventListener("click", () => {
    const guessedPokemon = document.getElementById("pokemonGuess").value.trim().toLowerCase();

    if (guessedPokemon === actualPokemonName) {
        spriteElement.style.filter = "none"; // Removes filter to show the sprite
        feedbackElement.style.color = "green"; // Makes text green
        feedbackElement.textContent = "Correct!" // Displays text "Correct"
        nameElement.textContent = actualPokemonName; // Replaces "who's that pokemon?" with the actual name
        if (guessBtn.textContent === "Guess") {
            score++;
            scoreValue.textContent = score;
        }
        guessBtn.textContent = "Next"; // Changes guess btn text to next
        guessBtn.addEventListener("click", nextPokemon, { once: true }); // Calls next pokemon func if next btn is clicked
    } else {
        guessCount++;
        currentLife--;
        
        if (currentLife >= 0) {
            lifeVisual[currentLife].classList.remove('active');
            lifeVisual[currentLife].classList.add('inactive');
        }
        if (currentLife <= 0) {
            feedbackElement.style.color = "red";
            spriteElement.style.filter = "none"
            guessBtn.textContent = "Next";
            feedbackElement.textContent = "Game Over!"
            nameElement.textContent = actualPokemonName;
            guessBtn.textContent = "Reset";
            guessBtn.addEventListener("click", resetGame, { once: true });
        }
    }
});

document.getElementById("hint").addEventListener('click', () => {
    const hintFeedback = document.getElementById("feedback");
    hintFeedback.style.color = 'white';
    hintFeedback.textContent = pokemonTypes;
})

function game () {
    guessCount = 0;
    actualPokemonName = "";
    const randomPkmnId = Math.floor(Math.random() * 1025) + 1; // Random pokemon id from 1-1025
    fetchPokemon(randomPkmnId);
};

game();