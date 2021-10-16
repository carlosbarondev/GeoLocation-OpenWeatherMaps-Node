require('dotenv').config();

const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
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
                const lugar = await leerInput("Lugar: ");
                await busquedas.ciudad(lugar);
                // Mostrar resultados
                console.log("\nInformacion del lugar\n".green);
                console.log("Lugar:",);
                console.log("Latitud:",);
                console.log("Longitud:",);
                console.log("Temperatura:",);
                console.log("Minima:",);
                console.log("Maxima:",);
                break;
            case 2:
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();