<template>
  <span>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          small
        >
          <slot>+Detalhes</slot>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{nomeViagemClassificada}} - Regra de distribuição: {{regraDistribuicao.nome}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- <v-btn
              dark
              text
              @click="dialog = false"
            >
              Save
            </v-btn> -->
          </v-toolbar-items>
        </v-toolbar>

        <v-container fluid>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-checkbox
                    class="mt-0"
                    v-model="regraDistribuicao.contabilizarComoDemandaIntegrada"
                    disabled
                    label="Contabilizar como demanda integrada"
                    dense
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    class="mt-0"
                    v-model="regraDistribuicao.erateio"
                    disabled
                    :label="regraDistribuicao.erateio ? 'É rateio: sim' : 'É rateio: não'"
                    dense
                    hide-details
                  ></v-checkbox>
                </v-col>
                
                <v-col cols="12">
                  Perna da Operadora: {{ regraDistribuicao.idxPernaOperadora ? regraDistribuicao.idxPernaOperadora + 1 : 'Não possui' }}
                </v-col>
                
                <v-col cols="12">
                  Perna com o Terminal: {{ regraDistribuicao.idxPernaTerminalOuEstacao ? regraDistribuicao.idxPernaTerminalOuEstacao + 1 : 'Não possui' }}
                </v-col>
                
                <v-col cols="12">
                  Tipo de Rateio: {{ regraDistribuicao.tipoRateio || 'Não possui' }}
                </v-col>
                
                <v-col cols="12">
                  Pernas Com Receita: {{ regraDistribuicao.idxsPernaComReceita.map(pidx => pidx + 1).join(', ') }}
                </v-col>
                
                <v-col cols="12">
                  Ids dos terminais Rateio N Terminais: {{ regraDistribuicao.listaIdsTerminaisRateioNTerminais ? regraDistribuicao.listaIdsTerminaisRateioNTerminais.join(', ') : 'Não possui' }}
                </v-col>
                
                <v-col cols="12">
                  Operadora Participacao Rateio Custom: {{ regraDistribuicao.mapaOperadoraParticipacaoRateioCustom || 'Não possui' }}
                </v-col>
                
                <v-col cols="12">
                  Ids de linhas com exceção: {{regraDistribuicao.idsLinhasComExcecoes ? Object.keys(regraDistribuicao.idsLinhasComExcecoes) : 'Não possui'}}
                  <ul v-if="regraDistribuicao.idsLinhasComExcecoes !== null">
                    <li v-for="(regraDistribuicaoExcecao, linId) in regraDistribuicao.idsLinhasComExcecoes" :key="linId">
                      ({{ linId }}) -
                      <RegraDeDistribuicaoVisualizacao :regraDistribuicao="regraDistribuicaoExcecao"
                        :nomeViagemClassificada="nomeViagemClassificada"
                        :pernaClassificacaoList="pernaClassificacaoList"
                      >+Detalhes</RegraDeDistribuicaoVisualizacao>
                    </li>
                  </ul>
                </v-col>
              </v-row>
            </v-col>
            
            <!-- Coluna Metada Direita da TELA -->
            <v-col cols="6">
              <TimelineUtilizacao :pernaClassificacaoList="pernaClassificacaoList" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import TimelineUtilizacao from "./TimelineUtilizacao.vue";

export default {
  name: "RegraDeDistribuicaoVisualizacao",

  components: {
    TimelineUtilizacao
  },

  props: {
    nomeViagemClassificada: String,
    pernaClassificacaoList: Array,
    regraDistribuicao: Object
  },

  data: () => ({
    dialog: false
  })

}
</script>
