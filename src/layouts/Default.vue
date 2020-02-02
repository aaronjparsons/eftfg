<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list nav>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-row class="pb-4" justify="center">
          <a
            class="bmc-button"
            :class="{ 'bmc-dark': isDarkMode }"
            target="_blank"
            href="https://www.buymeacoffee.com/ChewyDinosaur"
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
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="secondary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>EFT Field Guide</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon class="mr-1" @click="toggleDarkMode">
        <v-icon v-if="isDarkMode">mdi-weather-night</v-icon>
        <v-icon v-else>mdi-weather-sunny</v-icon>
      </v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <v-container>
        <slot />
      </v-container>
    </v-content>
  </v-app>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

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
        route: '/key-spawns',
        icon: 'mdi-key',
        label: 'Key Spawns'
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
        route: '/required-items',
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
@import url('https://fonts.googleapis.com/css?family=Cookie&display=swap');

.v-navigation-drawer {
  z-index: 170 !important;
}

.bmc-button img {
  width: 35px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}
.bmc-button {
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
  background-color: #212121;
}
.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  -webkit-box-shadow: 0px 1px 2px 2px rgba(56, 56, 56, 0.75) !important;
  text-decoration: none !important;
  box-shadow: 0px 1px 2px 2px rgba(56, 56, 56, 0.75) !important;
  opacity: 0.85 !important;
}
</style>
