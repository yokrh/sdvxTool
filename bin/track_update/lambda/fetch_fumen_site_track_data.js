/**
 * Runtime
 *   Node 8
 * Handler
 *   fetch_fumen_site_track_data.lambda_handler
 * Required File(S3)
 *   https://s3-ap-northeast-1.amazonaws.com/sdvx-chrome/chrome.tar.gz
 */

/**
 * Due to error below, the script is not available...
 * ```
    2018-04-08T02:51:41.551Z	bc1989df-3ad7-11e8-af9d-9d6e2d7acd0a	(node:1) UnhandledPromiseRejectionWarning: Error: Failed to launch chrome!
    /tmp/chromium/.local-chromium/linux-536395/chrome-linux/chrome: error while loading shared libraries: libXcursor.so.1: cannot open shared object file: No such file or directory * 
 * ```
 */

'use strict';

const S3_BUCKET = 'sdvx';
const S3_CHROME_BUCKET = 'sdvx-chrome';
const S3_CHROME_FILE = 'chrome.tar.gz';
const LAMBDA_TMP = '/tmp';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const puppeteer = require('puppeteer');
const tar = require('tar');


// fetch chrome from S3 because of its large size
const fetchChrome = () => {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: S3_CHROME_BUCKET,
      Key: S3_CHROME_FILE,
    };
    s3.getObject(params)
    .createReadStream()
    .on('error', (err) => reject(err))
    .pipe(tar.x({ C: LAMBDA_TMP }))
    .on('error', (err) => reject(err))
    .on('end', () => resolve());
  });
}

exports.lambda_handler = () => {
  (async() => {
    console.log('--- fetchChrome begin ---');
    await fetchChrome();
    console.log('--- fetchChrome end ---');

    // DEBUG
    /*
    console.log('--- DEBUG child_process begin ---');
    const exec = require('child_process').exec;
    const cmd = 'ls -la /tmp/chromium/';
    exec(cmd, function(err, stdout, stderr){
      if (err) console.log('err:', err);
      console.log('--- DEBUG child_process NOTE:async ---');
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    });
    console.log('--- DEBUG child_process end ---');
    */

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

      // get DOM data
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

      // create JSON data
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

      // upload to S3
      const json = JSON.stringify(trackData);
      const key = level + '.json';
      const updateParams = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: json,
        ContentType: 'application/json'
      };
      s3.upload(updateParams, function(err, data) {
        if (err) { console.log('s3 upload ERROR!!!'); }
        else { console.log('s3 upload OK!!!', updateParams.Bucket, updateParams.Key); }
      });
    }

    await page.close();
    await browser.close();
    console.log('--- fetch end ---');
  })();
}
