<template>
  <div :class="{ 'map-dark': isDarkMode }" :style="{ height: '65vh' }">
    <ClientOnly>
      <l-map
        ref="map"
        :zoom="mapOptions.zoom"
        :minZoom="mapOptions.zoom"
        :maxZoom="mapOptions.maxZoom"
        :center="center"
        :crs="crsSimple"
        @click="mapClick"
      >
        <div v-show="availableMaps.length" class="map-names">
          <div class="map-names-header">Select a map:</div>
          <div
            v-for="(map, index) in availableMaps"
            :key="index"
            class="map-name-item"
            :class="{ 'map-unselected': activeMap !== map }"
            @click="emitMapChange(map)"
          >
            {{ map }}
          </div>
        </div>
        <l-tile-layer :url="mapSource"></l-tile-layer>
        <l-feature-group ref="markerGroup">
          <l-marker
            v-for="(marker, index) in activeItem.markers"
            :key="index"
            :lat-lng="marker"
          >
            <l-popup>
              <h3>{{ activeItem.labels[index] }}</h3>
              <p v-if="activeItem.type">Type: {{ activeItem.type[index] }}</p>
              <p>Notes: {{ activeItem.notes[index] }}</p>
              <v-btn
                :class="{
                  strikethrough: !hasMediaContent(activeItem.images, index)
                }"
                @click.stop="openDialog('image', activeItem.images[index])"
                :disabled="!hasMediaContent(activeItem.images, index)"
              >
                Screenshot
              </v-btn>
              <v-btn
                class="ml-2"
                :class="{
                  strikethrough: !hasMediaContent(activeItem.videos, index)
                }"
                @click.stop="openDialog('video', activeItem.videos[index])"
                :disabled="!hasMediaContent(activeItem.videos, index)"
              >
                Video Guide
              </v-btn>
            </l-popup>
          </l-marker>
        </l-feature-group>
      </l-map>
    </ClientOnly>
    <v-dialog v-model="popupDialog" width="80vw" @click:outside="closeDialog">
      <div class="image-dialog-container">
        <div class="icon-container">
          <v-icon color="white" @click="closeDialog">mdi-close</v-icon>
        </div>
        <v-img v-if="imageSource" :src="imageSource" contain>
          <template v-slot:placeholder>
            <v-row justify="center" align="center" :style="{ height: '100%' }">
              <v-progress-circular indeterminate />
            </v-row>
          </template>
        </v-img>
        <iframe
          v-if="videoSource"
          :height="iframeHeight()"
          width="100%"
          :src="`https://www.youtube.com/embed/${videoSource}`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </v-dialog>
  </div>
</template>

<script>
let L = {}
let Vue2Leaflet = {}

if (process.isClient) {
  Vue2Leaflet = require('vue2-leaflet')
  L = require('leaflet')
  const Icon = L.Icon
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: require('../../static/mapmarker.png'),
    iconUrl: require('../../static/mapmarker.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    iconSize: [30, 35],
    iconAnchor: [15, 35]
  })
}

export default {
  components: {
    'l-map': Vue2Leaflet.LMap,
    'l-tile-layer': Vue2Leaflet.LTileLayer,
    'l-marker': Vue2Leaflet.LMarker,
    'l-popup': Vue2Leaflet.LPopup,
    'l-feature-group': Vue2Leaflet.LFeatureGroup
  },

  props: {
    activeMap: {
      type: String,
      default: ''
    },
    activeItem: {
      type: Object,
      default: () => {}
    },
    availableMaps: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      popupDialog: false,
      imageSource: null,
      videoSource: null,
      mapOptions: {
        zoom: 2,
        maxZoom: 5
      }
    }
  },

  computed: {
    isDarkMode() {
      return this.$store.state.darkMode
    },
    crsSimple() {
      if (process.isClient) {
        return L.CRS.Simple
      }
      return {}
    },
    mapSource() {
      if (this.activeMap && this.activeMap !== 'all') {
        return `mapimages/${this.activeMap}/{z}/{x}/{y}.png`
      } else {
        return ''
      }
    },
    center() {
      if (this.activeItem.markers.length > 0) {
        const markersLength = this.activeItem.markers.length
        let lats = 0
        let lngs = 0
        this.activeItem.markers.map(marker => {
          lats += parseInt(marker[0])
          lngs += parseInt(marker[1])
        })
        return [lats / markersLength, lngs / markersLength]
      } else {
        return [0, 0]
      }
    }
  },

  methods: {
    mapClick(event) {
      console.log(`${event.latlng.lat},${event.latlng.lng}`)
    },
    emitMapChange(map) {
      this.$emit('changeActiveMap', map)
    },
    hasMediaContent(value, index) {
      if (!value) {
        return false
      }
      return value[index].length > 0
    },
    iframeHeight() {
      if (process.isClient) {
        const windowHeight = window.innerHeight
        return windowHeight * 0.8
      }
    },
    openDialog(type, source) {
      if (type === 'image') {
        this.imageSource = source
      } else {
        this.videoSource = source
      }
      this.popupDialog = true
    },
    closeDialog() {
      this.imageSource = null
      this.videoSource = null
      this.popupDialog = false
    }
  }
}
</script>

<style>
.map-names {
  position: absolute;
  right: 0;
  background: #ffffffd8;
  border-bottom-left-radius: 5px;
  font-family: 'Bender Regular', 'Roboto', 'sans serif';
  font-size: 16px;
  z-index: 150;
}
.map-dark .map-names {
  background: #161616af;
}
.map-names .map-names-header {
  background: #e0e0e0;
  padding: 5px 20px;
  margin-bottom: 5px;
}
.map-dark .map-names .map-names-header {
  background: #968465bb;
  color: #000000;
}
.map-names .map-name-item {
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  background: #dbdbdbd8;
  text-align: center;
  text-decoration: underline;
}
.map-dark .map-names .map-name-item {
  background: #353029;
  color: white;
}
.map-names .map-name-item:hover {
  cursor: pointer;
}
.map-names .map-unselected {
  color: #0000006b;
  background: transparent;
  text-decoration: none;
}
.map-dark .map-names .map-unselected {
  color: #ffffff63;
  background: transparent;
  text-decoration: none;
}
.image-dialog-container {
  position: relative;
}
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 250;
  transition: all 300ms;
  background: #424242d0;
  border-radius: 20px;
  padding: 5px;
}
.icon-container:hover {
  transform: scale(1.2);
}
.icon-container i {
  font-size: 30px;
}

.strikethrough {
  text-decoration: line-through;
}
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: #313131 !important;
}

.leaflet-container {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  position: relative;
  border-radius: 4px;
  background-color: #ffffff;
  background-image: linear-gradient(rgba(21, 21, 24, 0.1) 2px, transparent 2px),
  linear-gradient(90deg, rgba(21, 21, 24, 0.1) 2px, transparent 2px),
  linear-gradient(rgba(21, 21, 24, 0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(21, 21, 24, 0.1) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position:-2px -2px, -2px -2px, -1px -1px, -1px -1px;
}
.map-dark .leaflet-container {
  background-color: #161616;
  background-image: linear-gradient(rgba(150, 132, 101, 0.1) 2px, transparent 2px),
  linear-gradient(90deg, rgba(150, 132, 101, 0.1) 2px, transparent 2px),
  linear-gradient(rgba(150, 132, 101, 0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(150, 132, 101, 0.1) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
  background-position:-2px -2px, -2px -2px, -1px -1px, -1px -1px;
}

.map-dark .leaflet-popup-content-wrapper {
  background: #968465;
  color: #000000;
  font-family: 'Bender Regular', 'Roboto', 'sans serif';
}
.map-dark .leaflet-popup-tip {
  background: #968465;
}
.map-dark .leaflet-popup .leaflet-popup-close-button {
  color: #000000;
}
.map-dark .leaflet-bar a {
  background: #212121;
  border-bottom: 1px solid #4b4b4b;
}
.map-dark .leaflet-bar a:hover:not(.leaflet-disabled) {
  background: #4b4b4b;
  border-bottom: 1px solid #4b4b4b;
}
.map-dark .leaflet-bar a.leaflet-disabled {
  background: #353535;
}
.map-dark .leaflet-container .leaflet-control-attribution {
  background: #434343d8;
  border-top-left-radius: 5px;
}

/* Leaflet z-index overrides */
.leaflet-pane {
  z-index: 110 !important;
} /* 400 */
.leaflet-tile-pane {
  z-index: 105 !important;
} /* 200 */
.leaflet-overlay-pane {
  z-index: 110 !important;
} /* 400 */
.leaflet-shadow-pane {
  z-index: 115 !important;
} /* 500 */
.leaflet-marker-pane {
  z-index: 120 !important;
} /* 600 */
.leaflet-tooltip-pane {
  z-index: 125 !important;
} /* 650 */
.leaflet-popup-pane {
  z-index: 130 !important;
} /* 700 */
.leaflet-map-pane canvas {
  z-index: 100 !important;
} /* 100 */
.leaflet-map-pane svg {
  z-index: 105 !important;
} /* 200 */
.leaflet-control {
  z-index: 135 !important; /* 800 */
}
.leaflet-top,
.leaflet-bottom {
  z-index: 150 !important; /* 1000 */
}
</style>
