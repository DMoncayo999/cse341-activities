const { json } = require('express');
const https = require('https');
//const http = require('http');


module.exports.getItems = (req, res, next) => {
    const ITEMS_PER_PAGE = 10 // Limit of 10 items per page.
    var url = 'https://byui-cse.github.io/cse341-course/lesson03/items.json';
    //var url = 'http://localhost:8080/items.json';

    https.get(url, (response) => {
        var data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            var jsonData = JSON.parse(data);
            totalPages = jsonData.length / ITEMS_PER_PAGE
            const { query } = req;
            const filter = query.search;
            if (query && filter) {
                jsonData = jsonData.filter(dataItem => dataItem.name.toUpperCase().indexOf(filter.toUpperCase()) > -1)
            }
            page = req.query.page || 1 
            console.log("getItems received page", page)
            const indexStart = (page - 1) * ITEMS_PER_PAGE 
            const indexEnd = page * ITEMS_PER_PAGE
            jsonRenderData = jsonData.filter((item, index) => index >= indexStart && index <= indexEnd )
            res.render('pages/ta03', {
                title: 'Team Activity 03 & 08',
                searchedValue: '',
                page: page,
                path: '/ta03', // For pug, EJS 
                activeTA03: true, // For HBS
                contentCSS: true, // For HBS
                data: jsonRenderData,
                ITEMS_PER_PAGE,
                totalPages,
                query: filter || ''
            });
        });
    }).on('error', (error) => {
        console.log(error);
    })
}
