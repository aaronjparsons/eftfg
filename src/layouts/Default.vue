<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped color="#161616">
      <v-list nav>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon class="primary--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <g-link class="primary--text" :to="item.route">{{ item.label }}</g-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!--
      <template v-slot:append>
        <v-row class="pb-4" justify="center">
          <a
            class="bmc-button"
            :class="{ 'bmc-dark': isDarkMode }"
            target="_blank"
            href="https://www.buymeacoffee.com/ChewyDinosaur"
            rel="noopener"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span style="margin-left:15px;font-size:28px !important;">
              Buy me a coffee
            </span>
          </a>
        </v-row>
      </template>
      -->
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="black">
      <v-app-bar-nav-icon class="primary--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="primary--text" :style="{ 'font-family': 'Bender Black', 'font-size': '2rem' }">EFT Field Guide</v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn icon class="mr-1" @click="toggleDarkMode">
        <v-icon v-if="isDarkMode">mdi-weather-night</v-icon>
        <v-icon v-else>mdi-weather-sunny</v-icon>
      </v-btn> -->
      </div>
    </v-app-bar>

    <v-content>
      <v-container :style="{ 'max-width': '1185px' }">
        <slot />
        <div :style="{ 'padding': '10px 0' }">
          <ins
            class="adsbygoogle"
            style="display:inline-block;width:728px;height:90px"
            data-ad-client="ca-pub-2143532549719007"
            data-ad-slot="1581579401"
          ></ins>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    navItems: [
      {
        route: '/',
        icon: 'mdi-view-dashboard',
        label: 'Home'
      },
      {
        route: '/keys',
        icon: 'mdi-key',
        label: 'Keys'
      },
      {
        route: '/extractions',
        icon: 'mdi-map',
        label: 'Extractions'
      },
      {
        route: '/ammo',
        icon: 'mdi-poll-box',
        label: 'Ammo Chart'
      },
      {
        route: '/items',
        icon: 'mdi-checkbox-marked',
        label: 'Required Items'
      },
      {
        route: '/resources',
        icon: 'mdi-folder',
        label: 'More Resources'
      }
    ]
  }),

  created() {
    this.$vuetify.theme.dark = this.isDarkMode
  },

  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  },

  computed: {
    isDarkMode() {
      return this.$store.state.darkMode
    }
  },

  methods: {
    toggleDarkMode() {
      this.$store.dispatch('toggleDarkmode')
      this.$vuetify.theme.dark = this.isDarkMode
    }
  }
}
</script>

<style>
@import '../../static/fonts/style.css';
@import url('https://fonts.googleapis.com/css?family=Cookie&display=swap');

.theme--dark.v-application {
  background-image: linear-gradient(135deg, #11100e 14.29%, #0c0c0c 14.29%, #0c0c0c 50%, #11100e 50%, #11100e 64.29%, #0c0c0c 64.29%, #0c0c0c 100%) !important;
  background-size: 9.90px 9.90px !important;
  color: #968465 !important;
  font-family: 'Bender Regular', 'Roboto', 'sans serif';
}
.caption-text {
  color: #968465 !important;
  font-size: 0.85rem;
  font-family: 'Bender Regular', 'Roboto', 'sans serif';
}

.v-list-item--link::before {
  background-color: #968465 !important;
}

.v-navigation-drawer {
  z-index: 170 !important;
}
.v-navigation-drawer a {
  text-decoration: none;
}

.v-app-bar {
  z-index: 165 !important;
}

.theme--dark.v-card {
  background-color: #161616 !important;
}
.card-header {
  background-color: #000000;
  color: #968465;
  font-family: 'Bender Bold', 'Roboto', 'sans serif';
  font-size: 1.75rem !important;
}

.bmc-button img {
  width: 35px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}
.bmc-button {
  color: #968465 !important;
  padding: 7px 10px 7px 10px !important;
  line-height: 35px !important;
  height: 51px !important;
  min-width: 217px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  background-color: #e4e4e4;
  border-radius: 5px !important;
  border: 1px solid transparent !important;
  padding: 7px 10px 7px 10px !important;
  font-size: 22px !important;
  letter-spacing: 0.6px !important;
  margin: 0 auto !important;
  font-family: 'Cookie', cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;
}
.bmc-dark {
  background-color: #000000;
}
.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  -webkit-box-shadow: 0px 1px 2px 2px #9684659d !important;
  text-decoration: none !important;
  box-shadow: 0px 1px 2px 2px #9684659d !important;
  opacity: 0.85 !important;
}
</style>
