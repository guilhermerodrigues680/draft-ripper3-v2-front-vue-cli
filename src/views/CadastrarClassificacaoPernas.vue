<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 font-weight-light">
            Cadastrar Classificacao de Viagem
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="7">
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="cadastroRegra.descricao"
                label="Descricao"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-autocomplete
                v-model="tiposLinhasPerna"
                :items="tiposLinhas"
                item-text="nome"
                item-value="id"
                chips
                label="Tipos de linha para a perna"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-btn
                elevation="2"
                block
                large
                color="primary"
                @click="adicionarConjuntoPernas"
              >Adicionar Conjunto de Pernas</v-btn>
            </v-col>
          </v-row>

          <!-- Regra de classificacao aqui -->
          <RegraDistribuicao
            v-if="cadastroRegra.pernas.length > 0"
            ref="refRegraDistribuicao"
            :permitirAdicionarExcecao="true"
            :pernas="cadastroRegra.pernas"
            @update-regra-distribuicao="updateRegraDistribuicao"
          />

          <v-row v-if="cadastroRegra.pernas.length > 0">
            <v-col cols="6">
              <v-btn
                @click="cadastrarRegra"
                elevation="2"
                color="success"
                large
                block
                :disabled="cadastroRegra.pernas.length === 0"
              >Criar Regra</v-btn>
            </v-col>

            <v-col cols="6">
              <v-btn
                elevation="2"
                color="error"
                large
                block
                @click="limparCampos"
              >Limpar Campos</v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="5">
          <v-row v-if="cadastroRegra.pernas.length > 0">
            <v-col cols="12">
              <p>Sequência de utilização</p>
            </v-col>
          </v-row>
          <v-row v-if="cadastroRegra.pernas.length > 0">
            <v-col cols="12">
              <v-timeline dense>
                <v-timeline-item v-for="(perna, idx) in cadastroRegra.pernas" :key="idx">
                  <v-card class="elevation-2">
                    <v-card-title class="body-1">
                      {{ idx + 1 }}ª perna
                      <span class="font-weight-medium">{{ idx === 0 ? '(Origem)' : idx === cadastroRegra.pernas.length-1 ? '(Destino)' : '' }}</span>
                      - {{ tiposLinhas.filter(t => perna.includes(t.id)).map(t => t.nome) }}
                      <!-- --- ids: {{ perna }} -->
                    </v-card-title>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import RegraDistribuicao from "../components/classificacaoPernas/RegraDistribuicao.vue";
import Vue from "vue";

import * as apiService from "../services/api-service";

export default {
  name: 'CadastrarClassificacaoPernas',

  components: {
    RegraDistribuicao
  },

  data: () => ({
    tiposLinhasPerna: [],
    tiposLinhas: [],
    cadastroRegra: {
      descricao: '',
      pernas: [],
      regraDistribuicao: null
    }
  }),

  created: async function () {
    try {
      const apiRes = await apiService.tipoLinha.getTiposLinha(this.$route.params.idBRT);
      this.tiposLinhas = apiRes.tiposDeLinha.map(t => ({ id: t.id, nome: t.nome }))
      this.showToast('Tipos linhas carregadas')
    } catch (error) {
      this.showToast('Não foi possivel carregar os Tipos de linhas', 'Erro', 'error')
    }
  },

  methods: {
    adicionarConjuntoPernas() {
      this.cadastroRegra.pernas.push([...this.tiposLinhasPerna])
      this.tiposLinhasPerna.splice(0, this.tiposLinhasPerna.length)
    },
    limparCampos() {
      Vue.set(this, 'cadastroRegra', {
        descricao: '',
        pernas: [],
        regraDistribuicao: null
      })

      this.tiposLinhasPerna.splice(0, this.tiposLinhasPerna.length)
      this.$refs.refRegraDistribuicao.resetFields
    },
    updateRegraDistribuicao(regraDistribuicao) {
      this.cadastroRegra.regraDistribuicao = regraDistribuicao
    },
    cadastrarRegra: async function () {
      // Lista de classificação de pernas
      const pernaClassificacaoList = this.cadastroRegra.pernas.map(p => ({
        tiposDeLinha: p.map(p1 => ({
          id: p1
        }))
      }))

      const contratoCadastroRegra = {
        descricao: this.cadastroRegra.descricao,
        pernaClassificacaoList: pernaClassificacaoList,
        regraDistribuicao: this.cadastroRegra.regraDistribuicao
      }

      // Cadastrar classificaco de linha
      try {
        //const apiRes = 
        await apiService.regrasDeClassificacao.postCadastrarRegra(this.$route.params.idBRT, contratoCadastroRegra);
        this.showToast('Regra cadastrada!')
      } catch (error) {
        this.showToast(error.message + '. ' + error.response.data.message, 'Erro', 'error', true)
      }
    },
    showToast: function (message, title = 'Sucesso', icon = 'success', showConfirmButton = false) {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: showConfirmButton,
        timer: showConfirmButton ? null: 3000,
        icon: icon,
        title: title,
        text: message,
      });
    }
  }

}
</script>
