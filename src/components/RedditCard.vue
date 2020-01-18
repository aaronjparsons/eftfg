<template>
  <v-card>
    <v-card-title class="headline font-weight-bold grey darken-4">
      Reddit Posts From r/EscapeFromTarkov
    </v-card-title>
    <v-card-text>
      <v-list v-if="redditDataLoading">
        <v-skeleton-loader
          v-for="n in 10"
          :key="n"
          type="list-item"
        ></v-skeleton-loader>
      </v-list>
      <v-list v-else>
        <template v-for="thread in redditThreads">
          <v-list-item
            :key="thread.data.id"
            link
            @click="openRedditThread(thread.data.permalink)"
          >
            <v-list-item-action>
              <span>
                <v-icon>mdi-arrow-up</v-icon>
                {{ thread.data.ups }}
              </span>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ thread.data.title }}</v-list-item-title>
              <v-list-item-subtitle>{{
                thread.data.selftext
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      redditDataLoading: true,
      redditThreads: []
    }
  },

  async mounted() {
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
    openRedditThread(url) {
      window.open(`https://www.reddit.com${url}`, '_blank')
    }
  }
}
</script>

<style scoped>
.v-list-item__action {
  min-width: 60px;
}
</style>
