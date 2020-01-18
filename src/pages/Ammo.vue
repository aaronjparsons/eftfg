<template>
  <Layout>
    <v-row justify="center">
      <p class="caption grey--text">Ammo data updated on {{ 'date' }}</p>
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
        <AmmoSpreadsheet v-if="activeView === 'sheet'" />
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
import AmmoSpreadsheet from '../components/AmmoSpreadsheet'

export default {
  components: {
    AmmoSpreadsheet
  },

  data() {
    return {
      activeView: 'sheet'
    }
  }
}
</script>

<style scoped>
.unselected {
  background: #3f3f3f44;
}
</style>
