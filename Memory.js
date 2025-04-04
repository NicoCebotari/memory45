//let sequencia = []; // Almacena la secuencia generada por el juego
let gameSequence = []; // Almacena la secuencia ingresada por el jugador
let level = 0; // Contador del nivel actual
let playerSequence = [];
const colors = ['red','blue','yellow','green','purple','pink','orange','black']


async function mostrar_colors(temps){
    for (let i=0;i<colors.length;i++){
        //TODO instruccions per mostrar el color. Per exemple

        //Crida al mètode esperar
        await esperar(temps);
        console.log(colors[Math.floor(Math.random() * 9)]);
    }
}
function esperar(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

mostrar_colors(500);

function Sequence(colors){
    level++
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);
    mostraSequencia();
    botons.style.opacity='0.5';
    document.getElementById("message").innerText = `Nivel ${level}`;

    // Reproducir secuencia
    let i = 0;
    const interval = setInterval(() => {
        flashColor(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) clearInterval(interval);
    }, 800);
}

function flashColor(color) {
    const button = document.getElementById(color);
    button.classList.add("active");
    setTimeout(() => {
        button.classList.remove("active");
    }, 500);
}




// Función para manejar el clic del jugador
function playerClick(color) {
    if (!playing) return;

    playerSequence.push(color);
    flashColor(color);

    // Verificar si el jugador sigue la secuencia correctamente
    const index = playerSequence.length - 1;
    if (playerSequence[index] !== gameSequence[index]) {
        document.getElementById("message").innerText = "¡Fallaste! Intenta de nuevo.";
        playing = false;
        return;
    }

    // Si completó la secuencia, añadir nuevo color
    if (playerSequence.length === gameSequence.length) {
        playerSequence = [];
        setTimeout(addNewColor, 1000);
    }
}

// Función para iniciar el juego
function Inciar() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    playing = true;
    document.getElementById("message").innerText = "¡Memoriza la secuencia!";
    addNewColor();
}

//Event Listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.querySelectorAll(".color-button").forEach(button => {
    button.addEventListener("click", () => playerClick(button.id));
});