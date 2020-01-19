<template>
  <Layout>
    <v-row justify="center">
      <v-col cols="12" sm="7">
        <v-row justify="end" align="center">
          <v-text-field
            v-model="searchQuery"
            label="Search all lists"
            append-icon="mdi-magnify"
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            width="750"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="grey darken-4"
                dark
                v-on="on"
              >
                Add New List
              </v-btn>
            </template>
            <v-card>
              <v-card-title
                class="headline font-weight-bold grey darken-4"
                primary-title
              >
                Privacy Policy
              </v-card-title>
              <v-card-text class="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  text
                  @click="dialog = false"
                >
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-expansion-panels v-model="panels" multiple focusable>
          <v-expansion-panel
            v-for="(list, index) in filteredLists"
            :key="index"
          >
            <v-expansion-panel-header>{{ list.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item v-for="(item, itemIndex) in list.items" :key="itemIndex">
                  <v-list-item-content>
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      dialog: false,
      panels: [],
      panelsState: [],
      checklists: [
        {
          title: 'Hideout items',
          items: [
            {
              name: 'Duct Tape',
              amount: 2
            },
            {
              name: 'Lightbulb',
              amount: 2
            },
            {
              name: 'Nails',
              amount: 2
            }
          ]
        },
        {
          title: 'Task items',
          items: [
            {
              name: 'Morphine',
              amount: 2
            },
            {
              name: 'Tushonka',
              amount: 2
            }
          ]
        },
        {
          title: 'Other things',
          items: [
            {
              name: 'M4a1',
              amount: 1
            }
          ]
        }
      ]
    }
  },

  watch: {
    searchQuery: function(newValue, oldValue) {
      // Store the state of the panels before the query was entered
      if (oldValue === '') {
        this.panelsState = [...this.panels]
      }

      this.panels = []

      for (const index in this.filteredLists) {
        if (this.filteredLists[index].items.length > 0) {
          if (!this.panels.includes(index)) {
            this.panels.push(parseInt(index))
          }
        }
      }

      // Restore the state of the panels if query deleted
      if (newValue === '') {
        this.panels = [...this.panelsState]
      }
    }
  },

  computed: {
    filteredLists() {
      const array = []
      for (const list of this.checklists) {
        array.push({
          title: list.title,
          items: this.filter(list.items)
        })
      }
      return array
    }
  },

  methods: {
    filter(list) {
      return list.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>

<style>

</style>