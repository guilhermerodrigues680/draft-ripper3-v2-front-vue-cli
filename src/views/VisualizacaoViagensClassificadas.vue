<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-light">
          Classificações de Viagem
        </h1>
      </v-col>
    </v-row>
    
    <v-row v-for="cl in classificacoesViagens" :key="cl.id" class="blue-grey lighten-5 rounded-lg mx-1 my-3">
      <v-col cols="6">
        <div class="font-weight-black mr-2">
          <span class="text-caption">({{cl.id}})</span>
          {{cl.descricao}}
        </div>
        
        <RegraDeDistribuicaoVisualizacao
          :regraDistribuicao="cl.regraDistribuicao"
          :nomeViagemClassificada="cl.descricao"
          :pernaClassificacaoList="cl.pernaClassificacaoList"
        >+Detalhes</RegraDeDistribuicaoVisualizacao>
        
        <v-btn
          elevation="2"
          small
          color="red"
          class="ml-2 white--text"
          @click="deletarClassificacao(cl.id)"
        >Excluir Classificação</v-btn>
      </v-col>
      <v-col cols="6">
        <TimelineUtilizacao :pernaClassificacaoList="cl.pernaClassificacaoList" />
      </v-col>
      <!-- <v-col cols="12">
        <v-divider></v-divider>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
import TimelineUtilizacao from "../components/viagensClassificadas/TimelineUtilizacao.vue";
import RegraDeDistribuicaoVisualizacao from "../components/viagensClassificadas/RegraDeDistribuicaoVisualizacao.vue";

import * as apiService from "../services/api-service";

export default {
  name: "VisualizacaoViagensClassificadas",
  title: "VisualizacaoViagensClassificadas",

  components: {
    TimelineUtilizacao,
    RegraDeDistribuicaoVisualizacao
  },

  data: () => ({
    classificacoesViagens: []
  }),

  created: async function () {
    this.loadViagensClassificadas()
  },

  methods: {
    loadViagensClassificadas: async function () {
      try {
        const idBRT = this.$route.params.idBRT;
        const apiRes = await apiService.regrasDeClassificacao.getViagensClassificacao(idBRT);
        this.classificacoesViagens = apiRes.viagemClassificacaos
          .sort((a,b) => a.descricao > b.descricao)
          .sort((a,b) => a.pernaClassificacaoList.length < b.pernaClassificacaoList.length)
        
        console.log(apiRes)
      } catch (error) {
        console.error(error)
      }
    },
    deletarClassificacao: async function (classificacaoId) {
      const idBRT = this.$route.params.idBRT;
      try {
        await apiService.regrasDeClassificacao.deleteViagemClassificada(idBRT, classificacaoId);
        console.info(`Ok! Classificação ${classificacaoId} excluída!`)
        this.loadViagensClassificadas()
      } catch (error) {
        console.error('Erro ao excluir viagem!', error)
      }
    }
  }

}
</script>