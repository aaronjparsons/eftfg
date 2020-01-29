<template>
  <div :style="{ height: '65vh' }">
    <l-map
      :zoom="mapOptions.zoom"
      :minZoom="mapOptions.zoom"
      :maxZoom="mapOptions.maxZoom"
      :center="center"
      :crs="mapOptions.crs"
    >
      <div class="map-name">{{ activeMap }}</div>
      <l-tile-layer :url="mapSource"></l-tile-layer>
      <l-feature-group ref="markerGroup">
        <l-marker
          v-for="(coord, index) in activeItem.coords"
          :key="index"
          :lat-lng="coord"
        >
          <l-popup>
            <h3>{{ activeItem.name[index] }}</h3>
            <p v-if="activeItem.type">Type: {{ activeItem.type[index] }}</p>
            <p>Notes: {{ activeItem.notes[index] }}</p>
            <v-btn
              :class="{
                strikethrough: !hasMediaContent(activeItem.images, index)
              }"
              color="grey darken-4"
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
              color="grey darken-4"
              @click.stop="openDialog('video', activeItem.videos[index])"
              :disabled="!hasMediaContent(activeItem.videos, index)"
            >
              Video Guide
            </v-btn>
          </l-popup>
        </l-marker>
      </l-feature-group>
    </l-map>
    <v-dialog v-model="popupDialog" width="80vw" @click:outside="closeDialog">
      <div class="image-dialog-container">
        <div class="icon-container">
          <v-icon @click="closeDialog">mdi-close</v-icon>
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
export default {
  props: {
    activeMap: {
      type: String,
      default: ''
    },
    activeItem: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      popupDialog: false,
      imageSource: null,
      videoSource: null,
      mapOptions: {
        zoom: 2,
        maxZoom: 5,
        crs: L.CRS.Simple
      }
    }
  },

  computed: {
    mapSource() {
      return `mapimages/${this.activeMap}/{z}/{x}/{y}.png`
    },
    center() {
      if (this.activeItem.coords.length > 0) {
        const markersLength = this.activeItem.coords.length
        let lats = 0
        let lngs = 0
        this.activeItem.coords.map(marker => {
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
    hasMediaContent(value, index) {
      if (!value) {
        return false
      }
      return value[index].length > 0
    },
    iframeHeight() {
      const windowHeight = window.innerHeight
      return windowHeight * 0.8
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
.map-name {
  position: absolute;
  right: 0;
  padding: 5px 20px;
  background: #434343d8;
  border-bottom-left-radius: 5px;
  font-size: 16px;
  z-index: 150;
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
  color: white;
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
  background-color: #424242;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  position: relative;
  border-radius: 4px;
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
