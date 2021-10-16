require('dotenv').config();

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {

    const busquedas = new Busquedas();
    let opt = '';

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const busqueda = await leerInput("Lugar: ");

                // Buscar los lugares
                const lugares = await busquedas.ciudad(busqueda);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);
                const lugarSel = lugares.find(l => l.id === id);

                // Clima
                const clima = await busquedas.climaLugar(lugarSel.latitud, lugarSel.longitud);

                // Mostrar resultados
                console.clear();
                console.log("\nInformacion del lugar\n".green);
                console.log("Lugar:", lugarSel.nombre.green);
                console.log("Latitud:", lugarSel.latitud);
                console.log("Longitud:", lugarSel.longitud);
                console.log("Temperatura:", clima.temp);
                console.log("Minima:", clima.temp_min);
                console.log("Maxima:", clima.temp_max);
                console.log("Como esta el clima:", clima.description.green);
                break;
            case 2:
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();