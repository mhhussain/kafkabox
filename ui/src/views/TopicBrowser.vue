<template>
  <v-app id="kbx">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <NavigationDrawer :links="topics"></NavigationDrawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>Events</v-subheader>

              <v-list two-line>
                <template v-for="(event, index) in events">
                  <v-list-item
                    :key="index"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        Event offset [{{ event.offset }}] -- timestamp [{{ event.timestamp }}]
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        <pre>{{ JSON.stringify(event.body, ' ', 2) }}</pre>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="index !== events.length-1"
                    :key="`divider-${index}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from '../components/NavigationDrawer.vue';

export default {
  name: 'Home',
  components: {
    NavigationDrawer,
  },
  data: () => ({
    drawer: null,
    topics: [
      { name: 'test.one' },
      { name: 'test.two' },
      { name: 'bgxgfxbgfx' },
    ],
    events: [
      {
        topic: {
          name: 'test.one',
          partition: 0,
        },
        offset: 0,
        timestamp: 'tbd',
        body: {
          message: 'bunny',
        },
      },
      {
        topic: {
          name: 'test.one',
          partition: 0,
        },
        offset: 1,
        timestamp: 'tbd',
        body: {
          message: 'bear',
        },
      },
    ],
  }),
};
</script>
