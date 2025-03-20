let amenazasEliminadas = 0;  // Contador de amenazas eliminadas
let puntaje = 0;             // Puntaje del jugador
let tiempoRestante = 30;     // Tiempo de juego en segundos
let intervaloTiempo;         // Variable para el temporizador

// Inicialización de variables para los audios
const audioPositivo = new Audio('../audio/incorrecto.mp3');
const audioNegativo = new Audio('../audio/correcto.mp3');

// Imágenes de elementos positivos y amenazas
const imagenesPositivas = [
    '../images/Good01.png',
    '../images/Good02.png',
    '../images/Good03.png',
    '../images/Good04.png',
    '../images/Good05.png',
    '../images/Good06.png',
    '../images/Good07.png',
    '../images/Good08.png',
    '../images/Good09.png'
];

const imagenesAmenazas = [
    '../images/Bad01.png',
    '../images/Bad02.png',
    '../images/Bad03.png',
    '../images/Bad04.png',
    '../images/Bad05.png'
];

// Función para iniciar el juego
function iniciarJuego() {
    // Rellenar la retícula con imágenes aleatorias
    let reticula = document.querySelector('.reticula');
    reticula.innerHTML = '';  // Limpiar la retícula

    let elementos = [];

    // Añadir 9 imágenes positivas
    for (let i = 0; i < 9; i++) {
        let img = document.createElement('img');
        img.src = imagenesPositivas[i];
        img.dataset.tipo = 'positivo';
        img.onclick = eliminarImagen;
        elementos.push(img);
    }

    // Añadir 16 imágenes de amenazas (pueden repetirse)
    for (let i = 0; i < 16; i++) {
        let img = document.createElement('img');
        img.src = imagenesAmenazas[Math.floor(Math.random() * imagenesAmenazas.length)];
        img.dataset.tipo = 'amenaza';
        img.onclick = eliminarImagen;
        elementos.push(img);
    }

    // Mezclar las imágenes para la retícula
    while (elementos.length > 0) {
        let index = Math.floor(Math.random() * elementos.length);
        reticula.appendChild(elementos[index]);
        elementos.splice(index, 1);
    }

    // Reiniciar el contador de amenazas eliminadas
    amenazasEliminadas = 0;

    // Iniciar el temporizador
    if (!intervaloTiempo) {
        intervaloTiempo = setInterval(actualizarTemporizador, 1000);
    }
}

// Función para actualizar el temporizador
function actualizarTemporizador() {
    if (tiempoRestante <= 0) {
        clearInterval(intervaloTiempo); // Detener el temporizador
        intervaloTiempo = null; // No reiniciar el intervalo
        desactivarImagenes();
        mostrarFinJuego(); // Mostrar mensaje en pantalla en lugar de alerta
        return;
    }
    document.getElementById('temporizador').innerText = tiempoRestante;
    tiempoRestante--;
}

// Función para desactivar las imágenes
function desactivarImagenes() {
    let imagenes = document.querySelectorAll('.reticula img');
    imagenes.forEach(img => {
        img.onclick = null; // Desactivar el evento 'onclick'
    });
}


// Función para eliminar una imagen
function eliminarImagen(event) {
    let img = event.target;

    if (img.dataset.tipo === 'amenaza') {
        // Eliminar amenaza
        img.classList.add('eliminado');
        puntaje += 5;
        amenazasEliminadas++;
        
        // Reproducir el audio negativo
        const audioNegativo = new Audio('../audio/correcto.mp3');
        audioNegativo.play();
    } else {
        // Eliminar positivo
        img.classList.add('eliminado');
        puntaje -= 10;
        
        // Reproducir el audio positivo
        const audioPositivo = new Audio('../audio/incorrecto.mp3');
        audioPositivo.play();
    }

    // Actualizar puntaje
    document.getElementById('puntaje').innerText = puntaje;

    // Verificar si todas las amenazas han sido eliminadas
    if (amenazasEliminadas === 16) {
        // Si eliminó las 16 amenazas, recargar la retícula
        if (tiempoRestante > 0) {
            iniciarJuego(); // Recargar la retícula, pero no reiniciar el tiempo
        }
    }
}


// Función para iniciar el juego cuando se haga clic en el botón
function iniciarAmenazas() {
    document.getElementById('instrucciones-container').style.display = 'none';
    document.getElementById('juego-container').style.display = 'flex'; // Cambiar flex si quieres mantener la alineación

    // Iniciar el juego y continuar desde el tiempo restante
    if (!intervaloTiempo) {
        intervaloTiempo = setInterval(actualizarTemporizador, 1000);  // Iniciar temporizador si no está en curso
    }

    iniciarJuego();  // Iniciar el juego

    console.log("¡Iniciando el minijuego Amenazas!");
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Clases iniciales de #juego-container:", document.getElementById('juego-container').classList);
    document.getElementById('juego-container').classList.add('oculto');
    console.log("Clases después de ocultar:", document.getElementById('juego-container').classList);
});


// Función para mostrar el mensaje final y ocultar el juego
function mostrarFinJuego() {
    console.log("Tiempo agotado - mostrando pantalla final");

    // Ocultar el contenedor del juego
    let juegoContainer = document.getElementById('juego-container');
    juegoContainer.style.display = 'none'; // Asegurar que desaparece completamente

    // Mostrar el contenedor final
    let finalContainer = document.getElementById('final-container');
    finalContainer.style.display = 'flex'; // Cambia a flex para mostrarlo correctamente

    // Mostrar el puntaje final
    document.getElementById('puntaje-final').innerText = puntaje;
}
