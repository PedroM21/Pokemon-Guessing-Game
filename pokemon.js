let actualPokemonName = "";
let guessCount = 0;
const maxGuessCount = 3;

const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json();
        displayPokemon(data);
    } catch(err) {
        console.log("Error fetching Pokemon data: ", err)
    }
}

const displayPokemon = (data) => {
    const spriteElement = document.getElementById("pokemonSprite");
    const nameElement = document.getElementById("pokemonName");

    spriteElement.src = data.sprites.front_default; // gets the correct sprite of pokemon
    spriteElement.style.filter = "brightness(0)"; // Hides sprite

    actualPokemonName = data.species.name.toLowerCase(); // Sets pokemon name to var
    nameElement.textContent = "Who's That Pokemon?"
}

document.getElementById("guess").addEventListener("click", () => {
    const nameElement = document.getElementById("pokemonName");
    const spriteElement = document.getElementById("pokemonSprite");
    const guessedPokemon = document.getElementById("pokemonGuess").value.trim().toLowerCase();
    const feedbackElement = document.getElementById("feedback")
    const guessBtn = document.getElementById("guess")

    if (guessedPokemon === actualPokemonName) {
        spriteElement.style.filter = "none"; // Removes filter to show the sprite
        feedbackElement.style.color = "green"; // Makes text green
        feedbackElement.textContent = "Correct!" // Displays text "Correct"
        nameElement.textContent = actualPokemonName; // Replaces "who's that pokemon?" with the actual name
        
        guessBtn.textContent = "Next"; // Changes guess btn text to next
        guessBtn.addEventListener("click", nextPokemon, { once: true }); // Calls next pokemon func if next btn is clicked
    } else {
        guessCount++;
        if (guessCount < maxGuessCount) {
            feedbackElement.style.color = "orange";
            feedbackElement.textContent = "Try Again!"
        } else {
            feedbackElement.style.color = "red";
            spriteElement.style.filter = "none"
            guessBtn.textContent = "Next";
            guessBtn.addEventListener("click", nextPokemon, { once: true });
        }
    }
});

const nextPokemon = () => {
    const guessBtn = document.getElementById("guess")
    const feedbackElement = document.getElementById("feedback")

    guessCount = 0; // reset guess count
    feedbackElement.textContent = ""; // reset feedback 
    document.getElementById("pokemonGuess").value = ""; // clear input feld

    guessBtn.textContent = "Guess"; // change next btn text back to guess
    const randomPkmnId = Math.floor(Math.random() * 1025) + 1; // Random pokemon id from 1-1025
    fetchPokemon(randomPkmnId); // fetch a new pokemon
};

const game = () => {
    guessCount = 0;
    actualPokemonName = "";
    const randomPkmnId = Math.floor(Math.random() * 1025) + 1; // Random pokemon id from 1-1025
    fetchPokemon(randomPkmnId);
};

game();