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
          <template v-for="(list, index) in filteredLists">
            <v-expansion-panel
              v-if="list.show"
              :key="index"
            >
              <v-expansion-panel-header>{{ list.title }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense>
                  <template v-for="(item, itemIndex) in list.items">
                    <v-list-item :key="itemIndex" link>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.node.name }}</v-list-item-title>
                        <!-- <v-list-item-subtitle>Need: {{ item.node.need }}</v-list-item-subtitle> -->
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-subtitle>Need: {{ item.node.need }}</v-list-item-subtitle>
                      </v-list-item-action>
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

<page-query>
query {
  taskItems: allTaskItems(order: ASC) {
    edges {
      node {
        name,
        need
      }
    }
  },
  hideoutItems: allHideoutItems(order: ASC) {
    edges {
      node {
        name,
        need
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
      panelsState: []
    }
  },

  watch: {
    searchQuery: function(newValue, oldValue) {
      this.debouncer()
    },
    debouncedSearchQuery: function(newValue, oldValue) {
      this.panels = []

      if (newValue === '') {
        return
      }

      for (const index in this.filteredLists) {
        if (this.filteredLists[index].items.length > 0) {
          if (!this.panels.includes(index)) {
            this.panels.push(parseInt(index))
          }
        }
      }
    }
  },

  computed: {
    checklists() {
      return [
        {
          title: 'Hideout items',
          show: true,
          items: this.$page.hideoutItems.edges
        },
        {
          title: 'Task items',
          show: true,
          items: this.$page.taskItems.edges
        }
      ]
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
    debouncer: debounce(function(){
      this.debouncedSearchQuery = this.searchQuery
    },500),
    filter(list) {
      return list.filter(item => {
        return item.node.name.toLowerCase().includes(this.debouncedSearchQuery.toLowerCase())
      })
    }
  }
}
</script>

<style>

</style>