<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
    >
      <v-toolbar-title>Documentação da API - OpenAPI Specification - Version 3.0.3 | Swagger</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text @click="voltarSelecionaBRT">
        <v-icon>mdi-arrow-left</v-icon>
        <span>Voltar</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="ma-0 pa-0 fill-height">
        <v-row>
          <v-col cols="12">
            <div class="swagger" id="swagger"></div>
          </v-col>
        </v-row>
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
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

export default {
  name: "APIDoc",
  title: 'Documentação API',
  
  mounted() {
    //const spec = require('../assets/spec.json');
    SwaggerUI({
      // spec: spec,
      url: 'openapi-ripper.yaml',
      dom_id: '#swagger'
    })
  },

  methods: {
    voltarSelecionaBRT: function () {
      this.$router.push('/')
    },
  }
}
</script>

<style>
#swagger {
  width: 100%;
}

#swagger pre.microlight code {
  /* all: unset; */
  background-color: unset;
  color: #eee;
  padding: unset;
}

#swagger .swagger-ui .info {
  background-color: unset !important;
}
</style>
