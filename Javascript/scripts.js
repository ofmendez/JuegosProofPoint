function ajustarAltura() {
    const container = document.querySelector(".container");
    if (container) {
        container.style.height = `${window.innerHeight}px`;
        document.body.style.height = `${window.innerHeight}px`;
    }
}

window.addEventListener("resize", ajustarAltura);
window.addEventListener("load", ajustarAltura);

function mostrarPuntaje(puntaje) {
    document.getElementById('puntaje-final').textContent = puntaje;
}

function continuar() {
    // Redirigir a la siguiente pantalla (ajustar la URL según el flujo)
    window.location.href = "siguiente-pantalla.html";
}

