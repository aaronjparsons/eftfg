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
  metaInfo: {
    title: "Home",
    link: [{ rel: "canonical", href: "https://eftfg.com" }],
    meta: [
      {
        name: "description",
        content:
          "Key spawn guides, ammo chart & spreadsheet, barter item values, and more. Escape From Tarkov Field Guide."
      },
      { property: "og:title", content: "Home | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "Key spawn guides, ammo chart & spreadsheet, barter item values, and more. Escape From Tarkov Field Guide."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com"
      },
      { name: "twitter:title", content: "Home | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Key spawn guides, ammo chart & spreadsheet, barter item values, and more. Escape From Tarkov Field Guide."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "Home | EFTFG" },
      {
        itemprop: "description",
        content:
          "Key spawn guides, ammo chart & spreadsheet, barter item values, and more. Escape From Tarkov Field Guide."
      }
      // {
      //   itemprop: "image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // }
    ]
  },

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
</style>
