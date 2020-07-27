const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")
const isEqual = require('lodash.isequal')

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

let currentAmmoData = []
let ammoData = []
let ammoChanges = []
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
    .eq(1)
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

function logAmmoChanges() {
  const changes = []
  for (const item of ammoData) {
    const comparableItem = currentAmmoData.ammo.find(ammo => ammo.name === item.name)

    if (comparableItem && !isEqual(item, comparableItem)) {
      const itemChanges = {}
      for (const key in item) {
        if (item[key] !== comparableItem[key]) {
          itemChanges[key] = [comparableItem[key], item[key]]
        }
      }

      if (Object.keys(itemChanges).length) {
        itemChanges.name = item.name
        changes.push(itemChanges)
      }
    }
  }

  ammoChanges = changes
}

async function run() {
  console.log('Starting...')

  // Wiki Data
  await getWikiData()
  fs.writeFile(
    "../data/wiki-data.json",
    JSON.stringify(wikiData),
    err => {
      if (err) {
        throw err
      } else {
        console.log("Wiki data has been saved!")
      }
    }
  )

  // Ammo Data
  await getAmmoData()
  fs.readFile("../data/ammo.json", (err, data) => {
    if (err)  {
      throw err
    } else {
      currentAmmoData = JSON.parse(data)
      const ammoUpdated = !isEqual(currentAmmoData.ammo, ammoData)
      console.log(`Ammo has ${ammoUpdated ? '' : 'not '}been updated`)

      if (ammoUpdated) {
        logAmmoChanges()
        fs.writeFile(
          "../data/ammo.json",
          JSON.stringify({ changes: ammoChanges, ammo: ammoData }),
          err => {
            if (err) {
              throw err
            } else {
              console.log("Ammo data has been saved!")
            }
          }
        )
      }
    }
  })
}

run()