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
      <v-col cols="12" sm="10">
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
        popups: [],
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
          popups: [this.input.node.description],
          type: [this.input.node.extractType],
          notes: [this.input.node.extractNotes],
          name: [this.input.node.label],
          images: [this.input.node.image]
        }
      } else {
        return this.$page[`all${this.input.node.map}`].edges.reduce((obj,item) => {
          obj.coords = [item.node.marker, ...obj.coords]
          obj.popups = [item.node.description, ...obj.popups]
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