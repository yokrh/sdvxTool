/**
 * Use it after AWS lambda support node 8. (only node 6 (2018/02))
 */

'use strict';

const fs = require("fs");
const puppeteer = require('puppeteer');

(async() => {
  console.log('--- fetch begin ---');
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();

  const levels = [
    '01','02','03','04','05',
    '06','07','08','09','10',
    '11','12','13','14','15',
    '16','17','18','19','20'
  ];

  for (const level of levels) {
    const url = 'http://www.sdvx.in/sort/sort_' + level + '.htm';
    console.log('url : ', url);
    await page.goto(url);
    //await page.screenshot({path: 'hoge.png', fullPage: true});
    //await page.content().then( content => console.log("content : ", content) );
  
    const domDatas = await page.evaluate(() => {
      const res = [];
      const es = document.querySelectorAll('.f1');
      for (const e of es) {
        const title = e.innerHTML.replace('<div class="b2">', '').replace('</div>', '');
        if (!title) continue;  // noise
  
        const td = e.parentNode;
        const tr = td.parentNode;
        if (!tr.children || tr.children.length < 2) continue; // noise
        const innerHtml = tr.children[1].innerHTML;
        if (!innerHtml.match('href="(.*).htm"')) continue;  // noise
        const path = innerHtml.match('href="(.*).htm"')[1];
  
        res.push({ title, path });
      }
      return res;
    });
  
    const difficultyMap = {'n': 'NOV', 'a': 'ADV', 'e': 'EXH', 'i': 'INF', 'g': 'GRV', 'h': 'HVN', 'm': 'MXM'};
    const datas = domDatas.map((d) => {
      const name = d.title.replace('&amp;', '&');
      const path = d.path;
      //console.log(name,path);
      const ver = path.split('/')[1];
      const id = path.split('/')[2];
      const difficulty = difficultyMap[id[id.length-1]];
      return { ver, name, level, difficulty, path, id };
    });
    //console.log(datas.length);
  
    const trackData = {};
    datas.map(d => trackData[d.id] = d);
  
    const json = JSON.stringify(trackData);
    fs.writeFile('./data/' + level + '.json', json);
  }

  await page.close();
  await browser.close();
  console.log('--- fetch end ---');
})();
