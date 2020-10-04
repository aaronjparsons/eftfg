import Vuex from 'vuex'
// import VueApexCharts from 'vue-apexcharts'
import Vuetify from 'vuetify'
import DefaultLayout from '~/layouts/Default.vue'
import 'vuetify/dist/vuetify.min.css'
import '../node_modules/leaflet/dist/leaflet.css'

export default function (Vue, { head, appOptions }) {
  // Vuex
  Vue.use(Vuex)

  // Apexcharts
  if (process.isClient) {
    const VueApexCharts = require('vue-apexcharts')

    Vue.use(VueApexCharts)
    Vue.component('ApexChart', VueApexCharts)
  }

  appOptions.store = new Vuex.Store({
    state: {
      darkMode: true,
      marketItems: [],
      topMarketItems: []
    },
    mutations: {
      TOGGLE_DARKMODE(state) {
        state.darkMode = !state.darkMode
      },
      SET_MARKET_ITEMS(state, items) {
        state.marketItems = items.data;
        state.topMarketItems = items.top;
      }
    },
    actions: {
      toggleDarkmode({ commit }) {
        commit('TOGGLE_DARKMODE')
      },
      setMarketItems({ commit }, items) {
        commit('SET_MARKET_ITEMS', items)
      }
    }
  })

  // Material icons
  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css'
  })

  head.script.push({
    async: true,
    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  })

  // Vuetify
  const opts = {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#968465',
          secondary: '#212121',
          anchor: '#ffffffb3'
        },
        light: {
          secondary: '#e4e4e4',
          anchor: '#00000099'
        }
      }
    }
  } //opts includes, vuetify themes, icons, etc
  Vue.use(Vuetify)
  appOptions.vuetify = new Vuetify(opts)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
