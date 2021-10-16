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

    get paramsOpenWeather() {
        return {
            'units': 'metric',
            'lang': 'es',
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
            //const resp = await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/hue.json?language=es&access_token=gfjtfrybrtyr");
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1],
            }));
        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            // Peticion http
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}`,
                params: this.paramsOpenWeather,
            });
            const resp = await instance.get();
            //const resp = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=40.41889&lon=-3.69194&appid=abcdb186b1d2f06094eeca56b78c1872");
            return {
                temp: resp.data.main.temp,
                temp_min: resp.data.main.temp_min,
                temp_max: resp.data.main.temp_max,
                description: resp.data.weather[0].description,
            };
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Busquedas;