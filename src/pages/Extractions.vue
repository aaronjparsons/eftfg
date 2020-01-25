<template>
  <Layout>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-autocomplete
          v-model="input"
          item-text="node.label"
          :items="$page.extracts.edges"
          return-object
          solo
          placeholder="Search by extract or by map..."
        />
      </v-col>
    </v-row>
  </Layout>
</template>

<page-query>
query {
  extracts: allExtracts {
    edges {
      node {
        type,
        label,
        map,
        marker,
        description,
        image,
        extractType,
        extractNotes
      }
    }
  }
}
</page-query>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style>

</style>