// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import DefaultLayout from '~/layouts/Default.vue'
import 'vuetify/dist/vuetify.min.css'
import { LMap, LTileLayer, LMarker, LPopup, LFeatureGroup } from 'vue2-leaflet'
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

export default function (Vue, { head, appOptions }) {
  // Material icons
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
  })

  // Vuetify
  const opts = {} //opts includes, vuetify themes, icons, etc
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(opts)

  // Leaflet
  Vue.component("l-map", LMap)
  Vue.component("l-tile-layer", LTileLayer)
  Vue.component("l-marker", LMarker)
  Vue.component("l-popup", LPopup)
  Vue.component("l-feature-group", LFeatureGroup)

  delete Icon.Default.prototype._getIconUrl

  Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png")
  })

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
