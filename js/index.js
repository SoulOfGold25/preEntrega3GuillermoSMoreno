
let primerEst = { id: 1, disponible: true };
let segundoEst = { id: 2, disponible: true };
let tercerEst = { id: 3, disponible: true };
let cuartoEst = { id: 4, disponible: true };
let quintoEst = { id: 5, disponible: true };

function estadoEstacionamiento(){
    let estado = "";
    if (primerEst.disponible) {
        estado += "Estacionamiento 1: Disponible\n";
    } else {
        estado += "Estacionamiento 1: Ocupado\n";
    }

    if (segundoEst.disponible) {
        estado += "Estacionamiento 2: Disponible\n";
    } else {
        estado += "Estacionamiento 2: Ocupado\n";
    }

    if (tercerEst.disponible) {
        estado += "Estacionamiento 3: Disponible\n";
    } else {
        estado += "Estacionamiento 3: Ocupado\n";
    }

    if (cuartoEst.disponible) {
        estado += "Estacionamiento 4: Disponible\n";
    } else {
        estado += "Estacionamiento 4: Ocupado\n";
    }

    if (quintoEst.disponible) {
        estado += "Estacionamiento 5: Disponible\n";
    } else {
        estado += "Estacionamiento 5: Ocupado\n";
    }

    alert(estado);
}

function reservarEstacionamiento(numeroEstacionamiento) {
    if (numeroEstacionamiento === 1 && primerEst.disponible) {
        primerEst.disponible = false;
        console.log("¡Has reservado el estacionamiento Nº 1!");
    } else if (numeroEstacionamiento === 2 && segundoEst.disponible) {
        segundoEst.disponible = false;
        console.log("¡Has reservado el estacionamiento Nº 2!");
    } else if (numeroEstacionamiento === 3 && tercerEst.disponible) {
        tercerEst.disponible = false;
        console.log("¡Has reservado el estacionamiento Nº 3!");
    } else if (numeroEstacionamiento === 4 && cuartoEst.disponible) {
        cuartoEst.disponible = false;
        console.log("¡Has reservado el estacionamiento Nº 4!");
    } else if (numeroEstacionamiento === 5 && quintoEst.disponible) {
        quintoEst.disponible = false;
        console.log("¡Has el estacionamiento Nº 5!");
    } else {
        console.log(`El estacionamiento Nº ${numeroEstacionamiento} no está disponible o no existe.`);
        console.log(`Por favor, vuelve a intentarlo con otro Nº`);
    }
}

        // Función para liberar una plaza
        function liberarEstacionamiento(numeroEstacionamiento) {
            if (numeroEstacionamiento === 1 && !primerEst.disponible) {
                primerEst.disponible = true;
                alert("Has liberado el estacionamiento Nº 1.");
            } else if (numeroEstacionamiento === 2 && !segundoEst.disponible) {
                segundoEst.disponible = true;
                alert("Has el estacionamiento Nº 2.");
            } else if (numeroEstacionamiento === 3 && !tercerEst.disponible) {
                tercerEst.disponible = true;
                alert("Has el estacionamiento Nº 3.");
            } else if (numeroEstacionamiento === 4 && !cuartoEst.disponible) {
                cuartoEst.disponible = true;
                alert("Has el estacionamiento Nº 4.");
            } else if (numeroEstacionamiento === 5 && !quintoEst.disponible) {
                quintoEst.disponible = true;
                alert("Has liberado el estacionamiento Nº 5.");
            } else {
                alert(`el estacionamiento Nº ${numeroEstacionamiento} ya está disponible o no existe.`);
            }
        }


        function simuladorEstacionamiento() {
            let continuar = true;

            while (continuar) {
                const opcion = parseInt(prompt("¿Qué desea hacer?\n1. Ver estado del estacionamiento\n2. Reservar una plaza\n3. Liberar una plaza\n4. Salir"));

                if (opcion === 1) {
                    estadoEstacionamiento();
                } else if (opcion === 2) {
                    const numeroPlaza = parseInt(prompt("Ingrese el número de la plaza que desea reservar (1-5):"));
                    reservarEstacionamiento(numeroPlaza);
                } else if (opcion === 3) {
                    const numeroPlaza = parseInt(prompt("Ingrese el número de la plaza que desea liberar (1-5):"));
                    liberarEstacionamiento(numeroPlaza);
                } else if (opcion === 4) {
                    continuar = false; // Salir del ciclo
                    alert("Gracias por usar el sistema de reservas de estacionamiento.");
                } else {
                    alert("Opción no válida. Intente de nuevo.");
                }
            }
        }

        simuladorEstacionamiento();
