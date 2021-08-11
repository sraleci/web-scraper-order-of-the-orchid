const puppeteer = require('puppeteer');
const url = 'https://dev.to/t/typescript';
const options = {
    headless: true
};
const selector = '.crayons-story';
(async function(){
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(url);
    const articles = await page.$$eval(selector, nodes => {
        return nodes.map(node => {
            const title = node.querySelector('.crayons-story__title a').innerText;
            const date = node.querySelector('.crayons-story time').innerText;
            const author = node.querySelector('.crayons-story__meta .crayons-story__secondary').innerText;
            const tags = node.querySelectorAll('.crayons-tag');
            let tagsArr = [];
            tags.forEach(tag => {
                tagsArr.push(tag.innerText);
            })
            return {
                title, 
                date,
                author,
                tagsArr
            } 
        })
    });
    console.log(articles);
    const fs = require('fs');
    fs.writeFile('./articles.json', JSON.stringify(articles), err => err ? console.log(err): null);
    await browser.close();
})();
