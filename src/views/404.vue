<template>
  <v-container fluid class="fill-height align-start">
    <v-container fluid class="ma-0 pa-0">

    <v-row>
      <v-col>
        <h1 class="text-h3 font-weight-light">
          Página não encontrada
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <p class="text-h5">A página que você procura não existe.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img
          :src="require('../assets/not-found.png')"
          contain
          height="200"
        />
      </v-col>
    </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: '404',
  mounted () {
    console.log(this, '404 - Página não encontada', this.$router.currentRoute.path)
  }
}
</script>

<style scoped>
  span {
    background-color: pink;
  }
</style>