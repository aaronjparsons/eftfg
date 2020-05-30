// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const changelogData = require('./data/changelog.json')
const wikiData = require('./data/wiki-data.json')
const keyData = require('./data/keys.json')
const extractData = require('./data/extracts.json')
const ammoData = require('./data/ammo.json')
const lootItemData = require('./data/loot-items.json')
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

    // Add key data
    const keys = actions.addCollection({
      typeName: 'Keys'
    })

    const spawns = actions.addCollection({
      typeName: 'Spawns'
    })

    const unlocks = actions.addCollection({
      typeName: 'Unlocks'
    })

    for (const item of keyData) {
      const spawnIds = []
      const unlockIds = []

      for (const [index, spawn] of item.spawns.entries()) {
        const id = `${item.label}-${index}`
        spawnIds.push(id)

        spawns.addNode({
          id,
          map: spawn.map,
          marker: spawn.marker,
          notes: spawn.notes,
          image: spawn.image,
          video: spawn.video
        })
      }

      for (const [index, unlock] of item.unlocks.entries()) {
        const id = `${item.label}-${index}`
        unlockIds.push(id)

        unlocks.addNode({
          id,
          map: unlock.map,
          marker: unlock.marker,
          notes: unlock.notes,
          image: unlock.image,
          video: unlock.video
        })
      }

      keys.addNode({
        type: item.type,
        label: item.label,
        maps: item.maps,
        spawns: actions.store.createReference('Spawns', spawnIds),
        unlocks: actions.store.createReference('Unlocks', unlockIds)
      })
    }

    // Add extract data
    const extracts = actions.addCollection({
      typeName: 'Extracts'
    })

    for (const item of extractData) {
      extracts.addNode({
        type: item.type,
        label: item.label,
        map: item.map,
        marker: item.marker,
        description: item.description,
        image: item.image,
        extractType: item.extractType,
        extractNotes: item.extractNotes
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

    // Add task item data
    const taskItems = actions.addCollection({
      typeName: 'TaskItems'
    })

    const tasks = actions.addCollection({
      typeName: 'Tasks'
    })

    for (const item of lootItemData.taskItems) {
      const tasksIds = []

      for (const taskItem of item.tasks) {
        const id = `${item.name}-${taskItem.task}`
        tasksIds.push(id)

        tasks.addNode({
          id,
          task: taskItem.task,
          amount: taskItem.amount,
          findInRaid: taskItem.findInRaid
        })
      }

      taskItems.addNode({
        name: item.name,
        tasks: actions.store.createReference('Tasks', tasksIds)
      })
    }

    // Add hideout item data
    const hideoutItems = actions.addCollection({
      typeName: 'HideoutItems'
    })

    const modules = actions.addCollection({
      typeName: 'Modules'
    })

    for (const item of lootItemData.hideoutItems) {
      const moduleIds = []

      for (const moduleItem of item.modules) {
        const id = `${item.name}-${moduleItem.module}`
        moduleIds.push(id)

        modules.addNode({
          id,
          module: moduleItem.module,
          amount: moduleItem.amount
        })
      }

      hideoutItems.addNode({
        name: item.name,
        modules: actions.store.createReference('Modules', moduleIds),
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
