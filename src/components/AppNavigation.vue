<template>
  <div>
    <v-list-item>
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
        { icon: "mdi-arrow-left-bold-outline", title: "Selecionar BRT", to: '/' },
        { icon: "mdi-home", title: "Páginal Inicial", to: `/brt/${this.$route.params.idBRT}/home` },
        { icon: "mdi-vector-polyline-plus", title: "Cadastro Classificação Linha", to: `/brt/${this.$route.params.idBRT}/cadastro-classificacao-linha` },
        { icon: "mdi-currency-usd-circle-outline", title: "Operadoras e Financeiras", to: `/brt/${this.$route.params.idBRT}/operadoras-financeiras` },
        { icon: "mdi-table-column-plus-after", title: "Cadastro Classificação Pernas", to: `/brt/${this.$route.params.idBRT}/cadastro-classificacao-pernas` },
        { icon: "mdi-view-sequential-outline", title: "Viagens Classificadas", to: `/brt/${this.$route.params.idBRT}/viagens-classificadas` },
        { icon: "mdi-tools", title: "Processamento Conf.", to: `/brt/${this.$route.params.idBRT}/processamento-config` },
        { icon: "mdi-view-dashboard", title: "Foo", to: `/brt/${this.$route.params.idBRT}/foo` },
        { icon: "mdi-plus", title: "Bar", to: `/brt/${this.$route.params.idBRT}/bar` },
        { icon: "mdi-forum", title: "About", to: `/brt/${this.$route.params.idBRT}/about` }
      ]
    }
  },

}
</script>