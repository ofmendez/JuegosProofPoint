let preguntas = [
    {
        imagenFondo: "../images/Pregunta01.png",
        imagen: "../images/Pregunta01.png",
        texto: "¿Quién es el empleado más mencionado en los ejemplos de Proofpoint?",
        opciones: [
            { texto: "Bobbi", correcta: true },
            { texto: "Diego", correcta: false },
            { texto: "Güey", correcta: false },
            { texto: "Mariana", correcta: false },
            { texto: "Mateo", correcta: false }
        ]
    },
    {
        imagenFondo: "../images/Pregunta01.png",
        imagen: "../images/Pregunta02.png",
        texto: "¿Cuál es el enfoque de Proofpoint?",
        opciones: [
            { texto: "Seguridad de red de próxima generación", correcta: false },
            { texto: "Seguridad centrada en las personas", correcta: true },
            { texto: "Seguridad de identidades", correcta: false },
            { texto: "Seguridad de puntos finales y la nube", correcta: false }
        ]
    },
    {
        imagenFondo: "../images/Pregunta02.png",
        imagen: "../images/Pregunta03.png",
        texto: "¿Qué soluciones tiene Proofpoint para proteger los correos electrónicos?",
        opciones: [
            { texto: "Solución basada en un Secure Email Gateway", correcta: false },
            { texto: "Solución basada en APIs", correcta: false },
            { texto: "Proofpoint ofrece las dos opciones", correcta: true },
            { texto: "Proofpoint no ofrece nada en el área de protección de correos electrónicos", correcta: false }
        ]
    },
    {
        imagenFondo: "../images/Pregunta03.png",
        imagen: "../images/Pregunta04.png",
        texto: "¿Dónde Proofpoint proteje los datos sensibles?",
        opciones: [
            { texto: "Saliendo por correo electrónico, los portátiles y la red", correcta: false },
            { texto: "Saliendo por sistemas de sonido", correcta: false },
            { texto: "Todavía dentro de la organización", correcta: false },
            { texto: "Respuestas A, B y C", correcta: false },
            { texto: "Respuestas A y C", correcta: true }
        ]
    },
    // Agregar más preguntas aquí...
];



let indicePregunta = 0;
let puntajeTotal = 0;
let tiempoRestante = 30;
let temporizador;

// Cargar los audios
let audioFondo = new Audio("../audio/background.mp3"); // Audio de fondo
let audioAdvertencia = new Audio("../audio/tiempo.mp3");  
let audioTiempoAgotado = new Audio("../audio/incorrecto.mp3"); 
let audioCorrecto = new Audio("../audio/correcto.mp3");  
let audioIncorrecto = new Audio("../audio/incorrecto.mp3");

audioFondo.loop = true;

function iniciarTemporizador() {
    tiempoRestante = 30;
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
    let porcentaje = (tiempoRestante / 30) * 100;
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

    // Obtener referencias
    let imagenPregunta = document.querySelector(".imagen-pregunta");
    let imagenFondo = document.querySelector(".imagen-pregunta-fondo");
    let mask = document.querySelector(".imagen-pregunta-mask");

    // Asegurarse de que la máscara esté configurada correctamente
    if (!imagenPregunta || !imagenFondo || !mask) {
        console.error("No se encontraron los elementos en el DOM.");
        return;
    }

    // Asignar las imágenes de la pregunta y fondo
    imagenFondo.src = pregunta.imagenFondo;
    imagenPregunta.src = pregunta.imagen;

    // Reiniciar la máscara antes de aplicar la animación
    mask.style.animation = "none";
    mask.style.clipPath = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)"; // Estado inicial

    // Forzar la reactividad del estilo de la máscara
    mask.offsetHeight; // Trigger reflow para que la animación se reinicie correctamente

    // Aplicar animación de "revelado"
    setTimeout(() => {
        mask.style.animation = "revelarImagen 0.8s ease-in-out forwards";
    }, 50);

    // Actualizar el texto de la pregunta
    document.getElementById("texto-pregunta").textContent = pregunta.texto;

    // Limpiar y agregar nuevas opciones
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
    tiempoRestante = 30;
    document.getElementById("tiempo-restante").textContent = tiempoRestante;

    // Reiniciar la barra de progreso inmediatamente
    let barraProgreso = document.querySelector(".progreso");
    barraProgreso.style.transition = "none";
    barraProgreso.style.width = "100%";

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

    // Bloquear todas las opciones para que no puedan seleccionarse más de una vez
    document.querySelectorAll(".opcion").forEach(opcion => {
        opcion.style.pointerEvents = "none"; // Desactiva la interacción
    });

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





document.addEventListener("DOMContentLoaded", function () {
    if (document.body.getAttribute("data-page") === "juego") {
        console.log("Página cargada, iniciando trivia...");
        cargarPregunta();
        audioFondo.play();
    }
});

function iniciarTrivia() {
    window.location.href = "trivia-juego.html"; // Redirige a la pantalla de la trivia
}
