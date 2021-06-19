const { json } = require('express');
const https = require('https');
//const http = require('http');

module.exports.getItems = (req, res, next) => {
    var url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=10';
    url = req.query.show || url 
    https.get(url, (response) => {
        var data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            let jsonData = JSON.parse(data);
            res.render('pages/pr09', {
                title: 'Team Activity 09',
                searchedValue: '',
                path: '/pr09', 
                dataItems: jsonData.results,
                next: jsonData.next,
                previous: jsonData.previous
            });
        });
    }).on('error', (error) => {
        console.log(error);
    })
}
