<template>
  <Layout>
    <v-row justify="center">
      <h1 class="text-center">EFT Flea Market Prices</h1>
    </v-row>
    <v-row justify="center">
      <p class="caption-text mx-12 text-center">
        Escape From Tarkov flea market prices, search any item by name.
        <br/>
        Data provided by Tarkov-Market
      </p>
    </v-row>
    <v-divider class="mx-8 mb-4" />
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="input"
          item-text="name"
          :items="items"
          :menu-props="autocompleteMenuProps"
          return-object
          solo
          no-data-text="No items found..."
          placeholder="Search by item name..."
        >
          <template v-slot:append-outer>
            <v-btn
              large
              class="ml-4 black--text"
              color="primary"
              @click="clearSearch"
            >
              Clear
            </v-btn>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <div v-if="!items.length">
          <v-row justify="center">
            <h1 class="text-center">Loading Items...</h1>
          </v-row>
          <v-alert v-if="error" text type="error">
            There was an error trying to load the items
          </v-alert>
        </div>
        <v-card
          v-else-if="Object.keys(input).length"
          class="my-2"
          hover
          @click.native="setActiveItem('input')"
        >
          <div class="item-header pa-2">
            <v-list-item-avatar
              tile
              size="100"
            >
              <v-img :src="input.imgBig"></v-img>
            </v-list-item-avatar>
            <div class="item-header-info">
              <div class="item-name">{{ input.name }}</div>
              <div class="item-updated">{{ format(input.updated) }}</div>
              <div class="item-price">₽{{ parsePrice(input.price) }}</div>
            </div>
            <div v-if="isMobile" class="text-right">
              <div class="item-updated">Expand</div>
              <v-icon
                class="expand-icon"
                :class="{'expanded': topItemExpanded('input') }"
              >mdi-chevron-down</v-icon>
            </div>
          </div>
          <v-expand-transition>
            <v-card-text v-show="topItemExpanded('input')">
              <v-row class="px-3">
                <v-card outlined style="width: 100%;">
                  <div class="px-4 py-2 trend-title">Daily Trend</div>
                  <v-sparkline
                    :value="trendList(input)"
                    color="rgb(150, 132, 101)"
                    height="75"
                    padding="24"
                    stroke-linecap="round"
                    line-width="3"
                    smooth
                    auto-draw
                    :auto-draw-duration="1000"
                  >
                    <template v-slot:label="item">
                      ₽{{ parsePrice(item.value) }}
                    </template>
                  </v-sparkline>
                </v-card>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-card outlined class="data-card">
                    <v-card-title>Average Price</v-card-title>
                    <v-card-text>
                      <div class="item-updated">24 hours</div>
                      <div class="extra-data">₽{{ parsePrice(input.avg24hPrice) }}</div>
                      <div class="item-updated">7 days</div>
                      <div class="extra-data">₽{{ parsePrice(input.avg7daysPrice) }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card outlined class="data-card">
                    <v-card-title>Trader Price</v-card-title>
                    <v-card-text>
                      <div class="item-updated">{{ input.traderName }}</div>
                      <div class="extra-data">{{ input.traderPriceCur }}{{ parsePrice(input.traderPrice) }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card outlined class="data-card">
                    <v-card-title>Price Difference</v-card-title>
                    <v-card-text>
                      <div class="item-updated">24 hours</div>
                      <div class="extra-data">{{ formatPercentage(input.diff24h) }}</div>
                      <div class="item-updated">7 days</div>
                      <div class="extra-data">{{ formatPercentage(input.diff7days) }}</div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-expand-transition>
        </v-card>
        <div v-else>
          <v-row justify="center">
            <h1 class="text-center" style="opacity: 0.75;">Top 10 Highest Prices</h1>
          </v-row>
          <v-card
            v-for="(item, index) in topItems"
            :key="index"
            class="my-2"
            hover
            @click.native="setActiveItem(index)"
          >
            <div class="item-header pa-2">
              <v-list-item-avatar
                tile
                size="100"
              >
                <v-img :src="item.imgBig"></v-img>
              </v-list-item-avatar>
              <div class="item-header-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-updated">{{ format(item.updated) }}</div>
                <div class="item-price">₽{{ parsePrice(item.price) }}</div>
              </div>
              <div v-if="isMobile" class="text-right">
                <div class="item-updated">Expand</div>
                <v-icon
                  class="expand-icon"
                  :class="{'expanded': topItemExpanded(index) }"
                >mdi-chevron-down</v-icon>
              </div>
            </div>
            <v-expand-transition>
              <v-card-text v-show="topItemExpanded(index)">
                <v-row class="px-3">
                  <v-card outlined style="width: 100%;">
                    <div class="px-4 py-2 trend-title">Daily Trend</div>
                    <v-sparkline
                      :value="trendList(item)"
                      color="rgb(150, 132, 101)"
                      height="75"
                      padding="24"
                      stroke-linecap="round"
                      line-width="3"
                      smooth
                      auto-draw
                      :auto-draw-duration="1000"
                    >
                      <template v-slot:label="item">
                        ₽{{ parsePrice(item.value) }}
                      </template>
                    </v-sparkline>
                  </v-card>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4">
                    <v-card outlined class="data-card">
                      <v-card-title>Average Price</v-card-title>
                      <v-card-text>
                        <div class="item-updated">24 hours</div>
                        <div class="extra-data">₽{{ parsePrice(item.avg24hPrice) }}</div>
                        <div class="item-updated">7 days</div>
                        <div class="extra-data">₽{{ parsePrice(item.avg7daysPrice) }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card outlined class="data-card">
                      <v-card-title>Trader Price</v-card-title>
                      <v-card-text>
                        <div class="item-updated">{{ item.traderName }}</div>
                        <div class="extra-data">{{ item.traderPriceCur }}{{ parsePrice(item.traderPrice) }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-card outlined class="data-card">
                      <v-card-title>Price Difference</v-card-title>
                      <v-card-text>
                        <div class="item-updated">24 hours</div>
                        <div class="extra-data">{{ formatPercentage(item.diff24h) }}</div>
                        <div class="item-updated">7 days</div>
                        <div class="extra-data">{{ formatPercentage(item.diff7days) }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
import { distance } from '../../helpers/dateHelpers'

export default {
  metaInfo: {
    title: "EFT Flea Market Prices",
    link: [{ rel: "canonical", href: "https://eftfg.com/flea-market" }],
    meta: [
      {
        name: "description",
        content:
          "Quickly find up to date prices of any item from Escape From Tarkov. See recent price, average prices, price changes, and the best trader price."
      },
      { property: "og:title", content: "EFT Flea Market Prices | EFTFG" },
      { property: "og:site_name", content: "EFTFG" },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://eftfg.com/flea-market"
      },
      // {
      //   property: "og:image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      {
        property: "og:description",
        content:
          "Quickly find up to date prices of any item from Escape From Tarkov. See recent price, average prices, price changes, and the best trader price."
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:site",
        content: "https://eftfg.com/flea-market"
      },
      { name: "twitter:title", content: "EFT Flea Market Prices | EFTFG" },
      {
        name: "twitter:description",
        content:
          "Quickly find up to date prices of any item from Escape From Tarkov. See recent price, average prices, price changes, and the best trader price."
      },
      { name: "twitter:creator", content: "@ChewyDinosaur" },
      // {
      //   name: "twitter:image:src",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // },
      { itemprop: "name", content: "EFT Flea Market Prices | EFTFG" },
      {
        itemprop: "description",
        content:
          "Quickly find up to date prices of any item from Escape From Tarkov. See recent price, average prices, price changes, and the best trader price."
      }
      // {
      //   itemprop: "image",
      //   content: "https://www.my-site.com/my-special-image.jpg"
      // }
    ]
  },

  components: {

  },

  data() {
    return {
      input: {},
      activeItemIndex: null,
      error: false
    }
  },

  async mounted() {
    const apiBase = process.env.GRIDSOME_API_ROUTE
    if (!this.items.length) {
      const response = await fetch(`${apiBase}/v1/market/`)
      const marketItems = await response.json()

      if (marketItems.error) {
        this.error = true;
      } else {
        this.$store.dispatch('setMarketItems', marketItems)
      }
    }
  },

  computed: {
    items() {
      return this.$store.state.marketItems
    },
    topItems() {
      return this.$store.state.topMarketItems
    },
    autocompleteMenuProps() {
      // default properties copied from the vuetify-autocomplete docs
      let defaultProps = {
        closeOnClick: false,
        closeOnContentClick: false,
        disableKeys: true,
        openOnClick: false,
        maxHeight: 304
      }
      return defaultProps
    },
    isMobile() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  },

  methods: {
    clearSearch() {
      this.input = {}
      this.activeItemIndex = null
    },
    setActiveItem(index) {
      if (!this.isMobile) {
        return
      }

      if (this.activeItemIndex === index) {
        this.activeItemIndex = null
      } else {
        this.activeItemIndex = index
      }
    },
    parsePrice(price) {
      return String(price).replace(/(.)(?=(\d{3})+$)/g,'$1,')
    },
    format(date) {
      return `Updated ${distance(date)} ago`
    },
    formatPercentage(num) {
      return `${num > 0 ? '+' : ''}${num}%`
    },
    topItemExpanded(index) {
      if (!this.isMobile) {
        return true
      }

      return index === this.activeItemIndex
    },
    trendList(item) {
      return [...item.history, item.price].slice(-5)
    }
  }
}
</script>

<style>
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
  background-color: #161616;
}
.v-autocomplete {
  z-index: 160 !important;
}
.theme--dark.v-list {
  background-color: #161616;
}
.v-input__append-outer {
  margin-top: 2px !important;
}
.item-header {
  display: flex;
}
.item-header .v-avatar {
  margin-top: 0 !important;
}
.item-header-info {
  width: 100%;
}
.item-name {
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.9;
}
.item-updated {
  font-size: 0.85rem;
  font-weight: 400;
  opacity: 0.65;
}
.item-price {
  font-size: 2rem;
  font-weight: 500;
}
.data-card {
  height: 100%;
}
.extra-data {
  font-size: 1.25rem;
  font-weight: 500;
}
.expand-icon {
  transition: all 0.8s ease-in-out;
}
.expanded {
  transform: rotate(180deg);
}
.trend-title {
  font-size: 1.15rem;
  font-weight: 500;
  opacity: 0.6;
}
</style>