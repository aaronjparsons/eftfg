// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const changelogData = require('./data/changelog.json')
const wikiData = require('./data/wiki-data.json')
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
    // Add Game Version data
    const gameVersion = actions.addCollection({
      typeName: 'GameVersion'
    })
    gameVersion.addNode({
      version: wikiData.gameVersion.version,
      updated: wikiData.gameVersion.updated
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
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
