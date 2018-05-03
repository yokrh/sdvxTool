'use strict';

var fs = require("fs");
const puppeteer = require('puppeteer');

(async() => {
  console.log('--- fetch begin ---');
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setCookie({
    'name': 'M573SSID',
    'value': '08b8faad-a0c8-4ab0-935f-a18428ad70a1',
    'domain': 'p.eagate.573.jp'
  });
  
  // const profileUrl = 'https://p.eagate.573.jp/game/sdvx/iv/p/playdata/profile/index.html';
  const musicdataUrl = 'https://p.eagate.573.jp/game/sdvx/iv/p/playdata/musicdata/index.html';
  await page.goto(musicdataUrl);

  const pageLen = await page.evaluate(() => {
    return document.querySelectorAll('.page a').length;
  })

  const trackData = {};
  for (let p = 1; p <= pageLen; p++) {
    const url = `https://p.eagate.573.jp/game/sdvx/iv/p/playdata/musicdata/index.html?page=${p}&sort=0`
    console.log('url : ', url);
    
    await page.goto(url);
    // await page.screenshot({path: 'hoge.png', fullPage: true});
    // await page.content().then( content => console.log("content : ", content) ); console.log('');
    
    const domDatas = await page.evaluate(() => {
      const res = [];
      
      const es = document.querySelectorAll('#playdata_li .data_col .music');
      for (const e of es) {
        const titleContainer = e.getElementsByClassName('title')[0];
        const title = titleContainer.innerText;
        const artistContainer = e.getElementsByClassName('artist')[0];
        const artist = artistContainer.innerText;

        res.push({ title, artist });
      }
      return res;
    });
    // console.log(domDatas.length);
  
    const datas = domDatas.map((d) => {
      const res = d;
      let name = d.title;
      const artist = d.artist;
      // 譜面サイトと公式サイトの差異を吸収
      name = name.replace('(EXIT TUNES)', '');
      // console.log(name, ', ', artist);
      return { name, artist };
    });

    datas.map(d => trackData[d.name] = d);
  }
  const json = JSON.stringify(trackData);
  fs.writeFile('./data/officialTrackData.json', json);

  await page.close();
  await browser.close();
  console.log('--- fetch end ---');
})();
