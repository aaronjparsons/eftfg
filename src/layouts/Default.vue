<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list nav>
        <v-list-item v-for="item in navItems" link :to="item.route">
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
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>EFT Field Guide</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
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
          route: '/contentcreators',
          icon: 'mdi-youtube-subscription',
          label: 'Content Creators'
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

<style>
body {
  font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
  padding:0;
  line-height: 1.5;
}

.layout {
  max-width: 760px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
