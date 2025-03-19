let preguntas = [
    {
        imagen: "../images/Pregunta01.png",
        texto: "¿Quién es el empleado más mencionado en los ejemplos de Proofpoint?",
        opciones: [
            { texto: "Bobbi", correcta: true },
            { texto: "Diego", correcta: false },
            { texto: "Güey", correcta: false },
            { texto: "Mariana", correcta: false },
            { texto: "Mateo", correcta: true }
        ]
    },
    {
        imagen: "../images/Pregunta02.png",
        texto: "¿Cuál es el enfoque de Proofpoint?",
        opciones: [
            { texto: "Seguridad de red de próxima generación", correcta: false },
            { texto: "Seguridad centrada en las personas", correcta: false },
            { texto: "Seguridad de identidades", correcta: false },
            { texto: "Seguridad de puntos finales y la nube", correcta: true }
        ]
    },
    {
        imagen: "../images/Pregunta03.png",
        texto: "¿Qué soluciones tiene Proofpoint para proteger los correos electrónicos?",
        opciones: [
            { texto: "Solución basada en un Secure Email Gateway", correcta: false },
            { texto: "Solución basada en APIs", correcta: true },
            { texto: "Proofpoint ofrece las dos opciones", correcta: false },
            { texto: "Proofpoint no ofrece nada en el área de protección de correos electónicos", correcta: false }
        ]
    },
    {
        imagen: "../images/Pregunta04.png",
        texto: "¿Donde Proofpoint proteje los datos sensibles?",
        opciones: [
            { texto: "Saliendo por correo electrónico, los portátiles y la red", correcta: false },
            { texto: "Saliendo por sistemas de sonido", correcta: false },
            { texto: "Todavía dentro de la organización", correcta: false },
            { texto: "Respuesta A, B y C", correcta: false },
            { texto: "Respuesta A y C", correcta: true }
        ]
    },
    // Agregar más preguntas aquí...
];

let indicePregunta = 0;
let puntajeTotal = 0;
let tiempoRestante = 10;
let temporizador;

// Cargar los audios
let audioFondo = new Audio("../audio/background.mp3"); // Audio de fondo
let audioAdvertencia = new Audio("../audio/tiempo.mp3");  
let audioTiempoAgotado = new Audio("../audio/incorrecto.mp3"); 
let audioCorrecto = new Audio("../audio/correcto.mp3");  
let audioIncorrecto = new Audio("../audio/incorrecto.mp3");

audioFondo.loop = true;

function iniciarTemporizador() {
    tiempoRestante = 10;
    actualizarTiempo();

    temporizador = setInterval(() => {
        tiempoRestante--;
        actualizarTiempo();

        // Cuando queden 5 segundos, reproducir advertencia (solo si no está sonando)
        if (tiempoRestante === 5) {
            audioAdvertencia.play();
        }

        // Si el tiempo llega a 0, detener la advertencia y reproducir el otro sonido
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            audioAdvertencia.pause();
            audioAdvertencia.currentTime = 0;
            audioTiempoAgotado.play(); // Sonido de tiempo agotado
            manejarRespuesta(false); // Cuenta como incorrecta si el tiempo se agota
        }
    }, 1000);
}

function actualizarTiempo() {
    document.getElementById("tiempo-restante").textContent = tiempoRestante;
    let porcentaje = (tiempoRestante / 10) * 100;
    document.querySelector(".progreso").style.width = porcentaje + "%";
}

function manejarRespuesta(esCorrecta) {
    clearInterval(temporizador); // Detener temporizador cuando se responde

    if (esCorrecta) {
        let puntosGanados = 15 + tiempoRestante;
        puntajeTotal += puntosGanados;
    }

    setTimeout(() => {
        indicePregunta++;
        if (indicePregunta < preguntas.length) {
            cargarPregunta();
        } else {
            mostrarPantallaFinal();
        }
    }, 2000);
}

function mostrarPantallaFinal() {
    sessionStorage.setItem("puntajeFinal", puntajeTotal);
    window.location.href = "trivia-final.html";
    audioFondo.pause(); // Detener el audio de fondo al terminar el juego
    audioFondo.currentTime = 0;
}



function cargarPregunta() {
    let pregunta = preguntas[indicePregunta];
    document.getElementById("imagen-pregunta").src = pregunta.imagen;
    document.getElementById("texto-pregunta").textContent = pregunta.texto;
    
    let opcionesDiv = document.querySelector(".opciones");
    opcionesDiv.innerHTML = "";

    pregunta.opciones.forEach((opcion) => {
        let div = document.createElement("div");
        div.className = "opcion";
        div.textContent = opcion.texto;
        div.onclick = () => seleccionarRespuesta(div, opcion.correcta);
        opcionesDiv.appendChild(div);
    });

    // Resetear tiempo
    tiempoRestante = 10;
    document.getElementById("tiempo-restante").textContent = tiempoRestante;

    // Reiniciar la barra de progreso inmediatamente
    let barraProgreso = document.querySelector(".progreso");
    barraProgreso.style.transition = "none"; // Desactivar la animación temporalmente
    barraProgreso.style.width = "100%"; // Llenar inmediatamente

    // Pequeño retraso para volver a activar la animación de reducción
    setTimeout(() => {
        barraProgreso.style.transition = "width 1s linear";
    }, 50);

    iniciarTemporizador(); // Iniciar temporizador al cargar la pregunta
}


function seleccionarRespuesta(elemento, esCorrecta) {
    clearInterval(temporizador); // Detener temporizador cuando se responde

    // Detener audio de advertencia en caso de que esté sonando
    audioAdvertencia.pause();
    audioAdvertencia.currentTime = 0;

    if (esCorrecta) {
        elemento.classList.add("correcta");
        elemento.textContent = "CORRECTO";
        audioCorrecto.play(); // Sonido de respuesta correcta
    } else {
        elemento.classList.add("incorrecta");
        elemento.textContent = "NO ES CORRECTO";
        audioIncorrecto.play(); // Sonido de respuesta incorrecta
    }

    manejarRespuesta(esCorrecta);
}




window.onload = function () {
    if (document.body.getAttribute("data-page") === "juego") {
        cargarPregunta();
        audioFondo.play(); // Iniciar audio de fondo al entrar al juego
    } else if (document.body.getAttribute("data-page") === "final") {
        let params = new URLSearchParams(window.location.search);
        let puntaje = params.get("puntaje") || 0;
        document.getElementById("puntaje-final").textContent = puntaje + " puntos";
        audioFondo.pause(); // Detener el audio de fondo al terminar el juego
        audioFondo.currentTime = 0;
    }
};

function iniciarTrivia() {
    window.location.href = "trivia-juego.html"; // Redirige a la pantalla de la trivia
}
