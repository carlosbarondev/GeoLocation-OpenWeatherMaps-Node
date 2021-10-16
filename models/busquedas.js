const fs = require('fs');

const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            return palabras.join(' ');
        });
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

    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 4); //Mantener solo cinco resultados en el historial
        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar en DB
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

module.exports = Busquedas;