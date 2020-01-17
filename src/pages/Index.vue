<template>
  <Layout>
    <v-row>
      <v-col sm="6" cols="12" class="flex-column">
        <GameVersionCard />
        <ChangelogCard />
      </v-col>
      <v-col sm="6" cols="12">
        <TwitterCard />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <RedditCard />
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
import GameVersionCard from '../components/GameVersionCard'
import ChangelogCard from '../components/ChangelogCard'
import RedditCard from '../components/RedditCard'
import TwitterCard from '../components/TwitterCard'

export default {
  components: {
    GameVersionCard,
    ChangelogCard,
    TwitterCard,
    RedditCard
  }
}
</script>

<style>
.flex-column .v-card:first-of-type {
  margin-bottom: 12px;
}
.v-application a {
  color: white !important;
}
</style>
