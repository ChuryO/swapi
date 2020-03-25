export default class SwapiService {
    constructor() {
        this._apiBase = `https://swapi.co/api`;
        this._imageBase = `https://starwars-visualguide.com/assets/img`;
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch:\n ${url}\n received ${res.status}`);
        }
        return await res.json();
    };

    getAllPeople = async () => {
        const result = await this.getResource('/people/');
        return result.results.map(this._transformPerson).slice(0, 5);
    };

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    };

    getAllPlanets = async () => {
        const result = await this.getResource('/planets/');
        return result.results.map(this._transformPlanet).slice(0, 5);
    };

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}/`);
        return this._transformPlanet(planet);
    };

    getAllStarships = async () => {
        const result = await this.getResource('/starships/');
        return result.results.map(this._transformStarship).slice(0, 5);
    };

    getStarship = async (id) => {
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship);
    };

    getPersonImage = ({id}) => {
        return `${this._imageBase}/characters/${id}.jpg`;
    };

    getStarshipImage = ({id}) => {
        return `${this._imageBase}/starships/${id}.jpg`;
    };

    getPlanetImage = ({id}) => {
        return `${this._imageBase}/planets/${id}.jpg`;
    };

    _getId(item) {
        const regEx = /\/([0-9]*)\/$/;
        return item.url.match(regEx)[1];
    };

    _transformPlanet = (planet) => {
        return {
            id: this._getId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter,
        }
    };

    _transformStarship = (starship) => {
        return {
            id: this._getId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.cost_in_credits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargo_capacity ,
        }
    };

    _transformPerson = (person) => {
        return {
            id: this._getId(person),
            name: person.name,
            gender: person.gender,
            eyeColor: person.eye_color,
            birthYear: person.birth_year,
        }
    };
}
