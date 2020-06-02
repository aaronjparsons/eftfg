<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Extractions</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Escape From Tarkov extract locations, searchable by specific extract or by map.
      </p>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Eg: "RUAF Roadblock" or "Customs (All Extractions)"
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="input"
          item-text="node.label"
          :items="$page.extracts.edges"
          :menu-props="autocompleteMenuProps"
          return-object
          solo
          no-data-text="No extracts found..."
          placeholder="Search by extract or by map..."
        />
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
  extracts: allExtracts(sortBy: "label", order: ASC) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allCustoms: allExtracts(filter: {map: {eq: "Customs"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allInterchange: allExtracts(filter: {map: {eq: "Interchange"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allShoreline: allExtracts(filter: {map: {eq: "Shoreline"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allWoods: allExtracts(filter: {map: {eq: "Woods"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allFactory: allExtracts(filter: {map: {eq: "Factory"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allReserve: allExtracts(filter: {map: {eq: "Reserve"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  },
  allLabs: allExtracts(filter: {map: {eq: "Labs"}, type: {eq: "extract"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  }
}
</page-query>

<script>
import Map from '../components/Map'
export default {
  metaInfo: {
    title: "EFT Extractions",
    link: [{ rel: "canonical", href: "https://eftfg.com/extractions" }],
    meta: [
      {
        name: "description",
        content:
          "Quickly find the location of any Escape From Tarkov extraction point. Search by extract or view all extracts by map (eg: All Customs Extracts)."
      },
      { property: "og:title", content: "EFT Extractions | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/extractions"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "Quickly find the location of any Escape From Tarkov extraction point. Search by extract or view all extracts by map (eg: All Customs Extracts)."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/extractions"
      },
      { name: "twitter:title", content: "EFT Extractions | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Quickly find the location of any Escape From Tarkov extraction point. Search by extract or view all extracts by map (eg: All Customs Extracts)."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Extractions | EFTFG" },
      {
        itemprop: "description",
        content:
          "Quickly find the location of any Escape From Tarkov extraction point. Search by extract or view all extracts by map (eg: All Customs Extracts)."
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

  computed: {
    activeItem() {
      const object = {
        markers: [],
        type: [],
        notes: [],
        labels: [],
        images: []
      }

      if (!this.input.node) {
        return object
      }

      if (this.input.node.type === 'extract') {
        return {
          markers: [this.input.node.marker],
          type: [this.input.node.extractType],
          notes: [this.input.node.extractNotes],
          labels: [this.input.node.label],
          images: [this.input.node.image]
        }
      } else {
        return this.$page[`all${this.input.node.map}`].edges.reduce((obj,item) => {
          obj.markers = [item.node.marker, ...obj.markers]
          obj.type = [item.node.extractType, ...obj.type],
          obj.notes = [item.node.extractNotes, ...obj.notes]
          obj.labels = [item.node.label, ...obj.labels]
          obj.images = [item.node.image, ...obj.images]
          return obj
        }, object)
      }
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
.v-autocomplete {
  z-index: 160;
}
</style>