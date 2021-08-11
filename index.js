"use strict";
const cheerio = require('cheerio');
const axios = require('axios');

(async () => {
    try {
        const url = 'http://dev.to'
        console.debug(`fetching ${url}`)
        const response = await axios.get(url);
        const html = response.data
        
        const $ = cheerio.load(html);
        
        $('h2.title').text('Hello there!');
        $('h2').addClass('welcome');
        
        console.log($.html());
    } catch (error) {
        console.log(error)
    }
})()

