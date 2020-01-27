<template>
  <Layout>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="input"
          item-text="node.label"
          :items="$page.keySpawns.edges"
          return-object
          solo
          placeholder="Search by key or by map..."
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
  keySpawns: allKeySpawns {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allCustoms: allKeySpawns(filter: {map: {eq: "Customs"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allInterchange: allKeySpawns(filter: {map: {eq: "Interchange"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allShoreline: allKeySpawns(filter: {map: {eq: "Shoreline"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allWoods: allKeySpawns(filter: {map: {eq: "Woods"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allFactory: allKeySpawns(filter: {map: {eq: "Factory"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allReserve: allKeySpawns(filter: {map: {eq: "Reserve"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
      }
    }
  },
  allLabs: allKeySpawns(filter: {map: {eq: "Labs"}, type: {eq: "key"}}) {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        images,
        videos
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
        notes: [],
        name: [],
        images: [],
        videos: []
      }

      if (!this.input.node) {
        return object
      }

      if (this.input.node.type === 'key') {
        return {
          coords: this.input.node.marker.map(item => item.split(',')),
          notes: this.input.node.description,
          name: this.input.node.marker.map(() => this.input.node.label),
          images: this.input.node.images,
          videos: this.input.node.videos
        }
      } else {
        return this.$page[`all${this.input.node.map}`].edges.reduce((obj,item) => {
          obj.coords = [...item.node.marker.map(item => item.split(',')), ...obj.coords]
          obj.notes = [...item.node.description, ...obj.notes]
          obj.name = [...item.node.marker.map(() => item.node.label), ...obj.name],
          obj.images = [...item.node.images, ...obj.images],
          obj.videos = [...item.node.videos, ...obj.videos]
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