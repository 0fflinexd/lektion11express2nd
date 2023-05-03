// IMport databasedriver
const dbDriver = require('better-sqlite3');

//connect to db
const db = dbDriver('bands2.0.db');

//Import express
const express = require('express');

//create express app
const app = express();

//Configure express
app.use(express.static('frontend')); // serve frontend 
app.use(express.json());             //Use JSON

/* Building the REST API */

//Get all
app.get('/bands', (req,res)=>{
    //query all bands
    const bands = db.prepare('SELECT * FROM bands').all();

    //Return bands in JSON
    res.json(bands);
});

// Get one
app.get('/bands/:id', (req,res) => {
    // Get single band from url parameter
    const band = db.prepare('SELECT * FROM bands WHERE id = ?').get(req.params.id);
    // Return JSON or error
    res.json(band || {error:'No such band'});
});

//Create new band - POST
app.post('/bands', (req,res) => {
    console.log(req.body);

    // Get name and genre from request body
    const name = req.body.name;
    const genre = req.body.genre;

    const statment = db.prepare('INSERT INTO bands (name,genre) VALUES (?,?)');
    const result = statment.run(name,genre);

    //return result
    res.json(result);
})

/* Start the app */
app.listen(3000, () =>{console.log('Server started on port 3000 ')});