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
      no-results-text="No ammo found..."
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

<style>
.theme--dark.v-data-table.v-data-table--fixed-header thead th {
  background: #161616;
  color: #968465;
  font-family: 'Bender Bold', 'Roboto', 'sans serif';
  font-size: 0.85rem;
}
.theme--dark.v-data-table {
  background-color: #161616;
}
.theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content) {
  background: #968465;
  color: #000000;
}
</style>