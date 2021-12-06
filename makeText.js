/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function genText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data){
        if (err){
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            genText(data);
        }
    })
}

async function makeURLText(url){
    let response;

    try{
        response = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    genText(response.data)
}

if (method === "file") {
    makeText(path);
} else if (method === "url") {
    makeURLText(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1)
}
