<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Ammo Chart & Table</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption-text mx-12 text-center">
        Escape From Tarkov ammo chart and table. Search, sort, and filter to easily compare the different ammo types.
        <br/>
        Ammo data updated on
        {{ format($page.wikiData.edges[0].node.ammoUpdated) }}
        <br/>
        <v-dialog v-model="ammoChangeDialog" width="750" scrollable>
          <template v-slot:activator="{ on }">
            <v-btn text class="ml-4 black--text" color="primary" v-on="on">
              CLick Here To View Recent Ammo Changes
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="card-header font-weight-bold" primary-title>
              Most Recent Ammo Changes
            </v-card-title>
            <v-card-text class="mt-4">
              <div v-for="(ammo, index) in $page.ammoChanges.edges" :key="index">
                <h3>
                  {{ ammo.node.name }}
                </h3>
                <ul>
                  <div v-if="ammo.node.damage.length">
                    {{ `Damage: ${ammo.node.damage[0]}` }} <v-icon size="medium">mdi-arrow-right</v-icon> {{ ammo.node.damage[1] }}
                  </div>
                  <div v-if="ammo.node.penetration.length">
                    {{ `Penetration: ${ammo.node.penetration[0]}` }} <v-icon size="medium">mdi-arrow-right</v-icon> {{ ammo.node.penetration[1] }}
                  </div>
                  <div v-if="ammo.node.armorDamage.length">
                    {{ `Armor Damage (%): ${ammo.node.armorDamage[0]}` }} <v-icon size="medium">mdi-arrow-right</v-icon> {{ ammo.node.armorDamage[1] }}
                  </div>
                  <div v-if="ammo.node.accuracy.length">
                    {{ `Accuracy: ${ammo.node.accuracy[0]}` }} <v-icon size="medium">mdi-arrow-right</v-icon> {{ ammo.node.accuracy[1] }}
                  </div>
                  <div v-if="ammo.node.recoil.length">
                    {{ `Recoil: ${ammo.node.recoil[0]}` }} <v-icon size="medium">mdi-arrow-right</v-icon> {{ ammo.node.recoil[1] }}
                  </div>
                  <div v-if="ammo.node.fragmentation.length">
                    {{ `Fragmentation: ${ammo.node.fragmentation[0]}` }} <v-icon size="medium">mdi-arrow-right</v-icon> {{ ammo.node.fragmentation[1] }}
                  </div>
                </ul>
              </div>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="ammoChangeDialog = false">
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row>
      <v-col cols="6">
        <v-card
          link
          class="text-center"
          :class="{ selected: activeView === 'sheet' }"
          @click="activeView = 'sheet'"
        >
          <v-card-text>
            Ammo Spreadsheet
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          link
          class="text-center"
          :class="{ selected: activeView === 'chart' }"
          @click="activeView = 'chart'"
        >
          <v-card-text>
            Ammo Scatter Plot Chart
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <AmmoSpreadsheet v-if="activeView === 'sheet'" :data="ammo" />
        <AmmoScatterPlot v-if="activeView === 'chart'" :data="ammo" />
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  wikiData: allWiki {
    edges {
      node {
        ammoUpdated
      }
    }
  },
  ammo: allAmmo {
    edges {
      node {
        name,
        damage,
        penetration,
        armorDamage,
        accuracy,
        recoil,
        fragmentation
      }
    }
  },
  ammoChanges: allAmmoChanges {
    edges {
      node {
        name,
        damage,
        penetration,
        armorDamage,
        accuracy,
        recoil,
        fragmentation
      }
    }
  }
}
</page-query>

<script>
import { formatDate } from '../../helpers/dateHelpers'
import AmmoSpreadsheet from '../components/AmmoSpreadsheet'
import AmmoScatterPlot from '../components/AmmoScatterPlot'

export default {
  metaInfo: {
    title: "EFT Ammo Chart",
    link: [{ rel: "canonical", href: "https://eftfg.com/ammo" }],
    meta: [
      {
        name: "description",
        content:
          "Search, sort and filter with this Escape From Tarkov ammo chart and table to easily compare all varieties of ammunition in EFT."
      },
      { property: "og:title", content: "EFT Ammo Chart | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/ammo"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "Search, sort and filter with this Escape From Tarkov ammo chart and table to easily compare all varieties of ammunition in EFT."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/ammo"
      },
      { name: "twitter:title", content: "EFT Ammo Chart | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Search, sort and filter with this Escape From Tarkov ammo chart and table to easily compare all varieties of ammunition in EFT."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Ammo Chart | EFTFG" },
      {
        itemprop: "description",
        content:
          "Search, sort and filter with this Escape From Tarkov ammo chart and table to easily compare all varieties of ammunition in EFT."
      }
      // {
      //   itemprop: "image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // }
    ]
  },

  components: {
    AmmoSpreadsheet,
    AmmoScatterPlot
  },

  data() {
    return {
      activeView: 'sheet',
      ammoChangeDialog: false
    }
  },

  computed: {
    ammo() {
      return this.$page.ammo.edges.map(item => item.node)
    }
  },

  methods: {
    format(date) {
      return formatDate(date)
    }
  }
}
</script>

<style scoped>
.theme--dark.v-card.selected {
  background: #353029 !important;
}
</style>
