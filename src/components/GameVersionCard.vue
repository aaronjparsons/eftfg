<template>
  <v-card>
    <v-card-title class="headline font-weight-bold grey darken-4">
      Current Game Version
    </v-card-title>
    <v-card-text>
      <h2>{{ $static.gameVersion.edges[0].node.version }}</h2>
      <p>Updated: {{ $static.gameVersion.edges[0].node.updated }}</p>
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
</template>

<static-query>
query {
  gameVersion: allGameVersion {
    edges {
      node {
        version,
        updated
      }
    }
  }
}
</static-query>

<script>
export default {

}
</script>

<style>

</style>