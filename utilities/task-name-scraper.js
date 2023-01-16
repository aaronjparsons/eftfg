const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

const taskUrl = 'https://escapefromtarkov.fandom.com/wiki/Quests';

async function getTaskNames() {
    const page = await axios(taskUrl);
    const $ = cheerio.load(page.data);
    const tables = $(".sortable > tbody"); // Each table
    const titles = tables.find('tr > th > b > a')

    const taskTitles = [];
    titles.each(function() {
        const name = $(this).text()
        taskTitles.push(name);
    })

    fs.writeFile(
        "../data/task-names.json",
        JSON.stringify([taskTitles]),
        err => {
            if (err) {
              throw err
            } else {
              console.log("Task titles written!")
            }
        }
    )
}

getTaskNames();