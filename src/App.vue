<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-btn
          to="/"
          text
        >
          Home
        </v-btn>

        <v-btn
          to="/about"
          text
        >
          About
        </v-btn>

        <v-btn
          to="/cadastrar-classificacao-viagem"
          text
        >
          Cadastrar classificacao de viagem
        </v-btn>

      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
