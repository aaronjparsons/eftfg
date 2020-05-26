<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Key Spawns & Use Locations</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Escape From Tarkov key spawns & use locations, searchable by specific key or by map.
      </p>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Eg: "Factory Key" or "Customs (All Keys)"
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="selection"
          item-text="node.label"
          :items="searchList"
          return-object
          solo
          placeholder="Search by key or by map..."
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card
          link
          class="text-center"
          :class="{ unselected: activeView !== 'spawns' }"
          @click="setActiveView('spawns')"
        >
          <v-card-text>
            Key Spawn Locations(s)
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          link
          class="text-center"
          :class="{ unselected: activeView !== 'unlocks' }"
          @click="setActiveView('unlocks')"
        >
          <v-card-text>
            Key Use Location(s)
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div v-show="activeMap === 'all'" class="text-center mt-10">
          <div v-if="activeView === 'spawns'">
            <h2>{{ allMapsLabel }} has no set spawn location</h2>
            <p>{{ allMapsNotes }}</p>
          </div>
          <div v-else>
            <h2>{{ allMapsLabel }} does not have a use</h2>
            <p>{{ allMapsNotes }}</p>
          </div>
        </div>
        <Map
          v-show="activeMap !== 'all'"
          :active-map="activeMap"
          :active-item="activeItem"
          :available-maps="availableMaps"
          @changeActiveMap="changeActiveMap"
        />
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  keys: allKeys(sortBy: "label", order: ASC) {
    edges {
      node {
        label,
        maps,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
	allCustoms: allKeys(filter: {maps: {contains: "Customs"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allFactory: allKeys(filter: {maps: {contains: "Factory"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allInterchange: allKeys(filter: {maps: {contains: "Interchange"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allWoods: allKeys(filter: {maps: {contains: "Woods"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allShoreline: allKeys(filter: {maps: {contains: "Shoreline"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allLabs: allKeys(filter: {maps: {contains: "Labs"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allReserve: allKeys(filter: {maps: {contains: "Reserve"}, type: {eq: "key"}}) {
    edges {
      node {
        label,
        spawns {
          map,
          marker,
          notes,
          image,
          video
        },
        unlocks {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  }
}
</page-query>

<script>
import Map from '../components/Map'

export default {
  metaInfo: {
    title: "EFT Key Spawns & Locations",
    link: [{ rel: "canonical", href: "https://eftfg.com/keys" }],
    meta: [
      {
        name: "description",
        content:
          "The fastest way to find Escape From Tarkov key spawns and lock locations. Always up to date with all EFT key spawns."
      },
      { property: "og:title", content: "EFT Key Spawns & Locations | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/keys"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "The fastest way to find Escape From Tarkov key spawns and lock locations. Always up to date with all EFT key spawns."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/keys"
      },
      { name: "twitter:title", content: "EFT Key Spawns & Locations | EFTFG" },
      {
        name: "twitter:description",
        content:
          "The fastest way to find Escape From Tarkov key spawns and lock locations. Always up to date with all EFT key spawns."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Key Spawns & Locations | EFTFG" },
      {
        itemprop: "description",
        content:
          "The fastest way to find Escape From Tarkov key spawns and lock locations. Always up to date with all EFT key spawns."
      }
      // {
      //   itemprop: "image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // }
    ]
  },

  components: {
    Map
  },

  data() {
    return {
      selection: {},
      activeItem: {
        label: '',
        markers: [],
        notes: [],
        images: [],
        videos: []
      },
      activeMap: '',
      availableMaps: [],
      activeView: 'spawns'
    }
  },

  watch: {
    selection: function(newSelection) {
      this.setActiveItem(newSelection)
    }
  },

  computed: {
    searchList() {
      const result = []
      const maps = ['Customs', 'Factory', 'Interchange', 'Labs', 'Reserve', 'Shoreline', 'Woods']
      for (const map of maps) {
        result.push({
          node: {
            type: 'map',
            label: `${map} (All Keys)`,
            map,
            spawns: 0,
            unlocks: 0
          }
        })
      }
      return [...result, ...this.$page.keys.edges]
    },
    allMapsLabel() {
      if (this.selection.node && this.selection.node.label) {
        return this.selection.node.label
      } else {
        return ''
      }
    },
    allMapsNotes() {
      if (this.selection.node && this.selection.node[this.activeView] && this.selection.node[this.activeView][0]) {
        return this.selection.node[this.activeView][0].notes
      } else {
        return ''
      }
    }
  },

  methods: {
    setActiveView(view) {
      this.activeView = view
      this.setActiveItem(this.selection)
    },
    setActiveItem(selectedItem) {
      this.availableMaps = []

      if (selectedItem.node.type && selectedItem.node.type === 'map') {
        this.activeMap = selectedItem.node.map
        this.setMapItem()
      } else {
        this.activeMap = selectedItem.node[this.activeView][0].map
        this.setIndividualItem(selectedItem)
      }
    },
    setMapItem() {
      const object = {
        labels: [],
        markers: [],
        notes: [],
        images: [],
        videos: []
      }
      const items = this.$page[`all${this.activeMap}`]
      for (const item of items.edges) {
        for (const instance of item.node[this.activeView]) {
          if (instance.map === this.activeMap) {
            object.labels.push(item.node.label)
            object.notes.push(instance.notes)
            object.images.push(instance.image)
            object.videos.push(instance.video)

            if (instance.marker) {
              const markers = instance.marker.split(',')
              object.markers.push([parseFloat(markers[0]), parseFloat(markers[1])])
            }
          }
        }
      }

      this.activeItem = object
    },
    setIndividualItem(selectedItem) {
      const object = {
        labels: [],
        markers: [],
        notes: [],
        images: [],
        videos: []
      }
      const allMaps = []

      for (const item of selectedItem.node[this.activeView]) {
        if (!allMaps.includes(item.map)) {
          allMaps.push(item.map)
        }

        if (item.map === this.activeMap) {
          object.labels.push(selectedItem.node.label)
          object.notes.push(item.notes)
          object.images.push(item.image)
          object.videos.push(item.video)

          if (item.marker) {
            const markers = item.marker.split(',')
            object.markers.push([parseFloat(markers[0]), parseFloat(markers[1])])
          }
        }
      }

      this.availableMaps = allMaps
      this.activeItem = object
    },
    changeActiveMap(map) {
      this.activeMap = map
      this.setIndividualItem(this.selection)
    }
  }
}
</script>

<style>
.v-autocomplete {
  z-index: 160 !important;
}
.unselected {
  background: #3f3f3f44 !important;
}
</style>