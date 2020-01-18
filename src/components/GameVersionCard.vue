<template>
  <v-card>
    <v-card-title class="headline font-weight-bold grey darken-4">
      Current Game Version
    </v-card-title>
    <v-card-text class="pt-4">
      <h2>{{ $static.wikiData.edges[0].node.gameVersion }}</h2>
      <p>Updated: {{ $static.wikiData.edges[0].node.gameVersionUpdated }}</p>
      <v-divider class="mb-4" />
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
  wikiData: allWiki {
    edges {
      node {
        gameVersion,
        gameVersionUpdated
      }
    }
  }
}
</static-query>

<script>
export default {}
</script>

<style>

</style>