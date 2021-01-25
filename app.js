const puppeteer = require('puppeteer-core');
const xlsx = require('xlsx');

const url = "?????????????????????????????????";

async function getPage() {
   console.log("Opening the browser......");
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome'
    });

    const page = await browser.newPage();
    await page.setViewport({
        width: 1400,
        height: 900
      });
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0,});
    await page.setDefaultNavigationTimeout(0);

    await page.waitForSelector(".report-table .thead td");
    const fascal = await page.$$eval('.report-table tr:nth-child(1) td', divs => divs.map( td  => td.textContent.trim()));  
    const assets = await page.$$eval('.report-table tr:nth-child(3) td', divs => divs.map( td  => td.textContent.trim())); 
    const equity = await page.$$eval('.report-table tr:nth-child(4) td', divs => divs.map( td  => td.textContent.trim()));  
    const investment_capital = await page.$$eval('.report-table tr:nth-child(5) td', divs => divs.map( td  => td.textContent.trim()));  
    
    const array = [ fascal , assets, equity, investment_capital ];

    const data = array.map(d => d.map(  e => [e]));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb,ws,"sheet1");
    xlsx.writeFile(wb, "???.xlsx");
}

getPage();




