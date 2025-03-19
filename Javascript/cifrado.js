function iniciarCifrado() {
    // Ocultar el contenedor de instrucciones
    document.getElementById('instrucciones-container').style.display = 'none';
    
    // Mostrar el contenedor del juego
    const juegoContainer = document.getElementById('juego-container');
    juegoContainer.style.display = 'flex';

    // Aquí puedes agregar cualquier lógica adicional para iniciar el juego.
    console.log("Iniciando juego de Cifrado...");
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
});
