<template>
  <Layout>
    <v-row justify="center">
      <p class="caption grey--text">
        Ammo data updated on
        {{ format($page.wikiData.edges[0].node.ammoUpdated) }}
      </p>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card
          link
          class="text-center"
          :class="{ unselected: activeView !== 'sheet' }"
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
          :class="{ unselected: activeView !== 'chart' }"
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
  }
}
</page-query>

<script>
import { formatDate } from '../../helpers/dateHelpers'
import AmmoSpreadsheet from '../components/AmmoSpreadsheet'
import AmmoScatterPlot from '../components/AmmoScatterPlot'

export default {
  components: {
    AmmoSpreadsheet,
    AmmoScatterPlot
  },

  data() {
    return {
      activeView: 'sheet'
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
.unselected {
  background: #3f3f3f44;
}
</style>