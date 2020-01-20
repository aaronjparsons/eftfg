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
            width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="grey darken-4"
                dark
                v-on="on"
              >
                List Settings
              </v-btn>
            </template>
            <v-card>
              <v-card-title
                class="headline font-weight-bold grey darken-4"
                primary-title
              >
                List Settings
              </v-card-title>
              <v-card-text class="mt-4">
                <v-text-field
                  v-model="customListName"
                  label="Custom List Name"
                />
                <v-switch
                  v-model="checklists[2].show"
                  label="Show Custom Checklist"
                />
                <v-switch
                  v-model="checklists[0].show"
                  label="Show Hideout Items Checklist"
                />
                <v-switch
                  v-model="checklists[1].show"
                  label="Show Task Items Checklist"
                />
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="white"
                  text
                  @click="dialog = false"
                >
                  Save
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
          <template v-for="(list, index) in filteredLists">
            <v-expansion-panel
              v-if="list.show"
              :key="index"
            >
              <v-expansion-panel-header>{{ list.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list>
                  <template v-for="(item, itemIndex) in list.items">
                    <v-list-item :key="itemIndex">
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider />
                  </template>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </template>
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
          show: true,
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
          show: true,
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
          title: 'My Custom List',
          show: true,
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
    customListName: {
      get: function() {
        return this.checklists[2].title
      },
      set: function(value) {
        this.checklists[2].title = value
      }
    },
    filteredLists() {
      const array = []
      for (const list of this.checklists) {
        array.push({
          title: list.title,
          show: list.show,
          items: this.filter(list.items)
        })
      }
      return array
    }
  },

  methods: {
    saveListSettings() {
      // TODO Save lists data to local storage data
      // ?? Save amount data as 1 array of integers to reduce size ??
      this.dialog = false
    },
    filter(list) {
      return list.filter(item => item.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  }
}
</script>

<style>

</style>