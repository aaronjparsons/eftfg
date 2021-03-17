<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Loot - Required Items</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption-text mx-12 text-center">
        Escape From Tarkov loot items that are required for tasks and the hideout. Search to keep track of loot that is important to keep.
        <br/>
        Updated for patch 0.12.9.10901 (15 Feb 2021)
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="11" sm="4" md="3">
        <v-row justify="center" align="center">
          <v-text-field
            v-model="searchQuery"
            label="Search for an item..."
            append-icon="mdi-magnify"
          />
        </v-row>
      </v-col>
       <v-col cols="11" sm="4" md="3">
        <v-select
          v-model="listSelection"
          :items="listOptions"
          label="Items List"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-if="!list.length" cols="12" sm="8">
        <h3 class="text-center">No results for that search query</h3>
      </v-col>
      <v-col v-else cols="12" sm="8">
        <v-card
          v-for="(item, itemIndex) in list.slice(0, this.numberOfItems)"
          :key="itemIndex"
          class="my-2"
          hover
        >
          <v-card-title>{{ item.node.name }}</v-card-title>
          <v-card-subtitle>Total Needed: {{ calculateTotal(item.node) }}</v-card-subtitle>
          <v-card-text>
            <div v-if="(listSelection === 'all' || listSelection ==='tasks') && item.node.tasks.length">
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
            </div>
            <div v-if="listSelection === 'all' && item.node.modules.length && item.node.tasks.length" class="mt-5"></div>
            <div v-if="(listSelection === 'all' || listSelection ==='hideout') && item.node.modules.length">
              Hideout Modules:
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
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  allItems: allRequiredItems(sortBy: "name", order: ASC) {
    edges {
      node {
        name,
        tasks {
          task,
          amount,
          findInRaid
        },
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
      numberOfItems: 15,
      listSelection: 'all',
      listOptions: [
        {
          text: 'Tasks & Hideout',
          value: 'all'
        },
        {
          text: 'Tasks Only',
          value: 'tasks'
        },
        {
          text: 'Hideout Only',
          value: 'hideout'
        }
      ]
    }
  },

  computed: {
    list() {
      return this.filter(this.listSelection, this.$page.allItems.edges)
    }
  },

  watch: {
    searchQuery: function(newValue, oldValue) {
      this.debouncer()
    },
    debouncedSearchQuery: function() {
      this.numberOfItems = 15
    }
  },

  mounted() {
    this.scroll()
  },

  methods: {
    scroll() {
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.numberOfItems += 15
        }
      }
    },
    debouncer: debounce(function(){
      this.debouncedSearchQuery = this.searchQuery
    },500),
    filter(selection, list) {
      return list.filter(item => {
        if ((selection === 'all') || (selection === 'tasks' && item.node.tasks.length) || (selection === 'hideout' && item.node.modules.length)) {
          return item.node.name.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase())
        } else {
          return false
        }
      })
    },
    calculateTotal(object) {
      const taskTotals = object.tasks.reduce((a, b) => {
        return a + b.amount
      }, 0)
      const moduleTotals = object.modules.reduce((a, b) => {
        return a + b.amount
      }, 0)

      if (this.listSelection === 'tasks') {
        return taskTotals
      } else if (this.listSelection === 'hideout') {
        return moduleTotals
      } else {
        return taskTotals + moduleTotals
      }
    }
  }
}
</script>

<style>

</style>