// Require node_modules
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


// Set up our openweathermap API_KEY
const apiKey = '5fda5eec33a09b282f345498e3fdd010';

// Setup our express app and body-parser configurations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/weather', function(req, res) {

    // Get city name passed in the form
    let city = req.body.city;

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    // Request for data using the URL
    request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.send('Error - Request is giving an error')
        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.send('Weather - Main is undefined');
            } else {
                res.send(weather);
            }
        }
    });
});

// We shall set up our port configurations
app.listen(5000, function() {
    console.log('Weather app listening on port 5000!');
});