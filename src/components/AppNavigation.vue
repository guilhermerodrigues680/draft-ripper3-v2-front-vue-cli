<template>
  <div>
    <v-list-item class="navigation-title">
      <v-list-item-content>
        <v-list-item-title>Navegação</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        link
        v-for="link in links"
        :key="link.title"
        :to="link.to"
        color="primary"
        :ripple="{ class: 'primary--text' }"
      >
        <v-list-item-icon>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{link.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
    <v-divider></v-divider>

    <v-list dense>
      <!-- Item - Selecionar outro BRT -->
      <v-list-item
        link
        to="/"
        color="primary"
        :ripple="{ class: 'primary--text' }"
      >
        <v-list-item-icon>
          <v-icon>mdi-arrow-left-bold-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Selecionar outro BRT</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Item - Documentação API -->
      <v-list-item
        link
        to="/api-doc"
        color="primary"
        :ripple="{ class: 'primary--text' }"
      >
        <v-list-item-icon>
          <v-icon>mdi-file-cloud-outline</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Documentação da API</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Item - BI Ripper -->
      <v-list-item
        link
        href="/bi/index.html"
        color="primary"
        :ripple="{ class: 'primary--text' }"
      >
        <v-list-item-icon>
          <v-icon>mdi-open-in-new</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>BI Ripper</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>


  </div>
</template>

<script>
export default {
  name: 'AppNavigation',
  
  data: () => ({
    //
  }),

  computed: {
    links: function() {
      return [
        // { icon: "mdi-arrow-left-bold-outline", title: "Selecionar BRT", to: '/' },
        { icon: "mdi-home", title: "Páginal Inicial", to: `/brt/${this.$route.params.idBRT}/home` },
        { icon: "mdi-vector-polyline-plus", title: "Classificar Linhas", to: `/brt/${this.$route.params.idBRT}/cadastro-classificacao-linha` },
        { icon: "mdi-vector-point", title: "Classificar Linhas Alimentadas", to: `/brt/${this.$route.params.idBRT}/cadastro-classificacao-linha` },
        { icon: "mdi-table-column-plus-after", title: "Classificar Sequência de Pernas", to: `/brt/${this.$route.params.idBRT}/cadastro-classificacao-pernas` },
        { icon: "mdi-circle-edit-outline", title: "Editar Linhas Classificadas", to: `/brt/${this.$route.params.idBRT}/edicao-linhas-classificadas` },
        { icon: "mdi-currency-usd-circle-outline", title: "Editar Operadoras/Financeiras", to: `/brt/${this.$route.params.idBRT}/operadoras-financeiras` },
        { icon: "mdi-view-sequential-outline", title: "Editar Viagens Classificadas", to: `/brt/${this.$route.params.idBRT}/visualizacao-viagens-classificadas` },
        // { icon: "mdi-view-sequential-outline", title: "Debug - Viagens Classificadas", to: `/brt/${this.$route.params.idBRT}/viagens-classificadas` },
        { icon: "mdi-tools", title: "Debug - Processamento Conf.", to: `/brt/${this.$route.params.idBRT}/processamento-config` },
        // { icon: "mdi-view-dashboard", title: "Foo", to: `/brt/${this.$route.params.idBRT}/foo` },
        // { icon: "mdi-plus", title: "Bar", to: `/brt/${this.$route.params.idBRT}/bar` },
        // { icon: "mdi-forum", title: "About", to: `/brt/${this.$route.params.idBRT}/about` }
      ]
    }
  },

}
</script>

<style scoped>
.navigation-title {
  height: 3.95rem;
}
</style>