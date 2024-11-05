const estacionamientosEstatico = [
    { id: 1, disponible: true, horaEntrada: null, horaSalida: null, total: 0 },
    { id: 2, disponible: true, horaEntrada: null, horaSalida: null, total: 0 },
    { id: 3, disponible: true, horaEntrada: null, horaSalida: null, total: 0 },
    { id: 4, disponible: true, horaEntrada: null, horaSalida: null, total: 0 },
    { id: 5, disponible: true, horaEntrada: null, horaSalida: null, total: 0 }
];

let estacionamientos = JSON.parse(localStorage.getItem("estacionamientos")) || estacionamientosEstatico;

// Función para guardar los datos de estacionamientos en el storage
function guardarEnStorage() {
    localStorage.setItem("estacionamientos", JSON.stringify(estacionamientos));
}

// Función para formatear la fecha
function formatearHora(fecha) {
    if (!fecha) return "N/A";
    fecha = new Date(fecha);
    return `${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}:${fecha.getSeconds().toString().padStart(2, '0')}`;
}

// Función para calcular el total en base a los segundos
function calcularTotal(horaEntrada, horaSalida) {
    const segundos = Math.floor((new Date(horaSalida) - new Date(horaEntrada)) / 1000); // Diferencia en segundos
    return segundos * 1; // Precio por segundo
}

// Actualiza el DOM con el estado actual de los estacionamientos
function actualizarDOM() {
    estacionamientos.forEach(est => {
        const estadoCelda = document.getElementById(`estado-${est.id}`);
        const horaEntradaCelda = document.getElementById(`hora-entrada-${est.id}`);
        const horaSalidaCelda = document.getElementById(`hora-salida-${est.id}`);
        const totalCelda = document.getElementById(`total-${est.id}`);
        const botonReservar = document.querySelector(`button.reservar[data-id="${est.id}"]`);
        const botonLiberar = document.querySelector(`button.liberar[data-id="${est.id}"]`);

        estadoCelda.textContent = est.disponible ? "Disponible" : "Ocupado";
        horaEntradaCelda.textContent = formatearHora(est.horaEntrada);
        horaSalidaCelda.textContent = formatearHora(est.horaSalida);
        totalCelda.textContent = est.total ? `$${est.total}` : "N/A";

        botonReservar.disabled = !est.disponible;
        botonLiberar.disabled = est.disponible;
    });
}

// Función para reservar un estacionamiento
function reservarEstacionamiento(id) {
    const estacionamiento = estacionamientos.find(est => est.id === id);
    if (estacionamiento && estacionamiento.disponible) {
        estacionamiento.disponible = false;
        estacionamiento.horaEntrada = new Date().toISOString();
        estacionamiento.horaSalida = null;
        estacionamiento.total = 0;
        guardarEnStorage();
        actualizarDOM();
    }
}

// Función para liberar un estacionamiento y calcular el total
function liberarEstacionamiento(id) {
    const estacionamiento = estacionamientos.find(est => est.id === id);
    if (estacionamiento && !estacionamiento.disponible) {
        estacionamiento.disponible = true;
        estacionamiento.horaSalida = new Date().toISOString();
        estacionamiento.total = calcularTotal(estacionamiento.horaEntrada, estacionamiento.horaSalida);
        estacionamiento.horaEntrada = null;
        guardarEnStorage();
        actualizarDOM();
        alert(`Total a pagar por el estacionamiento Nº ${id}: $${estacionamiento.total}`);
    }
}

// Event para los botones de reservar y liberar
document.querySelectorAll(".reservar").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        reservarEstacionamiento(id);
    });
});

document.querySelectorAll(".liberar").forEach(boton => {
    boton.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        liberarEstacionamiento(id);
    });
});

actualizarDOM();
