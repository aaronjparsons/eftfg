// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const changelogData = require('./data/changelog.json')
const wikiData = require('./data/wiki-data.json')
const ammoData = require('./data/ammo.json')
const nodeExternals = require('webpack-node-externals')

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          whitelist: [/^vuetify/]
        })
      ])
    }
  })

  api.loadSource(actions => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/

    // Add Wiki data
    const wiki = actions.addCollection({
      typeName: 'Wiki'
    })
    wiki.addNode({
      gameVersion: wikiData.gameVersion.version,
      gameVersionUpdated: wikiData.gameVersion.updated,
      ammoUpdated: wikiData.ammoDataUpdated
    })

    // Add Changelog data
    const changelog = actions.addCollection({
      typeName: 'Changelog'
    })

    for (const item of changelogData) {
      changelog.addNode({
        date: item.date,
        summary: item.summary,
        changes: item.changes
      })
    }

    // Add ammo data
    const ammo = actions.addCollection({
      typeName: 'Ammo'
    })

    for (const item of ammoData) {
      ammo.addNode({
        name: item.name,
        damage: item.damage,
        penetration: item.penetration,
        armorDamage: item.armorDamage,
        accuracy: item.accuracy,
        recoil: item.recoil,
        fragmentation: item.fragmentation
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
