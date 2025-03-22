import {updateScore} from "../Javascript/database.js";

let timer; // Variable para guardar el temporizador
let tiempoRestante = 120; // Tiempo en segundos (2 minutos)
let progresoBarra; // Referencia a la barra de progreso
let inputsDescifrado; // Para los inputs de descifrado
let audioUltimos10Segundos; // Audio para los últimos 10 segundos
let audioFinTiempo; // Audio para el fin del tiempo
let audioCorrecto; // Audio para el mensaje correcto
let puntaje = 0; // Puntaje del jugador

const mensajeCorrecto = "PROTEJAALASPERSONASDEFIENDALOSDATOS"; // Mensaje correcto

// Cargar los audios
function cargarAudios() {
    audioUltimos10Segundos = new Audio('../audio/tiempo.mp3');
    audioFinTiempo = new Audio('../audio/incorrecto.mp3');
    audioCorrecto = new Audio('../audio/correcto.mp3'); // Cargar el audio de "correcto"
    audioUltimos10Segundos.loop = true; // Configurar el audio para que sea en loop
}

window.iniciarCifrado = function() {
    // Cargar los audios
    cargarAudios();

    // Ocultar el contenedor de instrucciones
    document.getElementById('instrucciones-container').style.display = 'none';
    
    // Mostrar el contenedor del juego
    const juegoContainer = document.getElementById('juego-container');
    juegoContainer.style.display = 'flex';

    // Iniciar el temporizador
    tiempoRestante = 120; // Resetear el tiempo a 120 segundos (2 minutos)
    actualizarTiempo();

    // Obtener los inputs
    inputsDescifrado = document.querySelectorAll(".input-descifrado");

    // Iniciar el temporizador
    timer = setInterval(function() {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            actualizarTiempo();
    
            // Reproducir audio en loop durante los últimos 10 segundos
            if (tiempoRestante <= 10 && !audioUltimos10Segundos.playing) {
                audioUltimos10Segundos.play(); // Reproducir el audio de los últimos 10 segundos
            }
        } else {
            // Cuando el tiempo llegue a 0, detener el temporizador
            clearInterval(timer);
    
            // Pausar el audio de los últimos 10 segundos
            audioUltimos10Segundos.pause();
            audioUltimos10Segundos.currentTime = 0; // Resetear el tiempo del audio
    
            // Reproducir audio de fin de tiempo
            audioFinTiempo.play();
    
            // Mostrar el mensaje de "Tiempo Finalizado"
            mostrarMensajeFinalizado();
    
            // Cambiar el fondo de los inputs
            cambiarFondoInputs();
    
            // Esperar 1 segundo y luego mostrar el puntaje de 0
            setTimeout(function() {
                mostrarPantallaPuntaje(0); // Puntaje en 0
            }, 1000); // Actualizar cada 1 segundo
        }
    }, 1000); // <-- Cierre correcto de setInterval
    
    console.log("Iniciando juego de Cifrado...");}
    

// Función para actualizar el tiempo en el span y la barra de progreso
function actualizarTiempo() {
    // Calcular minutos y segundos
    const minutos = Math.floor(tiempoRestante / 60); // Obtener minutos
    const segundos = tiempoRestante % 60; // Obtener segundos

    // Formatear el tiempo para mostrarlo como MM:SS (minutos:segundos)
    const tiempoFormateado = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    // Actualizar el span con el tiempo formateado
    const tiempoSpan = document.getElementById('tiempo-restante');
    tiempoSpan.textContent = tiempoFormateado;

    // Actualizar la barra de progreso
    progresoBarra = document.querySelector('.progreso');
    const porcentaje = (tiempoRestante / 120) * 100; // Calcular el porcentaje
    progresoBarra.style.width = `${porcentaje}%`;
}

// Mostrar mensaje de tiempo finalizado
function mostrarMensajeFinalizado() {
    const mensajeFinalizado = document.getElementById('mensaje-finalizado');
    const botonVerificar = document.querySelector('.boton-verificar');

    // Mostrar el mensaje de "Tiempo Finalizado"
    mensajeFinalizado.style.display = 'block';

    // Ocultar el botón de verificación
    if (botonVerificar) {
        botonVerificar.style.display = 'none';
    }

    // Aplicar los estilos de fondo en los inputs
    cambiarFondoInputs();
}

// Cambiar el fondo de los inputs cuando el tiempo termine
function cambiarFondoInputs() {
    inputsDescifrado.forEach(input => {
        input.style.backgroundImage = 'linear-gradient(to bottom, #d9534f, #b52b27)';
        input.style.color = ' #ffffff';
    });
}

// Función para verificar el mensaje descifrado
// Función para verificar el mensaje del jugador
window.verificarCifrado = function() {
    const inputsDescifrado = document.querySelectorAll(".input-descifrado");
    let mensajeIngresado = "";

    // Concatenamos los valores de todos los inputs
    inputsDescifrado.forEach(input => {
        mensajeIngresado += input.value.toUpperCase(); // Asegurarnos de que está en mayúsculas
    });

    // El mensaje correcto a descifrar
    const mensajeCorrecto = "PROTEJAALASPERSONASDEFIENDALOSDATOS";

    // Verificar si el mensaje es correcto
    if (mensajeIngresado === mensajeCorrecto) {
        // Mostrar el mensaje de éxito en la consola
        console.log("¡Mensaje Correcto! Has ganado " + (150 + tiempoRestante) + " puntos.");

        // Reproducir el audio de "correcto"
        audioCorrecto.play();

        // Pausar el tiempo
        clearInterval(timer);
        
        // Mostrar el puntaje
        const puntajeFinal = 150 + tiempoRestante;
        console.log("Puntaje total: " + puntajeFinal);

        // Ocultar el contenedor del juego
        document.getElementById('juego-container').style.display = 'none';

        // Mostrar el contenedor de puntaje
        const puntajeContainer = document.getElementById('puntaje-container');
        puntajeContainer.style.display = 'flex';

        // Mostrar el puntaje final en el contenedor
        const puntajeFinalElement = document.getElementById('puntaje-final');
        puntajeFinalElement.textContent = `${puntajeFinal}`;

        setTimeout(function() {
            mostrarPantallaPuntaje(puntajeFinal);
        }, 500);

    } else {
        console.log("Mensaje Incorrecto. Inténtalo de nuevo.");
        
        // Reproducir audio de error
        let audioError = new Audio('../audio/incorrecto.mp3'); // Reemplaza con el nombre correcto
        audioError.play();

        // Aplicar efecto de error en los inputs
        inputsDescifrado.forEach(input => {
            input.style.backgroundImage = 'linear-gradient(to bottom, #d9534f, #b52b27)';
            input.style.color = '#ffffff';
            input.classList.add('shake'); // Agregar animación

            // Borrar el contenido después de 1 segundo
            setTimeout(() => {
                input.value = ""; // Vaciar input
                input.style.backgroundImage = ''; // Quitar fondo rojo
                input.style.color = ''; // Restaurar color
                input.classList.remove('shake'); // Quitar animación
            }, 1000);
        });
    }
}



// Función para mostrar el puntaje
function mostrarPuntaje(puntaje) {
    const mensajePuntaje = document.getElementById('mensaje-puntaje');
    mensajePuntaje.style.display = 'block';
    mensajePuntaje.textContent = `${puntaje}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const inputsDescifrado = document.querySelectorAll(".input-descifrado");

    inputsDescifrado.forEach(input => {
        input.addEventListener("input", function () {
            // Solo permite una letra
            this.value = this.value.replace(/[^A-Za-z]/g, "").toUpperCase();

            // Si el usuario ingresa más de una letra, se toma solo la primera
            if (this.value.length > 1) {
                this.value = this.value.charAt(0);
            }

            // Mover automáticamente al siguiente input
            let nextInput = this.nextElementSibling;
            if (nextInput && this.value !== "") {
                nextInput.focus();
            }
        });

        // Evita que se puedan borrar los espacios en blanco (inputs transparentes)
        input.addEventListener("keydown", function (event) {
            if (event.key === "Backspace" && this.value === "") {
                let prevInput = this.previousElementSibling;
                if (prevInput) {
                    prevInput.focus();
                }
            }
        });
    });

    // Evento para verificar el mensaje cuando se haga click en el botón
    const botonVerificar = document.querySelector('.boton-verificar');
    if (botonVerificar) {
        botonVerificar.addEventListener('click', verificarCifrado);
    }
});


function mostrarPantallaPuntaje(puntaje) {
    // Ocultar el contenedor del juego
    document.getElementById('juego-container').style.display = 'none';

    // Mostrar el contenedor de puntaje
    const puntajeContainer = document.getElementById('puntaje-container');
    puntajeContainer.style.display = 'flex';

    // Mostrar el puntaje final en el contenedor
    const puntajeFinalElement = document.getElementById('puntaje-final');
    puntajeFinalElement.textContent = `${puntaje}`;
}
window.continuar = function() {
  window.location = "ranking.html";
  updateScore(localStorage.getItem("userName"), '03', puntaje);
  
}