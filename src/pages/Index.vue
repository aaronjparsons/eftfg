<template>
  <Layout>
    <v-row>
      <v-col sm="6" cols="12" class="flex-column">
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4">
            Current Game Version
          </v-card-title>
          <v-card-text>
            <h2>01.01.1000</h2>
            <p>Updated: Jan 01 2020</p>
            <v-divider />
            <a
              href="https://escapefromtarkov.gamepedia.com/Changelog"
              target="_blank"
            >
              Click here to read the change log over on the Escape From Tarkov
              Wiki.
            </a>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-title class="headline font-weight-bold grey darken-4">
            EFTFG Updates
          </v-card-title>
          <v-card-text>
            <p class="font-weight-bold">Updated: Jan 1 2020</p>
            <ul>
              <li v-for="n in 2" :key="n">
                Here is a summary item
              </li>
            </ul>
            <v-divider />
            <v-dialog v-model="changelogDialog" width="500">
              <template v-slot:activator="{ on }">
                <v-btn color="red lighten-2" v-on="on">
                  Click Me
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline font-weight-bold grey darken-4" primary-title>
                  EFTFG Full Changelog
                </v-card-title>
                <v-card-text>
                  ...
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="changelogDialog = false">
                    I accept
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-divider />
            <p>If you notice any errors on the site or have a feature request, tweet at me!</p>
            <a class="link" href="https://twitter.com/ChewyDinosaur">
              @ChewyDinosaur
            </a>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6" cols="12">
        <v-card>
          <v-card-title>Title</v-card-title>
          <v-card-text>adsasd asd asd qwd asjaf j qwd asd</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Hello, world!"
  },

  data() {
    return {
      changelogDialog: false
    }
  }
};
</script>

<style>
.flex-column .v-card:first-of-type {
  margin-bottom: 12px;
}
</style>
