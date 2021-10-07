//import modules
const express = require('express');
const axios = require('axios');
require('dotenv').config();

//get port from env
const port = process.env.PORT;

//generate app und bind public folder
const app = express();
app.use(express.static('public'));

//port listener
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

//router
app.get('/', (reg, res) => {
    res.render('pages/index.ejs');
});

app.get('/movies', (reg, res) => {
    res.redirect('/movies/1')
});

app.get('/movies/:page', (reg, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=de-DE&page=${reg.params.page}`)
        .then(function (response) {
            res.render('pages/movies.ejs', { movies: response.data.results })
        })
        .catch(function (error) {
            console.log(error);
        })
});

app.get('/details/:id', (reg, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${reg.params.id}?api_key=${process.env.API_KEY}&language=de-DE`)
        .then(function (response) {
            console.log(response.data)
            res.render('pages/details.ejs', { details: response.data })
        })
        .catch(function (error) {
            console.log(error);
        })
});