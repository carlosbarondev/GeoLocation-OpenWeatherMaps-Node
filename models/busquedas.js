const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor() {

    }

    async ciudad(lugar = '') {
        console.log(lugar);

        return [];
    }
}

module.exports = Busquedas;