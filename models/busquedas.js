const axios = require('axios');

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor() {

    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            // Peticion http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox,
            });
            const resp = await instance.get();
            //const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/hue.json?language=es&access_token=pk.eyJ1IjoiY2FybG9zYnAiLCJhIjoiY2t1dHBnMjl6MG1keDJucDdlZ3lod3NrciJ9.kxFNBi8Jln1pLAP6ZLhycQ");
            console.log(resp.data);
            return [];
        } catch (error) {
            return [];
        }
    }
}

module.exports = Busquedas;