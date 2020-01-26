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
      <v-col cols="12" sm="10" :style="{ height: '65vh' }">
        <l-map
          :zoom="mapOptions.zoom"
          :minZoom="mapOptions.zoom"
          :maxZoom="mapOptions.maxZoom"
          :center="center"
          :crs="mapOptions.crs"
        >
          <!-- <div class="map-name">{{ activeMapName }}</div> -->
          <l-tile-layer :url="activeMap"></l-tile-layer>
          <l-feature-group ref="markerGroup">
            <l-marker
              v-for="(coord, index) in activeItem.coords"
              :key="index"
              :lat-lng="coord"
            >
              <l-popup>
                <h3>{{ activeItem.name[index] }}</h3>
                <p>Type: {{ activeItem.type[index] }}</p>
                <p>Notes: {{ activeItem.notes[index] }}</p>
                <!-- <v-btn
                  v-if="hasMediaContent(activeItem.images[index])"
                  dark
                  @click="openDialog('image', activeItem.images[index])"
                  :disabled="!hasMediaContent(activeItem.images[index])"
                  >Screenshot</v-btn
                > -->
              </l-popup>
            </l-marker>
          </l-feature-group>
        </l-map>
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
export default {
  data() {
    return {
      input: {},
      mapOptions: {
        zoom: 2,
        maxZoom: 5,
        crs: L.CRS.Simple
      }
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
        return `mapimages/${this.input.node.map}/{z}/{x}/{y}.png`;
      } else {
        return "";
      }
    },
    center() {
      if (this.activeItem.coords.length > 0) {
        const markersLength = this.activeItem.coords.length;
        let lats = 0;
        let lngs = 0;
        this.activeItem.coords.map(marker => {
          lats += marker[0];
          lngs += marker[1];
        });
        return [lats / markersLength, lngs / markersLength];
      } else {
        return [0, 0];
      }
    }
  }
}
</script>

<style>

</style>