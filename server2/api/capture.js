const puppeteer = require('puppeteer');
const fs = require('fs');

//const Map =  require('go-juggle')

let browser = null
let page = null
let app = null
let { CHROME_EXECUTEABLE_PATH } = process.env

if (!CHROME_EXECUTEABLE_PATH) {
  console.error('CHROME_EXECUTEABLE_PATH is Empty ')
  return null
}

const args = [
  "--disable-gpu",
  "--disable-setuid-sandbox",
  "--force-device-scale-factor",
  "--ignore-certificate-errors",
  "--no-sandbox",
];

// same behavior with headless false
const options = {
  executablePath: CHROME_EXECUTEABLE_PATH,
  args,
  headless: true,
  ignoreHTTPSErrors: true,
  dumpio: true,
};

function setBrower() {
  return new Promise(async (resolve, reject) => {
    browser = await puppeteer.launch(options)
    browser.on('disconnected', () => {
      browser.close()
      //setBrower()
    })

    page = await browser.newPage()
    page.setContent(`<div id="app" style="width:400px;height:400px;"></div>`);

    await page.addScriptTag({
      path: './node_modules/go-juggle/dist/go-juggle-comb.js'
    });

    resolve(page)
  })
}

/**
 * 创建快照
 * @param {*} model 
 * @param {*} style 
 */
const create = async function (model) {
  await setBrower()

  if (page) {
    let result = await page.evaluate(async ({ raw, map, style, setting }) => {
      setting = {
        ...setting,
        showMesh: false,
        showRule: false
      }

      return new Promise(async (resolve, reject) => {
        var mapObject = null
        var { FlowChart, SequenceMap, StructMap, MindMap, Maps } = window

        switch (map) {
          case "MINDMAP":
            mapObject = new MindMap(style, setting, raw)
            break;

          case "SEQUENCEMAP":
            mapObject = new SequenceMap(style, setting, raw)
            break;

          case "STRUCTMAP":
            mapObject = new StructMap(style, setting, raw)
            break;

          default:
            mapObject = new FlowChart(style, setting, raw)
            break;
        }


        mapObject.mount('app', raw)

        var imageData = await mapObject.capture(Maps.Captures.BASE64)

        // await page.close()
        // await browser.close()
        resolve(imageData)
      })

    }, model)

    return result
  } else {
    return null
  }
}

module.exports = {
  create
};