<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Key Spawns & Use Locations</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption-text mx-12 text-center">
        Escape From Tarkov key spawns & use locations, searchable by specific key or by map.
        <br/>
        Eg: "Factory Key" or "Customs (All Keys)"
        <br/>
        Click the map markers for more info
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="selection"
          item-text="node.label"
          :items="searchList"
          :menu-props="autocompleteMenuProps"
          return-object
          solo
          no-data-text="No keys found..."
          placeholder="Search by key or by map..."
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div v-show="activeMap === 'all'" class="text-center mt-10">
          <h2>This task can be completed on any map</h2>
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
  tasks: allTaskLocations(sortBy: "label", order: ASC) {
    edges {
      node {
        label,
        maps,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
	allCustoms: allTaskLocations(filter: {maps: {contains: "Customs"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allFactory: allTaskLocations(filter: {maps: {contains: "Factory"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allInterchange: allTaskLocations(filter: {maps: {contains: "Interchange"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allWoods: allTaskLocations(filter: {maps: {contains: "Woods"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allShoreline: allTaskLocations(filter: {maps: {contains: "Shoreline"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allLabs: allTaskLocations(filter: {maps: {contains: "Labs"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
          map,
          marker,
          notes,
          image,
          video
        }
      }
    }
  },
  allReserve: allTaskLocations(filter: {maps: {contains: "Reserve"}, type: {eq: "task"}}) {
    edges {
      node {
        label,
        locations {
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
      activeView: 'locations'
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
            label: `${map} (All Tasks)`,
            map,
            locations: 0
          }
        })
      }
      return [...result, ...this.$page.tasks.edges]
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
    },
    autocompleteMenuProps() {
      // default properties copied from the vuetify-autocomplete docs
      let defaultProps = {
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 304
      }

      if (this.$vuetify.breakpoint.smAndDown) {
        defaultProps.maxHeight = 130
      }
      return defaultProps
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
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
  background-color: #161616;
}
.v-autocomplete {
  z-index: 160 !important;
}
.theme--dark.v-list {
  background-color: #161616;
}
.theme--dark.v-card.selected {
  background: #353029 !important;
}
</style>