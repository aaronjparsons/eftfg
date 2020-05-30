<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Loot - Required Items</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Escape From Tarkov loot items that are required for tasks and the hideout. Search to keep track of loot that is important to keep.
      </p>
    </v-row>
    <v-row justify="center">
      <p class="caption grey--text mx-12 text-center">
        Updated for patch 0.12.6.7456 (May 29, 2020)
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="12" sm="7">
        <v-row justify="end" align="center">
          <v-spacer />
          <v-text-field
            v-model="searchQuery"
            label="Search all lists"
            append-icon="mdi-magnify"
          />
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-expansion-panels v-model="panels" multiple focusable>
          <!-- Task Items -->
          <v-expansion-panel v-if="lists.tasks.show">
            <v-expansion-panel-header>{{ lists.tasks.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card
                v-for="(item, itemIndex) in lists.tasks.items"
                :key="itemIndex"
                class="my-2"
                flat
                hover
              >
                <v-card-title>{{ item.node.name }}</v-card-title>
                <v-card-subtitle>Total Needed: {{ calculateTotal(item.node.tasks) }}</v-card-subtitle>
                <v-card-text>
                  Tasks:
                  <v-card outlined>
                    <v-card-text class="py-0">
                      <div v-for="(task, taskIndex) in item.node.tasks" :key="taskIndex">
                        <v-row>
                          <v-col cols=12 md=4 class="text-center">
                            {{ task.task }}
                          </v-col>
                          <v-col cols=12 md=4 class="text-center">
                            Amount: {{ task.amount }}
                          </v-col>
                          <v-col cols=12 md=4 class="text-center">
                            Find In Raid: {{ task.findInRaid ? 'Yes' : 'No' }}
                          </v-col>
                        </v-row>
                        <v-divider v-if="item.node.tasks.length > 1 && taskIndex !== item.node.tasks.length - 1" />
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- Hideout Items -->
          <v-expansion-panel v-if="lists.hideout.show">
            <v-expansion-panel-header>{{ lists.hideout.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card
                v-for="(item, itemIndex) in lists.hideout.items"
                :key="itemIndex"
                class="my-2"
                flat
                hover
              >
                <v-card-title>{{ item.node.name }}</v-card-title>
                <v-card-subtitle>Total Needed: {{ calculateTotal(item.node.modules) }}</v-card-subtitle>
                <v-card-text>
                  Modules:
                  <v-card outlined>
                    <v-card-text class="py-0">
                      <div v-for="(module, moduleIndex) in item.node.modules" :key="moduleIndex">
                        <v-row>
                          <v-col cols=12 md=6 class="text-center">
                            {{ module.module }}
                          </v-col>
                          <v-col cols=12 md=6 class="text-center">
                            Amount: {{ module.amount }}
                          </v-col>
                        </v-row>
                        <v-divider v-if="item.node.modules.length > 1 && moduleIndex !== item.node.modules.length - 1" />
                      </div>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  taskItems: allTaskItems(order: ASC) {
    edges {
      node {
        name,
        tasks {
          task,
          amount,
          findInRaid
        }
      }
    }
  },
  hideoutItems: allHideoutItems(order: ASC) {
    edges {
      node {
        name,
        modules {
          module,
          amount
        }
      }
    }
  }
}
</page-query>

<script>
import debounce from 'lodash.debounce'

export default {
  metaInfo: {
    title: "EFT Loot List - Required Items",
    link: [{ rel: "canonical", href: "https://eftfg.com/items" }],
    meta: [
      {
        name: "description",
        content:
          "List of all important Escape From Tarkov loot items that are required for tasks and the hideout. Easily keep track of EFT loot items to hold on to."
      },
      { property: "og:title", content: "EFT Loot List - Required Items | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/items"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "List of all important Escape From Tarkov loot items that are required for tasks and the hideout. Easily keep track of EFT loot items to hold on to."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/items"
      },
      { name: "twitter:title", content: "EFT Loot List - Required Items | EFTFG" },
      {
        name: "twitter:description",
        content:
          "List of all important Escape From Tarkov loot items that are required for tasks and the hideout. Easily keep track of EFT loot items to hold on to."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Loot List - Required Items | EFTFG" },
      {
        itemprop: "description",
        content:
          "List of all important Escape From Tarkov loot items that are required for tasks and the hideout. Easily keep track of EFT loot items to hold on to."
      }
      // {
      //   itemprop: "image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // }
    ]
  },

  data() {
    return {
      searchQuery: '',
      debouncedSearchQuery: '',
      dialog: false,
      panels: [],
      panelsState: [],
      lists: {
        hideout: {
          title: 'Hideout items',
          show: true,
          items: []
        },
        tasks: {
          title: 'Task items',
          show: true,
          items: []
        }
      }
    }
  },

  watch: {
    searchQuery: function(newValue, oldValue) {
      this.debouncer()
    },
    debouncedSearchQuery: function(newValue, oldValue) {
      this.panels = []
      this.lists.tasks.show = true
      this.lists.hideout.show = true

      this.lists.tasks.items = this.filter(this.$page.taskItems.edges)
      this.lists.hideout.items = this.filter(this.$page.hideoutItems.edges)

      if (newValue === '') {
        return
      }

      if (this.lists.tasks.items.length > 0) {
        this.lists.tasks.show = true
        this.panels.push(0)
      }

      if (this.lists.hideout.items.length > 0) {
        this.lists.hideout.show = true
        this.panels.push(1)
      }
    }
  },

  mounted() {
    this.lists.tasks.items = this.$page.taskItems.edges
    this.lists.hideout.items = this.$page.hideoutItems.edges
  },

  methods: {
    debouncer: debounce(function(){
      this.debouncedSearchQuery = this.searchQuery
    },500),
    filter(list) {
      return list.filter(item => {
        return item.node.name.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase())
      })
    },
    calculateTotal(array) {
      return array.reduce((a, b) => {
        return a + b.amount
      }, 0)
    }
  }
}
</script>

<style>

</style>