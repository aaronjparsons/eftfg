<template>
  <v-card>
    <v-card-title class="headline font-weight-bold grey darken-4">
      EFTFG Updates
    </v-card-title>
    <v-card-text>
      <p class="font-weight-bold">Updated: Jan 1 2020</p>
      <ul>
        <li v-for="(item, index) in $static.changelogs.edges[0].node.summary" :key="index">
          {{ item }}
        </li>
      </ul>
      <v-divider />
      <v-dialog v-model="changelogDialog" width="750" scrollable>
        <template v-slot:activator="{ on }">
          <v-btn color="grey darken-4" v-on="on">
            View Full Changelog
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4" primary-title>
            EFTFG Full Changelog
          </v-card-title>
          <v-card-text>
            <div v-for="(update, index) in $static.changelogs.edges" :key="index">
              <h4>
                {{ formatDate(update.node.date) }}
              </h4>
              <ul>
                <li v-for="(change,index) in update.node.changes" :key="`${update.node.date}-${index}`">
                  {{ change }}
                </li>
              </ul>
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="changelogDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-divider />
      <p>If you notice any errors on the site or have a feature request, tweet at me!</p>
      <a class="link" href="https://twitter.com/ChewyDinosaur">
        @ChewyDinosaur
      </a>
    </v-card-text>
  </v-card>
</template>

<static-query>
query {
  changelogs: allChangelog {
    edges {
      node {
        date,
        summary,
        changes
      }
    }
  }
}
</static-query>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return {
      changelogDialog: false
    }
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'LLLL do, y')
    }
  }
}
</script>

<style>

</style>