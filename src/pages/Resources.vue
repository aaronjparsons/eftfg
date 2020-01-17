<template>
  <Layout>
    <v-row>
      <v-col v-for="(resource, index) in resourceList" :key="index" cols="12" sm="6">
        <v-card >
          <v-card-title class="headline font-weight-bold grey darken-4">
            <a :href="resource.link" class="card-header-links" target="_blank">
              {{ resource.title }}
            </a>
          </v-card-title>
          <v-card-text class="pt-4">
            <p v-for="feature in resource.features" :key="feature.title">
              - {{ feature }}
            </p>
            <v-divider class="mb-4" />
            <a :href="resource.link">Link</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      resourceList: [
        {
          title: "EFT Wiki",
          features: [
            "Information of every single aspect of the game, from items to lore.",
            "Anything you are looking for can probably be found here."
          ],
          link: "https://escapefromtarkov.gamepedia.com/Escape_from_Tarkov_Wiki"
        },
        {
          title: "EFT Leaderboards",
          features: [
            "The official Escape From Tarkov Leaderboards.",
            "View the top players based on experience, kills, raids, or playtime."
          ],
          link: "https://www.escapefromtarkov.com/rating"
        },
        {
          title: "EFT Database",
          features: [
            "Detailed info on many weapons and items in the game.",
            "In depth weapon modding tool."
          ],
          link: "https://www.eftdb.one/"
        },
        {
          title: "EFT Map Key Guide",
          features: [
            "Detailed, custom maps displaying locations for key spawns, key use locations, loot spawns, and more."
          ],
          link: "https://eftmkg.com/"
        },
        {
          title: "EFT Maps",
          features: [
            "A variety of maps of Tarkov, both in game version and community created."
          ],
          link: "http://www.gamemaps.co.uk/game/tarkov/"
        }
      ]
    }
  }
}
</script>

<style scoped>
.card-header-links {
  text-decoration: none;
  color: inherit;
}
</style>