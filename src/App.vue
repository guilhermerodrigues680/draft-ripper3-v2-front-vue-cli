<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  title: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="sass">
  @import '../node_modules/typeface-roboto/index.css'
</style>