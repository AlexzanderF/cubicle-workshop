const uniqid = require('uniqid');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const path = './config/database.json';

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        if (!name || !description || !imageUrl || !difficulty) {
            return Promise.reject(new Error('BLANK FIELDS'));
        }
        this.id = uniqid();
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = Number(difficulty);
    }

    async save() {
        try {
            let cubeObj = Object.assign({}, this);
            let dbData = JSON.parse(await readFile(path));
            dbData.push(cubeObj);
            return writeFile(path, JSON.stringify(dbData, null, 2));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getAll() {
        try {
            let allCubes = JSON.parse(await readFile(path));
            return Promise.resolve(allCubes);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getById(id) {
        try {
            let allCubes = JSON.parse(await readFile(path));
            return Promise.resolve(allCubes.find(c => c.id === id));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    static async getByQuery(query) {
        try {
            let allCubes = JSON.parse(await readFile(path));
            if (query.from || query.to) {
                let { from, to } = query;

                function meetRequirements(cube) {
                    return cube.difficulty >= (Number(from) || 0) && cube.difficulty <= (Number(to) || 6);
                }
                let filteredCubes = allCubes.filter(meetRequirements);

                if (query.search) {
                    let search = query.search.toLowerCase();
                    filteredCubes = filteredCubes.filter(c => c.name.toLowerCase().includes(search));
                }

                return Promise.resolve(filteredCubes);
            } else {
                let search = query.search.toLowerCase();
                let filteredCubes = allCubes.filter(c => c.name.toLowerCase().includes(search));

                return Promise.resolve(filteredCubes);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

module.exports = Cube;