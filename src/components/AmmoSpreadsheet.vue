<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchValue"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="ammo"
      :search="searchValue"
      height="75vh"
      disable-pagination
      hide-default-footer
      fixed-header
    />
  </v-card>
</template>

<static-query>
query {
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
</static-query>

<script>
export default {
  data() {
    return {
      searchValue: '',
      headers: [
        {
          text: '',
          align: 'center',
          sortable: false
        },
        {
          text: 'Ammo',
          align: 'center',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Damage',
          value: 'damage',
          align: 'center'
        },
        {
          text: 'Penetration',
          value: 'penetration',
          align: 'center'
        },
        {
          text: 'Armor Damage (%)',
          value: 'armorDamage',
          align: 'center'
        },
        {
          text: 'Accuracy',
          value: 'accuracy',
          align: 'center'
        },
        {
          text: 'Recoil',
          value: 'recoil',
          align: 'center'
        },
        {
          text: 'Fragmentation Chance (%)',
          value: 'fragmentation',
          align: 'center'
        }
      ]
    }
  },

  computed: {
    ammo() {
      return this.$static.ammo.edges.map(item => item.node)
    }
  }
}
</script>

<style>
.ammo-table {

}
</style>
