let simonSequence = []; // Almacena la secuencia ingresada por el jugador
let level = 0; // Contador del nivel actual
let playerSequence = []; // Nivel actual del jugador
const colors = ['red','blue','yellow','green','purple','pink','orange','cyan']

const statusText = document.getElementById("status");
const startButton = document.getElementById("start-button");
// Obtiene todos los botones de colores
const colorButtons = document.querySelectorAll(".color-button");

// Función para iniciar el juego
function startGame() {
    simonSequence = [];
    playerSequence = [];
    level = 0;
    statusText.textContent = "¡El juego ha comenzado!";
    nextRound();
}

// Función para el siguiente nivel
function nextRound() {
    level++;
    playerSequence = [];
    // Agrega un nuevo color aleatorio a la secuencia
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    simonSequence.push(randomColor);

    // Actualizar el estado
    statusText.textContent = `Nivel ${level}: Observa la secuencia.`;

    // Mostrar secuencia de Simon
    playSimonSequence();
}

// Mostrar la secuencia de Simon
function playSimonSequence() {
    simonSequence.forEach((color, index) => { // Resalta cada color de Simon basado en su posición
        setTimeout(() => {
            highlightColor(color); // Resalta el botón correspondiente
        }, index * 1000); //Incrementa el tiempo de retraso por cada color
    });

    // Habilitar interacción después de mostrar la secuencia
    setTimeout(() => {
        enablePlayerInput(); // Permite que el jugador haga clic en los botones
        statusText.textContent = "¡Tu turno! Repite la secuencia.";
    }, simonSequence.length * 1000); // Calcula el tiempo total necesario antes de habilitar la entrada

}

// Resalta un color
function highlightColor(color) {
    const button = document.getElementById(color);
    button.classList.add("active"); // Añade la clase "active" para resaltar el botón
    setTimeout(() => {
        button.classList.remove("active");
    }, 500); //Elimina el resaltado y la clase después de 500ms

}

// Habilitar la entrada del jugador
function enablePlayerInput() {
    colorButtons.forEach(button => {
        button.addEventListener("click", handlePlayerInput);
    });
}

// Deshabilitar la entrada del jugador
function disablePlayerInput() {
    colorButtons.forEach(button => {
        button.removeEventListener("click", handlePlayerInput);
    });
}

// Manejar la entrada del jugador
function handlePlayerInput(event) {
    const color = event.target.id; // Obtiene el id del botón clicado
    playerSequence.push(color); // Añade el color a la secuencia ingresada por el jugador
    highlightColor(color);
    checkPlayerInput();
}

// Verificar la entrada del jugador
function checkPlayerInput() {
    const currentIndex = playerSequence.length - 1; // Obtiene el índice actual del jugador


    if (playerSequence[currentIndex] !== simonSequence[currentIndex]) {
        statusText.textContent = "¡Incorrecto! Fin del juego.";
        disablePlayerInput();
        return; //Sale de la funcion
    }

    //Si lo hace correctamente

    if (playerSequence.length === simonSequence.length) {
        disablePlayerInput();
        statusText.textContent = "¡Correcto! Pasas al siguiente nivel.";
        setTimeout(nextRound, 1000); //Inicia la siguiente ronda
    }
}

// Iniciar el juego al presionar el botón
startButton.addEventListener("click", startGame);
