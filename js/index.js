let estacionamientos = [];

// Guardo datos en localStorage
function guardarEnStorage() {
    console.log("Guardando en localStorage:", estacionamientos);
    localStorage.setItem("estacionamientos", JSON.stringify(estacionamientos));
}

// Cargo datos desde un archivo JASON y controlo lor errores con un try catch
async function cargarDatos() {
    try {
        const datosGuardados = localStorage.getItem("estacionamientos");

        if (datosGuardados) {
            // Si existen datos los uso
            estacionamientos = JSON.parse(datosGuardados);
            console.log("Datos cargados desde localStorage:", estacionamientos);
        } else {
            // Si no existen datos en localStorage, los cargo desde JSON
            console.log("Cargando datos desde JSON...");
            const respuesta = await fetch("./data/estacionamientos.json");

            if (!respuesta.ok) {
                throw new Error(`Error al cargar JSON: ${respuesta.status}`);
            }

            estacionamientos = await respuesta.json();
            // Guardo en localStorage
            guardarEnStorage();
            console.log("Datos cargados desde JSON:", estacionamientos);
        }
        // Genera la tabla en el con los datos
        generarTabla();
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}





// Formateo Hora
function formatearHora(fecha) {
    if (!fecha) return "00:00:00";
    fecha = new Date(fecha);
    return `${fecha.getHours().toString().padStart(2, "0")}:${fecha.getMinutes().toString().padStart(2, "0")}:${fecha.getSeconds().toString().padStart(2, "0")}`;
}

// Calcular total
function calcularTotal(horaEntrada, horaSalida) {
    const segundos = Math.floor((new Date(horaSalida) - new Date(horaEntrada)) / 1000);
    // Precio por segundo
    return segundos * 1;
}

// genero filas en tabla
function generarTabla() {
    const tabla = document.getElementById("tablaEstacionamiento");
    tabla.innerHTML = `
        <tr>
            <th scope="col">Número </th>
            <th scope="col">Estado</th>
            <th scope="col">Hora de Entrada</th>
            <th scope="col">Hora de Salida</th>
            <th scope="col">Total a Pagar</th>
            <th scope="col">Acción</th>
        </tr>
    `;

    estacionamientos.forEach((est) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${est.id}</td>
            <td id="estado-${est.id}">${est.disponible ? "Disponible" : "Ocupado"}</td>
            <td id="hora-entrada-${est.id}">${formatearHora(est.horaEntrada)}</td>
            <td id="hora-salida-${est.id}">${formatearHora(est.horaSalida)}</td>
            <td id="total-${est.id}">${est.total ? `$${est.total}` : "$"}</td>
            <td>
                <button class="btn btn-success btn-sm reservar" data-id="${est.id}" ${!est.disponible ? "disabled" : ""}>Reservar</button>
                <button class="btn btn-danger btn-sm liberar" data-id="${est.id}" ${est.disponible ? "disabled" : ""}>Liberar</button>
                <button class="btn btn-primary btn-sm pagar" data-id="${est.id}" ${est.total === 0 ? "disabled" : ""}>Pagar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    botonClick();
}

function botonClick() {
    document.querySelectorAll(".reservar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            reservarEstacionamiento(id);

            // al presionar boton reserva se deshabilita el boton reserva
            e.target.disabled = true;
            // Se deshabilita el boton pagar
            document.querySelector(`button.pagar[data-id="${id}"]`).disabled = true;
            // Se habilita el boton liberar
            document.querySelector(`button.liberar[data-id="${id}"]`).disabled = false;
        });
    });

    document.querySelectorAll(".liberar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            liberarEstacionamiento(id);

            // al presionar boton liberar se deshabilita el boton reserva
            document.querySelector(`button.reservar[data-id="${id}"]`).disabled = true;
            //Se habilita el boton pagar
            document.querySelector(`button.pagar[data-id="${id}"]`).disabled = false; 
            // se deshabilita el boton liberar 
            e.target.disabled = true;
        });
    });

    document.querySelectorAll(".pagar").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const id = parseInt(e.target.getAttribute("data-id"));
            pagarEstacionamiento(id);

            // al presionar boton pagar se habilita el boton reserva
            document.querySelector(`button.reservar[data-id="${id}"]`).disabled = false; 
            // se deshabilita boton pagar
            e.target.disabled = true;
            // se deshabilita boton liberar
            document.querySelector(`button.liberar[data-id="${id}"]`).disabled = true;
        });
    });
}

// Reservar
function reservarEstacionamiento(id) {
    const estacionamiento = estacionamientos.find((est) => est.id === id);
    if (estacionamiento && estacionamiento.disponible) {
        estacionamiento.disponible = false;
        estacionamiento.horaEntrada = new Date().toISOString();
        estacionamiento.horaSalida = null;
        estacionamiento.total = 0;
        guardarEnStorage();
        generarTabla();
        Swal.fire("Reserva Exitosa", `Estacionamiento Nº ${id} reservado.`, "success");
    }
}

// Liberar
function liberarEstacionamiento(id) {
    const estacionamiento = estacionamientos.find((est) => est.id === id);
    if (estacionamiento && !estacionamiento.disponible) {
        estacionamiento.disponible = true;
        estacionamiento.horaSalida = new Date().toISOString();
        estacionamiento.total = calcularTotal(estacionamiento.horaEntrada, estacionamiento.horaSalida);
        guardarEnStorage();
        generarTabla();
        Swal.fire("Liberación Exitosa", `Total a pagar: $${estacionamiento.total}`, "info");
    }
}

// Pagar
function pagarEstacionamiento(id) {
    const estacionamiento = estacionamientos.find((est) => est.id === id);
    if (estacionamiento && estacionamiento.total > 0) {
        estacionamiento.total = 0;
        estacionamiento.horaEntrada = null;
        estacionamiento.horaSalida = null;
        guardarEnStorage();
        generarTabla();
        Swal.fire("Pago Realizado", `El estacionamiento Nº ${id} está disponible nuevamente.`, "success");
    }
}

// Inicializar
cargarDatos();
