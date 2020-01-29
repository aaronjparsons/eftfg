<template>
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
</template>

<script>
export default {
  created() {
    let twitterFeed = document.createElement("script");
    twitterFeed.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.head.appendChild(twitterFeed);
  }
}
</script>

<style scoped>
.v-card__text {
  height: 550px;
}
</style>