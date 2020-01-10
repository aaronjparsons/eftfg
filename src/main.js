// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import DefaultLayout from '~/layouts/Default.vue'
import "vuetify/dist/vuetify.min.css"

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

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
