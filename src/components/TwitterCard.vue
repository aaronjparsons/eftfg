<template>
  <v-card>
    <v-card-title class="headline font-weight-bold secondary">
      BSG Twitter Feed
    </v-card-title>
    <v-card-text>
      <div v-show="darkMode">
        <a
          class="twitter-timeline"
          href="https://twitter.com/bstategames"
          data-height="550"
          data-theme="dark"
          data-chrome="transparent"
        ></a>
      </div>
      <div v-show="!darkMode">
        <a
          class="twitter-timeline"
          href="https://twitter.com/bstategames"
          data-height="550"
          data-theme="light"
          data-chrome="transparent"
        ></a>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created() {
    let twitterFeed = document.createElement("script")
    twitterFeed.setAttribute("src", "https://platform.twitter.com/widgets.js")
    document.head.appendChild(twitterFeed)
  },

  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>
.v-card__text {
  height: 550px;
}
</style>