const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const fs = require ('fs');
const readlineSync = require ('readline-sync');
const puppeteer = require ('puppeteer');
const chalk = require ('chalk');
const moment = require ('moment');

const getData = () => new Promise((resolve,reject)=>{
    fetch('https://name-fake.com/id_ID', {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:99.0) Gecko/20100101 Firefox/99.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-GB,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'DNT': '1',
            'Connection': 'keep-alive',
            'Cookie': 'PHPSESSID=78fd62f29ab0d35bb777ca6edfffb335; prefetchAd_2861429=true',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'TE': 'trailers'
        }
 })
 .then(ress => ress.text())
 .then(async result => {
     const $ = await cheerio.load(result);
    const firstName = $('div[id=copy1]').text();
    const lastName = $('div[id=copy2]').text();
    const ressEmail = $('div[id=copy4]').text().split("@");
    const dnsEmail = ressEmail[0] + Math.floor(Math.random() * 1000)+ "@gmail.com";
    
     resolve({
         firstName: firstName,
         lastName: lastName,
         email: dnsEmail
     })
 }).catch(err => reject(err))
});

const random4number = Math.floor(1000 + Math.random() * 9000);
const random2number = Math.floor(Math.random() * 90 + 10);

(async () => {

    const dataakun = fs.readFileSync('dataacc.txt', 'utf-8').split('\n');
    

    for (let i = 0; i < dataakun.length; i++) {
        const data = await getData();
        const firstNamenya = data.firstName;
        const lastNamenya = data.lastName;
        const nama = `${firstNamenya} ${lastNamenya}`
        const discord = firstNamenya + "#" + random4number;
        const emailnya = data.email;
        const twitter = "@" + lastNamenya + random2number 

        const walletnya = dataakun[i];
        const wallet = walletnya.trim();


    // console.log(emailnya);
    // console.log(discord);
    // console.log(twitter);
    // console.log(wallet);
    
    const options = {waitUntil: 'networkidle2'}
    const browser = await puppeteer.launch()
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSdK4GruR5MinqaGae6etqeWRvh9_hwDcnNvUp8PuzkUFiEjuQ/viewform', options);


   

    await page.waitForSelector('input[aria-describedby="i2 i3"]');
    await page.type('input[aria-describedby="i2 i3"]', emailnya);
    
    await page.waitForSelector('input[aria-describedby="i6 i7"]');
    await page.type('input[aria-describedby="i6 i7"]', discord);

    await page.waitForSelector('input[aria-describedby="i10 i11"]');
    await page.type('input[aria-describedby="i10 i11"]', twitter);

    await page.waitForSelector('textarea[aria-describedby="i14 i15"]');
    await page.type('textarea[aria-describedby="i14 i15"]', wallet);

    await page.waitForSelector('span[class="NPEfkd RveJvd snByac"]');
    await page.click('span[class="NPEfkd RveJvd snByac"]', {delay: 1000});

    
    console.log(chalk.white(`[RESULT]`), chalk.green(` === 200 OK`));
    const pindahData =  `${emailnya}|${discord}|${twitter}|${wallet}\n`;

    if (pindahData) {
        // console.log(`[ ${moment().format("HH:mm:ss")} ]`,chalk.yellow(`Memindahkan Data Akun Success`));
        // console.log(`[ ${moment().format("HH:mm:ss")} ]`, chalk.white(`Process Robot Selesai, Semua Data berhasil dipindahkan !`));
        const pindahDatanyaaa = fs.appendFileSync('databackup.txt', pindahData);
        // console.log(pindahDatanyaaa);
    }

    
    await page.screenshot({path: 'example.png'});
    // await browser.close();

    }
})();