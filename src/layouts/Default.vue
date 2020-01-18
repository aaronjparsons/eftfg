<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list nav>
        <v-list-item v-for="(item, index) in navItems" :key="index" link :to="item.route">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      class="grey darken-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>EFT Field Guide</v-toolbar-title>
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
      source: String,
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
          route: '/keyspawns',
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
          route: '/checklists',
          icon: 'mdi-checkbox-marked',
          label: 'Checklists'
        },
        {
          route: '/resources',
          icon: 'mdi-folder',
          label: 'More Resources'
        }
      ]
    }),

    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>

<style></style>
