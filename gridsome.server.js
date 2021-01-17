// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const changelogData = require('./data/changelog.json')
const wikiData = require('./data/wiki-data.json')
const keyData = require('./data/keys.json')
const taskData = require('./data/tasks.json')
const extractData = require('./data/extracts.json')
const cacheData = require('./data/caches.json')
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

    // Add task location data
    const taskLocations = actions.addCollection({
      typeName: 'TaskLocations'
    })

    const locations = actions.addCollection({
      typeName: 'Locations'
    })

    for (const item of taskData) {
      const locationIds = []

      for (const [index, location] of item.locations.entries()) {
        const id = `${item.label}-${index}`
        locationIds.push(id)

        locations.addNode({
          id,
          map: location.map,
          marker: location.marker,
          notes: location.notes,
          image: location.image,
          video: location.video
        })
      }

      taskLocations.addNode({
        type: item.type,
        label: item.label,
        maps: item.maps,
        locations: actions.store.createReference('Locations', locationIds),
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

    // Add cache data
    const cacheMaps = actions.addCollection({
      typeName: 'Caches'
    })

    const singleCache = actions.addCollection({
      typeName: 'SingleCache'
    })

    for (const map of cacheData) {
      const cacheIds = []

      for (const [index, cache] of map.caches.entries()) {
        const id = `${map.map}-${index}`

        cacheIds.push(id)

        singleCache.addNode({
          id,
          type: cache.type,
          coords: cache.coords,
          image: cache.image
        })
      }

      cacheMaps.addNode({
        map: map.map,
        caches: actions.store.createReference('SingleCache', cacheIds)
      })
    }

    // Add ammo data
    const ammo = actions.addCollection({
      typeName: 'Ammo'
    })

    for (const item of ammoData.ammo) {
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

    // Add ammo changes data
    const ammoChanges = actions.addCollection({
      typeName: 'AmmoChanges'
    })

    for (const item of ammoData.changes) {
      ammoChanges.addNode({
        name: item.name,
        damage: item.damage || '',
        penetration: item.penetration || '',
        armorDamage: item.armorDamage || '',
        accuracy: item.accuracy || '',
        recoil: item.recoil || '',
        fragmentation: item.fragmentation || ''
      })
    }

    // Add task item data
    const requiredItems = actions.addCollection({
      typeName: 'RequiredItems'
    })

    const tasks = actions.addCollection({
      typeName: 'Tasks'
    })

    const modules = actions.addCollection({
      typeName: 'Modules'
    })

    for (const item of lootItemData) {
      const tasksIds = []
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

      requiredItems.addNode({
        name: item.name,
        tasks: actions.store.createReference('Tasks', tasksIds),
        modules: actions.store.createReference('Modules', moduleIds)
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
