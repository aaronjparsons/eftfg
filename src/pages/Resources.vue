<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Resources</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Official and community created Escape From Tarkov resources.
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline font-weight-bold secondary">
            <div class="card-header-links">
              EFTFG Map Files
            </div>
          </v-card-title>
          <v-card-text class="d-flex flex-wrap justify-center">
            <a
              v-for="(map, index) in mapList"
              :key="index"
              :href="map.image"
            >
              <v-card
                class="ma-4"
                width="300px"
                hover
              >
                <v-img
                  class="white--text"
                  height="200px"
                  :src="map.thumb"
                >
                  <v-card-title class="justify-center grey darken-4 low-opacity">
                    {{ map.title }}
                  </v-card-title>
                </v-img>
              </v-card>
            </a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(resource, index) in resourceList" :key="index" cols="12" sm="6">
        <v-card >
          <v-card-title class="headline font-weight-bold secondary">
            <a :href="resource.link" class="card-header-links" target="_blank">
              {{ resource.title }}
            </a>
          </v-card-title>
          <v-card-text class="pt-4">
            <p v-for="feature in resource.features" :key="feature.title">
              - {{ feature }}
            </p>
            <v-divider class="mb-4" />
            <a :href="resource.link" target="_blank">Link</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "EFT Resources",
    link: [{ rel: "canonical", href: "https://eftfg.com/resources" }],
    meta: [
      {
        name: "description",
        content:
          "Links to official and community created Escape From Tarkov resources."
      },
      { property: "og:title", content: "EFT Resources | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/resources"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "Links to official and community created Escape From Tarkov resources."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/resources"
      },
      { name: "twitter:title", content: "EFT Resources | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Links to official and community created Escape From Tarkov resources."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Resources | EFTFG" },
      {
        itemprop: "description",
        content:
          "Links to official and community created Escape From Tarkov resources."
      }
      // {
      //   itemprop: "image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // }
    ]
  },

  data() {
    return {
      mapList: [
        {
          title: 'Reserve',
          image: 'maps/ReserveMap.png',
          thumb: 'maps/ReserveMapThumb.png'
        },
        {
          title: 'Factory',
          image: 'maps/FactoryMap.png',
          thumb: 'maps/FactoryMapThumb.png'
        },
        {
          title: 'Interchange',
          image: 'maps/InterchangeMap.png',
          thumb: 'maps/InterchangeMapThumb.png'
        },
        {
          title: 'The Lab',
          image: 'maps/TheLabMap.png',
          thumb: 'maps/TheLabMapThumb.png'
        }
      ],
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
        },
        {
          title: "EFT Loot",
          features: [
            "Up to date flea market prices for items."
          ],
          link: "https://eft-loot.com/"
        },
        {
          title: "EFT Developer Tracker",
          features: [
            "See all recent posts from the EFT developers across the forums, Reddit, and Twitter."
          ],
          link: "https://developertracker.com/escape-from-tarkov/"
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
.low-opacity {
  opacity: 0.95;
}
</style>