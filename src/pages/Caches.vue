<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Cache Locations</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption-text mx-12 text-center">
        Escape From Tarkov cache locations for all maps.
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-select
          v-model="input"
          :items="$page.caches.edges"
          item-text="node.map"
          return-object
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <Map :active-map="activeMap" :active-item="activeItem" />
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  caches: allCaches(sortBy: "map", order: ASC) {
    edges {
      node {
        map,
        caches {
          type,
          coords,
          image
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
    title: "EFT Caches",
    link: [{ rel: "canonical", href: "https://eftfg.com/caches" }],
    meta: [
      {
        name: "description",
        content:
          "Quickly find the location of all caches in Escape From Tarkov. Search by each by map"
      },
      { property: "og:title", content: "EFT Extractions | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/caches"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "Quickly find the location of all caches in Escape From Tarkov. Search by each by map"
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/caches"
      },
      { name: "twitter:title", content: "EFT Caches | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Quickly find the location of all caches in Escape From Tarkov. Search by each by map"
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Caches | EFTFG" },
      {
        itemprop: "description",
        content:
          "Quickly find the location of all caches in Escape From Tarkov. Search by each by map"
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
      input: {}
    }
  },

  mounted() {
    this.input = this.$page.caches.edges[0]
  },

  computed: {
    activeItem() {
      const object = {
        markers: [],
        type: [],
        labels: [],
        images: []
      }

      if (!this.input.node) {
        return object
      }

      return this.input.node.caches.reduce((obj,item) => {
          obj.markers = [item.coords, ...obj.markers],
          obj.type = [item.type, ...obj.type],
          obj.labels = ['Cache', ...obj.labels]
          obj.images = [item.image, ...obj.images]
          return obj
        }, object)
    },
    activeMap() {
      if (this.input.node) {
        return this.input.node.map
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
  }
}
</script>

<style>
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
  background-color: #161616;
}
.v-menu__content {
  z-index: 160 !important;
}
.theme--dark.v-list {
  background-color: #161616;
}
</style>