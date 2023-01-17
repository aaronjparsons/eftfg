<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped width="300" color="#161616">
      <v-list nav>
        <v-list-item
          v-for="(item, index) in navItems"
          :key="index"
          link
          :to="item.route"
        >
          <v-list-item-action>
            <v-icon class="primary--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <g-link class="primary--text" :to="item.route">{{ item.label }}</g-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <ins
          class="adsbygoogle"
          style="display:inline-block;width:300px;height:250px"
          data-ad-client="ca-pub-2143532549719007"
          data-ad-slot="8687979973"
        ></ins>
        <!-- <v-row class="pb-4" justify="center">
          <a
            class="bmc-button"
            :class="{ 'bmc-dark': isDarkMode }"
            target="_blank"
            href="https://www.buymeacoffee.com/ChewyDinosaur"
            rel="noopener"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buy me a coffee"
            />
            <span style="margin-left:15px;font-size:28px !important;">
              Buy me a coffee
            </span>
          </a>
        </v-row> -->
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="lfgDrawer"
      app
      temporary
      right
      :stateless="lfgDialog || lfgDeleteConfirm"
      width="300"
      color="#161616"
    >
      <p class="mt-4 text-center" style="font-size: 1.75rem; font-weight: 600;">Looking For Group</p>
      <p class="mx-4 text-center caption-text">Join other players looking for a group by adding them in game, or create your own group request.</p>
      <p v-if="lfgCount > 0" class="text-center lfg-request-active">{{ lfgCount }} active request{{ lfgCount > 1 ? 's' : '' }}</p>
      <p v-else class="text-center lfg-request-inactive">{{ lfgCount }} active requests</p>
      <div class="d-flex justify-center mb-6">
        <v-tooltip bottom :disabled="!hasLfg">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              v-bind="attrs"
              v-on="on"
              @click="openLfgDialog"
            >
              Create Request
            </v-btn>
          </template>
          <span>You already have an active request</span>
        </v-tooltip>
      </div>
      <v-divider></v-divider>
      <v-list>
        <template v-for="[key, entry] in sortedLfgEntries">
          <v-list-item :key="key" :class="{ 'primary-faded': currentUser && currentUser.uid === key }">
            <v-list-item-content>
              <v-list-item-title>Group Type:</v-list-item-title>
              <v-list-item-subtitle class="mb-2">{{ entry.type }}</v-list-item-subtitle>
              <div v-if="entry.type === 'task'">
                <v-list-item-title>Task:</v-list-item-title>
                <v-list-item-subtitle class="mb-2">{{ entry.task }}</v-list-item-subtitle>
              </div>
              <v-list-item-title>In-Game Name:</v-list-item-title>
              <v-list-item-subtitle class="mb-2">{{ entry.name }}</v-list-item-subtitle>
              <v-list-item-subtitle>Created {{ getTimeAgo(entry.timestamp) }}</v-list-item-subtitle>
              <v-btn
                v-show="currentUser && currentUser.uid === key"
                color="#e00000"
                fab
                dark
                x-small
                absolute
                right
                style="top: 16px;"
                @click="lfgDeleteConfirm = true"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="black">
      <v-app-bar-nav-icon class="primary--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="primary--text" :style="{ 'font-family': 'Bender Black', 'font-size': '2rem' }">EFT Field Guide</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="lfgCount > 0" @click.stop="openLfgDrawer">
        {{ lfgBtnText }} <span class="lfg-request lfg-request-active">⬤</span>
      </v-btn>
      <v-btn v-else @click.stop="openLfgDrawer">
        {{ lfgBtnText }} <span class="lfg-request lfg-request-inactive">⬤</span>
      </v-btn>
      <!-- <v-spacer></v-spacer>
      <v-btn icon class="mr-1" @click="toggleDarkMode">
        <v-icon v-if="isDarkMode">mdi-weather-night</v-icon>
        <v-icon v-else>mdi-weather-sunny</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container :style="{ 'max-width': '1185px', 'padding-bottom': '20px' }">
        <slot />
        <!-- <div class="ins-container">
          <ins
            class="adsbygoogle"
            style="display:inline-block;width:728px;height:90px"
            data-ad-client="ca-pub-2143532549719007"
            data-ad-slot="1581579401"
          ></ins>
        </div> -->
      </v-container>
    </v-main>

    <!-- Looking For Group Dialog Form -->
    <v-dialog
      v-model="lfgDialog"
      width="500"
      @click:outside="closeLfgDialog"
    >
      <v-card>
        <v-card-title style="font-size: 1.75rem;">
          Looking For Group Request
        </v-card-title>

        <v-card-text>
          <v-alert
            dense
            text
            type="warning"
          >
            Looking for group requests will be automatically deleted after 6 hours. You can choose to manually delete them as well.
          </v-alert>
          <v-select
            v-model="lfgData.type"
            :items="lfgTypes"
            label="Group Type"
          ></v-select>
          <v-autocomplete
            v-model="lfgData.task"
            v-if="lfgData.type === 'Task'"
            :items="tasks"
            label="Task"
          ></v-autocomplete>
          <v-text-field
            v-model="lfgData.name"
            label="In-Game Name"
            :rules="[rules.required]"
            counter
            maxlength="15"
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="closeLfgDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="submitLfg"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Looking Delete COnfirm Dialog -->
    <v-dialog
      v-model="lfgDeleteConfirm"
      width="500"
    >
      <v-card>
        <v-card-title style="font-size: 1.75rem;">
          Delete Request?
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete your Looking For Group request?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="lfgDeleteConfirm = false"
          >
            No
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="deleteLfg"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
        v-model="snackbar"
        :timeout="toast.timeout"
        top
        :color="toast.color"
        style="margin-top: 30px;"
      >
        {{ toast.text }}
        <template v-if="toast.action" v-slot:action="{ attrs }">
          <v-btn
            color="primary"
            text
            v-bind="attrs"
            @click="toast.action"
          >
            View
          </v-btn>
        </template>
      </v-snackbar>
  </v-app>
</template>

<script>
import { getDatabase, ref, set, remove } from "firebase/database";
import { getAnalytics, logEvent } from "firebase/analytics";
import list from 'badwords-list';
import tasksTitles from '../../data/task-names.json';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default {
  props: {
    source: String
  },

  data: () => ({
    watchHasInit: false,
    drawer: null,
    lfgDrawer: null,
    lfgEntries: null,
    windowWidth: null,
    lfgDialog: false,
    lfgTypes: ['Task', 'PvP', 'Farming'],
    lfgData: {
      type: 'Task',
      task: 'Any Task',
      name: '',
      timestamp: null
    },
    lfgDeleteConfirm: false,
    rules: {
      required: value => !!value || 'Required.'
    },
    snackbar: false,
    toast: {
      color: '',
      text: ''
    },
    tasks: tasksTitles,
    navItems: [
      {
        route: '/',
        icon: 'mdi-view-dashboard',
        label: 'Home'
      },
      {
        route: '/keys',
        icon: 'mdi-key',
        label: 'Keys'
      },
      {
        route: '/extractions',
        icon: 'mdi-map',
        label: 'Extractions'
      },
      {
        route: '/tasks',
        icon: 'mdi-map-marker',
        label: 'Tasks'
      },
      {
        route: '/caches',
        icon: 'mdi-treasure-chest',
        label: 'Caches'
      },
      {
        route: '/ammo',
        icon: 'mdi-poll-box',
        label: 'Ammo Chart'
      },
      {
        route: '/flea-market',
        icon: 'mdi-currency-usd',
        label: 'Flea Market Prices'
      },
      {
        route: '/items',
        icon: 'mdi-checkbox-marked',
        label: 'Required Items'
      },
      {
        route: '/resources',
        icon: 'mdi-folder',
        label: 'More Resources'
      }
    ]
  }),

  created() {
    this.$vuetify.theme.dark = this.isDarkMode;
  },

  mounted() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
      this.windowWidth = window.innerWidth;
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },
    isDarkMode() {
      return this.$store.state.darkMode
    },
    sortedLfgEntries() {
      return this.$store.state.lfgEntries
        ? Object.entries(this.$store.state.lfgEntries).reverse().sort((a, b) => {
          return a[0] === this.currentUser.uid ? -1 : 1;
        })
        : []
    },
    lfgBtnText() {
      return this.windowWidth > 560 ? 'Looking For Group' : 'LFG';
    },
    lfgCount() {
      return this.$store.state.lfgEntries ? Object.values(this.$store.state.lfgEntries).length : 0;
    },
    hasLfg() {
      return this.currentUser && this.$store.state.lfgEntries
        ? Object.keys(this.$store.state.lfgEntries).includes(this.currentUser.uid)
        : false
    }
  },

  watch: {
    sortedLfgEntries(curr, prev) {
      if (!this.watchHasInit) {
        // Hacky...
        this.watchHasInit = true;
        return;
      }

      if (curr.length === 0 || prev.length > curr.length) {
        return;
      }

      const [unique] = curr.filter(entry => !prev.some(e => entry[0] === e[0]));
      if (unique[0] !== this.currentUser.uid) {
        // New entry from another user
        this.toast = {
          color: '',
          text: `New looking for group request - (${unique[1].type})`,
          timeout: 4500,
          action: () => {
            openLfgDrawer();
            this.snackbar = false;
          }
        }
        this.snackbar = true;
      }
    }
  },

  methods: {
    toggleDarkMode() {
      this.$store.dispatch('toggleDarkmode')
      this.$vuetify.theme.dark = this.isDarkMode
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    openLfgDrawer() {
      this.lfgDrawer = true;
      try{
        const analytics = getAnalytics();
        logEvent(analytics, 'lfg_drawer_opened');
      } catch(e) {}
    },
    openLfgDialog() {
      if (!this.hasLfg) {
        this.lfgDialog = true;
        try {
          const analytics = getAnalytics();
          logEvent(analytics, 'lfg_dialog_opened');
        } catch(e) {}
      }
    },
    closeLfgDialog() {
      this.lfgDialog = false;
      this.lfgData = {
        type: 'Task',
        task: 'Any Task',
        name: '',
        timestamp: null
      }
    },
    submitLfg() {
      if (this.lfgData.name.length === 0) {
        this.toast = {
          color: '#e00000',
          text: 'In-Game Name is required',
          timeout: 3500
        }
        this.snackbar = true;
        return;
      }

      const profanity = list.array.filter(w => ['damn',' hell', 'nob', 'God', 'bum', 'ass', 'butt', 'willy', 'bloody', 'sadist', 'hoer', 'hoar', 'tit', 'jap', 'crap', 'cok', 'fux', 'pecker', 'pawn', 'poop'].includes(w))
      for (const word of profanity) {
        if (this.lfgData.name.toLowerCase().includes(word.toLowerCase())) {
          this.toast = {
            color: '#e00000',
            text: 'In-Game Name contains profanity',
            timeout: 3500
          }
          this.snackbar = true;
          return;
        }
      }

      const db = getDatabase();

      this.lfgData.timestamp = Date.now();

      set(ref(db, `/lfg/${this.currentUser.uid}`), this.lfgData)
      .then(() => {
        try {
          const analytics = getAnalytics();
          const type = this.lfgData.type;
          logEvent(analytics, 'lfg_request_created', { type });
        } catch (e) {}
        this.closeLfgDialog();
        this.toast = {
          color: '#009c00',
          text: 'Looking For Group request created',
          timeout: 3500
        }
        this.snackbar = true;
      })
      .catch((error) => {
        this.toast = {
          color: '#e00000',
          text: 'An error ocurred attempting to create the request',
          timeout: 3500
        }
        this.snackbar = true;
      });
    },
    getTimeAgo(timestamp) {
      return dayjs(timestamp).fromNow();
    },
    deleteLfg() {
      const db = getDatabase();
      remove(ref(db, `/lfg/${this.currentUser.uid}`))
      .then(() => {
        this.lfgDeleteConfirm = false;
        this.toast = {
          color: '#009c00',
          text: 'Looking For Group request deleted',
          timeout: 3500
        }
        this.snackbar = true;
      })
      .catch((error) => {
        this.toast = {
          color: '#e00000',
          text: 'An error ocurred attempting to delete the request',
          timeout: 3500
        }
        this.snackbar = true;
      });
    }
  }
}
</script>

<style>
@import '../../static/fonts/style.css';
@import url('https://fonts.googleapis.com/css?family=Cookie&display=swap');

.theme--dark.v-application {
  background-image: linear-gradient(135deg, #11100e 14.29%, #0c0c0c 14.29%, #0c0c0c 50%, #11100e 50%, #11100e 64.29%, #0c0c0c 64.29%, #0c0c0c 100%) !important;
  background-size: 9.90px 9.90px !important;
  color: #968465 !important;
  font-family: 'Bender Regular', 'Roboto', 'sans serif';
}
.caption-text {
  color: #968465 !important;
  font-size: 0.85rem;
  font-family: 'Bender Regular', 'Roboto', 'sans serif';
}

.v-list-item--link::before {
  background-color: #968465 !important;
}

.v-navigation-drawer {
  z-index: 170 !important;
}
.v-navigation-drawer a {
  text-decoration: none;
}

.v-app-bar {
  z-index: 165 !important;
}

.v-menu__content {
  z-index: 300 !important;
}

.theme--dark.v-card {
  background-color: #161616 !important;
}
.card-header {
  background-color: #000000;
  color: #968465;
  font-family: 'Bender Bold', 'Roboto', 'sans serif';
  font-size: 1.75rem !important;
}
.ins-container {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.bmc-button img {
  width: 35px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}
.bmc-button {
  color: #968465 !important;
  padding: 7px 10px 7px 10px !important;
  line-height: 35px !important;
  height: 51px !important;
  min-width: 217px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  background-color: #e4e4e4;
  border-radius: 5px !important;
  border: 1px solid transparent !important;
  padding: 7px 10px 7px 10px !important;
  font-size: 22px !important;
  letter-spacing: 0.6px !important;
  margin: 0 auto !important;
  font-family: 'Cookie', cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;
}
.bmc-dark {
  background-color: #000000;
}
.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  -webkit-box-shadow: 0px 1px 2px 2px #9684659d !important;
  text-decoration: none !important;
  box-shadow: 0px 1px 2px 2px #9684659d !important;
  opacity: 0.85 !important;
}

.lfg-request {
  margin-top: -2px;
  margin-left: 8px;
}
.lfg-request-active {
  color: #009c00;
}
.lfg-request-inactive {
  color: #e00000;
}
.primary-faded {
  background-color: rgba(150, 132, 101, 0.2);

}
</style>
