// Juego Piedra, Papel, Tijeras
const opciones = ['piedra', 'papel', 'tijeras'];
const botonesPPT = document.querySelectorAll('#juegoPiedraPapelTijeras button');
const resultadoElement = document.getElementById('resultado');
const partidasJugadasElement = document.getElementById('partidasJugadas');
const partidasGanadasElement = document.getElementById('partidasGanadas');
const partidasPerdidasElement = document.getElementById('partidasPerdidas');

botonesPPT.forEach((boton) => {
    boton.addEventListener('click', () => {
        const eleccionUsuario = boton.id;
        const eleccionMaquina = opciones[Math.floor(Math.random() * 3)];
        const resultado = determinarResultado(eleccionUsuario, eleccionMaquina);

        // Mostramos el resultado en el DOM
        resultadoElement.textContent = resultado;

        // Actualizamos las estadísticas y el DOM
        actualizarEstadisticas(resultado);
    });
});

function determinarResultado(eleccionUsuario, eleccionMaquina) {
    if (eleccionUsuario === eleccionMaquina) {
        return "¡Es un empate!";
    } else if (
        (eleccionUsuario === 'piedra' && eleccionMaquina === 'tijeras') ||
        (eleccionUsuario === 'papel' && eleccionMaquina === 'piedra') ||
        (eleccionUsuario === 'tijeras' && eleccionMaquina === 'papel')
    ) {
        return "¡Ganaste!";
    } else {
        return "¡Perdiste!";
    }
}

function actualizarEstadisticas(resultado) {
    const estadisticas = {
        partidasJugadas: parseInt(partidasJugadasElement.textContent) + 1,
        partidasGanadas: parseInt(partidasGanadasElement.textContent),
        partidasPerdidas: parseInt(partidasPerdidasElement.textContent)
    };

    if (resultado === "¡Ganaste!") {
        estadisticas.partidasGanadas++;
    } else if (resultado === "¡Perdiste!") {
        estadisticas.partidasPerdidas++;
    }

    // Actualizamos el DOM con las estadísticas actualizadas
    partidasJugadasElement.textContent = estadisticas.partidasJugadas;
    partidasGanadasElement.textContent = estadisticas.partidasGanadas;
    partidasPerdidasElement.textContent = estadisticas.partidasPerdidas;
}

// Juego Adivina el Número
const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
let intentosRestantes = 3;

const juegoAdivinaNumero = document.getElementById('juegoAdivinaNumero');
const botonAdivina = document.getElementById('adivina');
const numeroUsuarioInput = document.getElementById('numeroUsuario');
const resultadoAdivina = document.getElementById('resultadoAdivina');
const intentosRestantesElement = document.getElementById('intentosRestantes');

botonAdivina.addEventListener('click', () => {
    const numeroUsuario = parseInt(numeroUsuarioInput.value);

    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 10) {
        resultadoAdivina.textContent = "Ingresa un número válido entre 1 y 10.";
        return;
    }

    if (numeroUsuario === numeroAleatorio) {
        resultadoAdivina.textContent = "¡Adivinaste el número!";
        resultadoAdivina.style.color = "green";
        botonAdivina.disabled = true;
    } else {
        intentosRestantes--;
        if (intentosRestantes === 0) {
            resultadoAdivina.textContent = `Perdiste. El número era ${numeroAleatorio}.`;
            resultadoAdivina.style.color = "red";
            botonAdivina.disabled = true;
        } else {
            resultadoAdivina.textContent = `Intenta de nuevo. Te quedan ${intentosRestantes} intentos.`;
        }
    }

    intentosRestantesElement.textContent = intentosRestantes;
});
