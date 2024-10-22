let estacionamientos = [
    { id: 1, disponible: true },
    { id: 2, disponible: true },
    { id: 3, disponible: true },
    { id: 4, disponible: true },
    { id: 5, disponible: true }
];

// Función para ver estado de un estacionamiento
function estadoEstacionamiento() {
    let estado = estacionamientos.map( est => `Estacionamiento ${est.id}: ${est.disponible ? 'Disponible' : 'Ocupado'}`).join("\n")/* .join("\n") salto de linea en todo el array*/;
    alert(estado);
}

// Función para buscar un estacionamiento por su número
function buscarEstacionamiento(id) {
    return estacionamientos.find(est => est.id === id);
}

// Función para reservar un estacionamiento
function reservarEstacionamiento(numeroEstacionamiento) {
    if (isNaN(numeroEstacionamiento) || numeroEstacionamiento < 1 || numeroEstacionamiento > 5) {
        alert("Por favor, ingrese un número de estacionamiento válido (1-5).");
        return;
    }

    let estacionamiento = buscarEstacionamiento(numeroEstacionamiento);

    if (estacionamiento && estacionamiento.disponible) {
        estacionamiento.disponible = false;
        alert(`¡Has reservado el estacionamiento Nº ${estacionamiento.id}!`);
    } else {
        alert(`El estacionamiento Nº ${numeroEstacionamiento} no está disponible.`);
    }
}

// Función para liberar un estacionamiento
function liberarEstacionamiento(numeroEstacionamiento) {
    if (isNaN(numeroEstacionamiento) || numeroEstacionamiento < 1 || numeroEstacionamiento > 5) {
        alert("Por favor, ingrese un número de estacionamiento válido (1-5).");
        return;
    }

    let estacionamiento = buscarEstacionamiento(numeroEstacionamiento);

    if (estacionamiento && !estacionamiento.disponible) {
        estacionamiento.disponible = true;
        alert(`Has liberado el estacionamiento Nº ${estacionamiento.id}.`);
    } else {
        alert(`El estacionamiento Nº ${numeroEstacionamiento} actualmente ya está disponible.`);
    }
}

// Función principal del simulador
function simuladorEstacionamiento() {
    let continuar = true;

    while (continuar) {
        const opcion = parseInt(
            prompt(
                "¿Qué desea hacer?\n1. Ver estado del estacionamiento\n2. Reservar un estacionamiento\n3. Liberar un estacionamiento\n4. Salir"
            )
        );

        switch(opcion) {
            case 1:
                estadoEstacionamiento();
                break;
            case 2:
                const numeroReservar = parseInt(
                    prompt("Ingrese el número del estacionamiento que desea reservar (1-5):")
                );
                reservarEstacionamiento(numeroReservar);
                break;
            case 3:
                const numeroLiberar = parseInt(
                    prompt("Ingrese el número del estacionamiento que desea liberar (1-5):")
                );
                liberarEstacionamiento(numeroLiberar);
                break;
            case 4:
                continuar = false;
                alert("Gracias por usar el sistema de reservas de estacionamiento.");
                break;
            default:
                alert("Opción no válida. Intente de nuevo.");
        }
    }
}

// Iniciar simulador
simuladorEstacionamiento();
