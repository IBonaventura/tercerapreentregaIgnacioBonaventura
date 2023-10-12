

const opciones = ['piedra', 'papel', 'tijeras'];
const botones = document.querySelectorAll('button');
const resultadoElement = document.getElementById('resultado');
const partidasJugadasElement = document.getElementById('partidasJugadas');
const partidasGanadasElement = document.getElementById('partidasGanadas');
const partidasPerdidasElement = document.getElementById('partidasPerdidas');

// Obtenemos las estadísticas desde Local Storage o inicializamos si es la primera vez
let estadisticas = JSON.parse(localStorage.getItem('estadisticas'));
if (!estadisticas) {
    estadisticas = {
        partidasJugadas: 0,
        partidasGanadas: 0,
        partidasPerdidas: 0
    };
}

// Actualizamos el DOM con las estadísticas actuales
actualizarEstadisticas();

botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        const eleccionUsuario = boton.id;
        const eleccionMaquina = opciones[Math.floor(Math.random() * 3)];
        const resultado = determinarResultado(eleccionUsuario, eleccionMaquina);

        // Actualizamos las estadísticas y el DOM
        actualizarEstadisticas(resultado);
        
        // Mostramos el resultado en el DOM
        resultadoElement.textContent = resultado;
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
    estadisticas.partidasJugadas++;
    if (resultado === "¡Ganaste!") {
        estadisticas.partidasGanadas++;
    } else if (resultado === "¡Perdiste!") {
        estadisticas.partidasPerdidas++;
    }
    
    // Actualizamos el DOM con las estadísticas actualizadas
    partidasJugadasElement.textContent = estadisticas.partidasJugadas;
    partidasGanadasElement.textContent = estadisticas.partidasGanadas;
    partidasPerdidasElement.textContent = estadisticas.partidasPerdidas;
    
    // Guardamos las estadísticas en Local Storage
    localStorage.setItem('estadisticas', JSON.stringify(estadisticas));
}
