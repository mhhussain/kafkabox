<template>
  <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-sheet
        color="grey lighten-4"
        class="pa-4"
      >
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        >
          <h2>kbx</h2>
        </v-avatar>

        <h3>kafkabox</h3>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: ['links'],
  data: () => ({
    drawer: null,
  }),
  mounted() {
    console.log(this.links);
  },
};
</script>

<style>

</style>
