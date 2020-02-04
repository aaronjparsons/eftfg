const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

const gameVersionUrl = "https://escapefromtarkov.gamepedia.com/Changelog"
const ammoDataUrl = "https://escapefromtarkov.gamepedia.com/Ballistics"

const keys = [
  "damage",
  "penetration",
  "armorDamage",
  "accuracy",
  "recoil",
  "fragmentation"
]

let ammoData = []
let wikiData = {
  gameVersion: {
    version: null,
    updated: null
  },
  ammoDataUpdated: null
}

async function getWikiData() {
  console.log('Getting wiki data...')
  const page = await axios(gameVersionUrl)
  const $ = cheerio.load(page.data)
  const content = $(".mw-parser-output")
  const versionText = content
    .find("h2 > .mw-headline")
    .first()
    .text()
    .split(" ")

  const version = versionText.shift()
  const updated = versionText.join(" ").replace(/(\(|\))/gim, "")
  const now = Date.now()

  wikiData = {
    gameVersion: {
      version,
      updated
    },
    ammoDataUpdated: now
  }
  console.log('Wiki data complete')
}

async function getAmmoData() {
  console.log('Getting ammo data...')
  const page = await axios(ammoDataUrl)
  const $ = cheerio.load(page.data);
  const content = $(".sortable > tbody > tr");
  content.each(function() {
    const object = {};

    const name = $(this)
      .find("td > a")
      .last()
      .text();
    const nameArray = name.split(" ");
    nameArray[0] = nameArray[0].replace(/\//g, "x");
    object.name = nameArray.join(" ");

    let dataPoints = $(this)
      .find("td");

    if (dataPoints.length === 14) {
      dataPoints = dataPoints.slice(2, 8);
    } else {
      dataPoints = dataPoints.slice(1, 7);
    }

    dataPoints.each(function(index, el) {
      object[keys[index]] = $(this)
        .text()
        .replace(/\n/g, "");
    });

    if (object.name) {
      ammoData.push(object);
    }
  })
  console.log('Ammo data complete')
}

async function run() {
  console.log('Starting...')
  await getWikiData()
  await getAmmoData()
  console.log('Saving files...')
  fs.writeFile(
    "./data/wiki-data.json",
    JSON.stringify(wikiData),
    err => {
      if (err) throw err;
      console.log("Wiki data has been saved!");
    }
  )
  fs.writeFile(
    "./data/ammo.json",
    JSON.stringify(ammoData),
    err => {
      if (err) throw err;
      console.log("Ammo data has been saved!");
    }
  )
}

run()