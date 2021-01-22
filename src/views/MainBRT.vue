<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      :width="280"
    >
      <AppNavigation />
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
      >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>BRT {{ $route.params.idBRT }} - Debug</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="ma-0 pa-0 fill-height">
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer absolute color="primary" dark app>
      <v-col
        class="text-center"
        cols="12"
      >
        <strong>Ripper</strong> - {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import AppNavigation from '../components/AppNavigation.vue';

export default {
  name: 'MainBRT',
  title: 'MainBRT',

  components: {
    AppNavigation,
  },

  data: () => ({
    drawer: null
  }),
};
</script>