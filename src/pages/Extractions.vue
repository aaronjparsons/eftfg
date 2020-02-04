<template>
  <Layout>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="input"
          item-text="node.label"
          :items="$page.extracts.edges"
          return-object
          solo
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
  extracts: allExtracts {
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
    title: "Extractions",
    link: [{ rel: "canonical", href: "https://eftfg.com/extractions" }],
    meta: [
      {
        name: "description",
        content:
          "Map locations for every extraction point in Escape From Tarkov. Quickly and easily search by extraction name or by map."
      },
      { property: "og:title", content: "Extractions | EFTFG" },
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
          "Map locations for every extraction point in Escape From Tarkov. Quickly and easily search by extraction name or by map."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/extractions"
      },
      { name: "twitter:title", content: "Extractions | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Map locations for every extraction point in Escape From Tarkov. Quickly and easily search by extraction name or by map."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "Extractions | EFTFG" },
      {
        itemprop: "description",
        content:
          "Map locations for every extraction point in Escape From Tarkov. Quickly and easily search by extraction name or by map."
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
        coords: [],
        type: [],
        notes: [],
        name: [],
        images: []
      }

      if (!this.input.node) {
        return object
      }

      if (this.input.node.type === 'extract') {
        return {
          coords: [this.input.node.marker],
          type: [this.input.node.extractType],
          notes: [this.input.node.extractNotes],
          name: [this.input.node.label],
          images: [this.input.node.image]
        }
      } else {
        return this.$page[`all${this.input.node.map}`].edges.reduce((obj,item) => {
          obj.coords = [item.node.marker, ...obj.coords]
          obj.type = [item.node.extractType, ...obj.type],
          obj.notes = [item.node.extractNotes, ...obj.notes]
          obj.name = [item.node.label, ...obj.name]
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
    }
  }
}
</script>

<style>
.v-autocomplete {
  z-index: 160;
}
</style>