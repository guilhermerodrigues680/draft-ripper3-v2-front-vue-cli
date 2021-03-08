<template>
  <div>
    <!-- Somente exceções possuem nome -->
    <v-row v-if="permitirAdicionarExcecao !== true">
      <v-col cols="12">
        <v-text-field
          v-model="cadastroRegra.nome"
          label="Nome da Regra"
        ></v-text-field>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12">
        <p>Pernas que entram no calculo da receita: </p>
      </v-col>

      <v-col cols="3" v-for="(perna, idx) in pernas" :key="idx">
        <v-checkbox
          v-model="cadastroRegra.idxsPernaComReceita"
          :label="`${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === pernas.length-1 ? '(Destino)' : ''}`"
          :value="idx"
          class="ma-0 pa-0"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-checkbox
          v-model="cadastroRegra.eRateio"
          color="primary"
          label="É rateio?"
        >
        </v-checkbox>
      </v-col>

      <v-col cols="9">
        <v-select
          v-if="cadastroRegra.eRateio"
          v-model="cadastroRegra.tipoRateio"
          :items="tiposDeRateio"
          item-text="descricao"
          item-value="id"
          label="Tipo do rateio"
        ></v-select>
      </v-col>      
    </v-row>

    <v-row v-if="!cadastroRegra.eRateio">  
      <v-col cols="12">
        <v-select
          v-model="cadastroRegra.idxPernaOperadora"
          :items="pernaIdxArr"
          item-text="text"
          item-value="idx"
          label="Perna da operadora que recebe a receita"
          thumb-color="orange"
          thumb-label="always"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Rateio Terminal -->
    <v-row v-if="cadastroRegra.eRateio && cadastroRegra.tipoRateio === 1">  
      <v-col cols="12">
        <v-select
          v-model="cadastroRegra.idxPernaTerminalOuEstacao"
          :items="pernaIdxArr"
          item-text="text"
          item-value="idx"
          label="Perna que contém o terminal"
        ></v-select>
      </v-col>
    </v-row>

    <!-- Rateio Custom -->
    <v-row>
      <v-col cols="12" v-if="cadastroRegra.eRateio && cadastroRegra.tipoRateio === 3">
        <DialogDefinirParticipacao
          v-if="cadastroRegra.eRateio && cadastroRegra.tipoRateio === 3"
          @setPercentual="setPercentual"
        />
      </v-col>
    </v-row>
    
    <!-- Rateio N Terminais -->
    <v-row>
      <v-col cols="12" v-if="cadastroRegra.eRateio && cadastroRegra.tipoRateio === 4">
        <v-select
          v-if="cadastroRegra.eRateio && cadastroRegra.tipoRateio === 4"
          v-model="cadastroRegra.listaIdsTerminaisRateioNTerminais"
          :items="terminaisDisponiveis"
          :menu-props="{ top: true }"
          label="Terminais"
          multiple
          dense
          chips
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="!cadastroRegra.eRateio">
      <v-col cols="10">
        <v-checkbox
          v-model="cadastroRegra.contabilizarComoDemandaIntegrada"
          color="primary"
          label="Contabilizar como demanda integrada? (Se elegível)"
        >
        </v-checkbox>
      </v-col>

      <v-col cols="2"></v-col>
    </v-row>

    <v-row v-if="permitirAdicionarExcecao">
      <v-col cols="3">
        <v-checkbox
          v-model="temExcecao"
          color="secondary"
          label="Tem Exceção?"
        >
        </v-checkbox>
      </v-col>

      <v-col cols="9" v-if="!temExcecao"></v-col>

      <v-col cols="9" v-if="temExcecao">
        <v-autocomplete
          v-model="linhaExcecao"
          :items="todasLinhas"
          item-text="text"
          item-value="linId"
          label="Linha para adicionar exceção"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" v-if="linhaExcecao !== null">
        <!-- DIALOG RECURSIVO - REGRA DISTRIBUICAO -->
        <v-dialog v-model="dialogRecursivoExcecao">
          <template v-slot:activator="{ on, attrs }">
            <div
              v-bind="attrs"
              v-on="on"
            >
              <v-btn
                color="orange"
                block
              >Adicionar Exceção</v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Exceção {{ todasLinhas.find(l => l.linId === linhaExcecao) }}
            </v-card-title>

            <v-card-text>
              <RegraDistribuicao ref="refDialogExcecao" :pernas="pernas" :permitirAdicionarExcecao="false" @update-regra-distribuicao="updateRegraDistribuicaoExcessao"/>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="cancelarExcecao"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="primary"
                text
                @click="salvarExcecao"
              >
                Salvar Exceção
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" v-if="linhasComExcecoes.length > 0">
        <p>Linhas com exceção</p>
        <ul>
          <li v-for="linha in linhasComExcecoes" :key="linha.linId">({{linha.linId}}) {{linha.text}}</li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DialogDefinirParticipacao from "./DialogDefinirParticipacao.vue";
import Vue from "vue";

import * as apiService from "../../services/api-service";

export default {
  name: 'RegraDistribuicao',

  components: {
    DialogDefinirParticipacao,
  },

  props: {
    pernas: Array,
    permitirAdicionarExcecao: Boolean
  },

  data: () => ({
    todasLinhas: [],
    tiposDeRateio: [],
    terminaisDisponiveis: [],
    temExcecao: false,
    linhaExcecao: null,
    dialogRecursivoExcecao: false,
    cadastroRegra: {
      nome: null,
      idxPernaOperadora: null,
      idxPernaTerminalOuEstacao: null,
      mapaOperadoraParticipacaoRateioCustom: null,
      idxsPernaComReceita: [],
      contabilizarComoDemandaIntegrada: true,
      eRateio: false,
      tipoRateio: null,
      listaIdsTerminaisRateioNTerminais: null,
      idsLinhasComExcecoes: {}
    },
    regraDistribuicaoExcecao: null
  }),

  computed: {
    pernaIdxArr: function() {
      return this.pernas.map((p, idx, arr) => ({ idx: idx, text: `${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === arr.length - 1 ? '(Destino)' : ''}` }))
    },
    linhasComExcecoes: function () {
      const idsLinhasExc = Object.keys(this.cadastroRegra.idsLinhasComExcecoes).map(k => +k)
      return this.todasLinhas.filter(lin => idsLinhasExc.includes(+lin.linId))
    }
  },

  watch: {
    cadastroRegra: {
      handler(/*newVal, oldVal*/) {
        const regraDistribuicao = this.montarRegraDistribuicao();
        this.$emit('update-regra-distribuicao', regraDistribuicao)
      },
      deep: true
    }
  },

  created: async function () {
    this.tiposDeRateio = [
      { id: 1, descricao: "Rateio Terminal" },
      { id: 2, descricao: "Rateio BRT" },
      { id: 3, descricao: "Rateio Custom" },
      { id: 4, descricao: "Rateio N Terminais" }
    ]

    try {
      const apiRes = await apiService.classificacaoLinha.getListaClassificaoLinha(this.$route.params.idBRT)
      const terminaisDisponiveis = apiRes.classificacaoLinha
        .filter(cl => cl.eterminal)
        .map(cl => ({ value: cl.linId,  text: `${cl.linha.codificacao} - ${cl.linha.descricao}`}));

      this.terminaisDisponiveis = terminaisDisponiveis;
    } catch (error) {
      console.error(error)
    }

    if (!this.permitirAdicionarExcecao) {
      return
    }

    try {
      const apiRes = await apiService.linha.getTodasLinhas();
      this.todasLinhas = apiRes.linhas.map(lin => ({ linId: lin.linId, text: `${lin.codificacao} - ${lin.descricao}` }))
      console.info('linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os linhas')
    }
  },

  methods: {
    setPercentual(mapaOperadoraParticipacaoRateioCustom) {
      this.cadastroRegra.mapaOperadoraParticipacaoRateioCustom = mapaOperadoraParticipacaoRateioCustom
    },
    salvarExcecao: function () {
      Vue.set(this.cadastroRegra.idsLinhasComExcecoes, this.linhaExcecao, this.regraDistribuicaoExcecao)
      this.$refs.refDialogExcecao.resetFields
      this.dialogRecursivoExcecao = false
      this.linhaExcecao = null
      this.regraDistribuicaoExcecao = null
    },
    cancelarExcecao: function () {
      this.$refs.refDialogExcecao.resetFields
      this.dialogRecursivoExcecao = false
      //this.linhaExcecao = null
      this.regraDistribuicaoExcecao = null
    },
    updateRegraDistribuicaoExcessao(regraDistribuicaoExcecao) {
      this.regraDistribuicaoExcecao = regraDistribuicaoExcecao
    },
    resetFields: function () {
      Vue.set(this, 'cadastroRegra', {
        idxPernaOperadora: null,
        idxPernaTerminalOuEstacao: null,
        mapaOperadoraParticipacaoRateioCustom: null,
        idxsPernaComReceita: [],
        contabilizarComoDemandaIntegrada: true,
        eRateio: false,
        tipoRateio: null,
        idsLinhasComExcecoes: {}
      })

      this.temExcecao = false
      this.linhaExcecao = null
      this.resetting = false
      this.regraDistribuicaoExcecao = null
    },
    montarRegraDistribuicao: function () {
      const modelRegraDistribuicao = {
        nome: null,
        tipoRateio: null,
        idxPernaTerminalOuEstacao: null,
        mapaOperadoraParticipacaoRateioCustom: null,
        idxPernaOperadora: null,
        idxsPernaComReceita: null,
        contabilizarComoDemandaIntegrada: null,
        idsLinhasComExcecoes: null,
        listaIdsTerminaisRateioNTerminais: null,
        erateio: null
      };

      // Regra de Distribuição Obrigatorio
      modelRegraDistribuicao.nome = this.cadastroRegra.nome
      modelRegraDistribuicao.idxsPernaComReceita = this.cadastroRegra.idxsPernaComReceita
      modelRegraDistribuicao.erateio = this.cadastroRegra.eRateio

      if (!this.cadastroRegra.eRateio) {
        // Regra de Distribuição Não Rateio
        modelRegraDistribuicao.idxPernaOperadora = this.cadastroRegra.idxPernaOperadora
        modelRegraDistribuicao.contabilizarComoDemandaIntegrada = this.cadastroRegra.contabilizarComoDemandaIntegrada
      } else {
        // Regra de Distribuição Rateio
        modelRegraDistribuicao.tipoRateio = this.cadastroRegra.tipoRateio;
        
        if (this.cadastroRegra.tipoRateio === 1) {
          modelRegraDistribuicao.idxPernaTerminalOuEstacao = this.cadastroRegra.idxPernaTerminalOuEstacao
        //} else if (this.cadastroRegra.tipoRateio === 2) {
          // nada
        } else if (this.cadastroRegra.tipoRateio === 3) {
          modelRegraDistribuicao.mapaOperadoraParticipacaoRateioCustom = this.cadastroRegra.mapaOperadoraParticipacaoRateioCustom
        } else if (this.cadastroRegra.tipoRateio === 4) {
          modelRegraDistribuicao.listaIdsTerminaisRateioNTerminais = this.cadastroRegra.listaIdsTerminaisRateioNTerminais
        }
      }

      if (Object.keys(this.cadastroRegra.idsLinhasComExcecoes).length > 0) {
        // Regra de Distribuição Exceções
        modelRegraDistribuicao.idsLinhasComExcecoes = this.cadastroRegra.idsLinhasComExcecoes
      }

      return modelRegraDistribuicao
    }
  }

}
</script>
