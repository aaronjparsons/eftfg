<template>
  <Layout>
    <v-row>
      <v-col sm="6" cols="12" class="flex-column">

        <!-- Game Version Card -->
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4">
            Current Game Version
          </v-card-title>
          <v-card-text>
            <h2>01.01.1000</h2>
            <p>Updated: Jan 01 2020</p>
            <v-divider />
            <a
              href="https://escapefromtarkov.gamepedia.com/Changelog"
              target="_blank"
            >
              Click here to read the change log over on the Escape From Tarkov
              Wiki.
            </a>
          </v-card-text>
        </v-card>

        <!-- EFTFG Updates Card -->
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4">
            EFTFG Updates
          </v-card-title>
          <v-card-text>
            <p class="font-weight-bold">Updated: Jan 1 2020</p>
            <ul>
              <li v-for="(item, index) in $page.changelogs.edges[0].node.summary" :key="index">
                {{ item }}
              </li>
            </ul>
            <v-divider />
            <v-dialog v-model="changelogDialog" width="750" scrollable>
              <template v-slot:activator="{ on }">
                <v-btn color="red lighten-2" v-on="on">
                  Click Me
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline font-weight-bold grey darken-4" primary-title>
                  EFTFG Full Changelog
                </v-card-title>
                <v-card-text>
                  <div v-for="(update, index) in $page.changelogs.edges" :key="index">
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
                    I accept
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
      </v-col>
      <v-col sm="6" cols="12">

        <!-- BSG Twitter Feed -->
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4">
            BSG Twitter Feed
          </v-card-title>
          <v-card-text>
            <a
              class="twitter-timeline"
              href="https://twitter.com/bstategames"
              data-height="550"
              data-theme="dark"
              data-chrome="transparent"
            ></a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">

        <!-- Reddit Card -->
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4">
            Reddit Posts From r/EscapeFromTarkov
          </v-card-title>
          <v-card-text>
            <v-list v-if="redditDataLoading">
              <v-skeleton-loader v-for="n in 10" :key="n" type="list-item"></v-skeleton-loader>
            </v-list>
            <v-list v-else>
              <v-list-item v-for="thread in redditThreads" :key="thread.data.id" link @click="openRedditThread(thread.data.permalink)">
                <v-list-item-action>
                  <span>
                    <v-icon>mdi-arrow-up</v-icon>
                    {{ thread.data.ups }}
                  </span>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>{{ thread.data.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ thread.data.selftext }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
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
</page-query>

<script>
import axios from 'axios'
import { format } from 'date-fns'

export default {
  data() {
    return {
      changelogDialog: false,
      redditDataLoading: true,
      redditThreads: []
    }
  },

  created() {
    let twitterFeed = document.createElement("script");
    twitterFeed.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(twitterFeed);
  },

  async mounted () {
    try {
      const results = await axios.get(
        'https://www.reddit.com/r/escapefromtarkov/hot.json?limit=12'
      )

      this.redditThreads = results.data.data.children
      this.redditDataLoading = false
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'LLLL do, y')
    },
    openRedditThread(url) {
      window.open(`https://www.reddit.com${url}`, "_blank");
    }
  }
}
</script>

<style>
.flex-column .v-card:first-of-type {
  margin-bottom: 12px;
}
</style>
