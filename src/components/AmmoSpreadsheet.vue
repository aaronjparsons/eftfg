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
      :items="data"
      :search="searchValue"
      height="75vh"
      disable-pagination
      hide-default-footer
      fixed-header
    />
  </v-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },

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
  }
}
</script>
