<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col>
          <h1 class="text-h3 font-weight-light">
            Cadastrar Classificacao de Viagem
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="cadastroRegra.descricao"
            label="Descricao"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
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

        <v-col cols="12" md="4">
          <v-btn
            elevation="2"
            block
            large
            color="primary"
            @click="adicionarConjuntoPernas"
          >Adicionar Conjunto de Pernas</v-btn>
        </v-col>
      </v-row>

      <v-row v-if="cadastroRegra.pernas.length > 0">
        <v-col cols="12" md="8">
          <p>Sequência de ultilização</p>
        </v-col>
      </v-row>
      <v-row v-if="cadastroRegra.pernas.length > 0">
        <v-col cols="12" md="8">
          <v-timeline dense>
            <v-timeline-item v-for="(perna, idx) in cadastroRegra.pernas" :key="idx">
              <v-card class="elevation-2">
                <v-card-title class="body-1">
                  {{ idx + 1 }}ª perna
                  <span class="font-weight-medium">{{ idx === 0 ? '(Origem)' : idx === cadastroRegra.pernas.length-1 ? '(Destino)' : '' }}</span>
                  - {{ tiposLinhas.filter(t => perna.includes(t.id)).map(t => t.nome) }}
                  --- ids: {{ perna }}
                </v-card-title>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

      <v-row v-if="cadastroRegra.pernas.length > 0">
        <v-col cols="12" md="6">
          <v-select
            v-model="cadastroRegra.pernaOperadora"
            :items="pernaIdxArr"
            item-text="text"
            item-value="idx"
            label="Perna da operadora que recebe a receita"
            thumb-color="orange"
            thumb-label="always"
          ></v-select>
        </v-col>
      </v-row>

      <v-row v-if="cadastroRegra.pernas.length > 0">
        <v-col cols="12" md="12">
          <p>Pernas que entram no calculo da receita: </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="2" v-for="(perna, idx) in cadastroRegra.pernas" :key="idx">
          <v-checkbox
            v-model="cadastroRegra.pernasComReceita"
            :label="`${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === cadastroRegra.pernas.length-1 ? '(Destino)' : ''}`"
            :value="idx"
            class="ma-0 pa-0"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="temExcecao"
            color="secondary"
            label="Tem Exceção?"
          >
          </v-checkbox>
        </v-col>
      </v-row>

      <v-row v-if="temExcecao">
        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="linhaExcecao"
            :items="todasLinhas"
            item-text="text"
            item-value="linId"
            label="Linha para adicionar exceção"
          ></v-autocomplete>
        </v-col>

        <v-col cols="6" v-if="linhaExcecao !== null">
          <!-- DIALOG REGRA DISTRIBUICAO -->
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
              >Adicionar Exceção</v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                Exceção
              </v-card-title>

              <v-card-text>
                <RegraDistribuicao :pernas="cadastroRegra.pernas" @adicionarExcecao="adicionarExcessao"/>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" v-if="Object.keys(cadastroRegra.excecoes).length > 0">
          <p>Linhas com exceção: </p> {{ Object.keys(cadastroRegra.excecoes) }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3" v-if="cadastroRegra.pernas.length > 0">
          <v-btn
            @click="cadastrarRegra"
            elevation="2"
            color="primary"
            large
            block
          >Criar Regra</v-btn>
        </v-col>

        <v-col cols="12" md="3">
          <v-btn
            elevation="2"
            color="primary"
            large
            block
            @click="limparCampos"
          >Limpar Campos</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import RegraDistribuicao from "../components/RegraDistribuicao.vue";

import apiService from "../services/api-service";

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
      pernaOperadora: null,
      pernasComReceita: [],
      excecoes: {}
    },
    todasLinhas: [],
    temExcecao: false,
    linhaExcecao: null,
    dialog: false
  }),

  computed: {
    pernaIdxArr: function() {
      return this.cadastroRegra.pernas.map((p, idx, arr) => ({ idx: idx, text: `${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === arr.length - 1 ? '(Destino)' : ''}` }))
    }
  },

  created: async function () {
    try {
      const apiRes = await apiService.getTiposLinha();
      this.tiposLinhas = apiRes.tiposDeLinha.map(t => ({ id: t.id, nome: t.nome }))
      console.log(apiRes)
      console.info('Tipos linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os Tipos de linhas')
    }

    try {
      const apiRes = await apiService.getTodasLinhas();
      this.todasLinhas = apiRes.linhas.map(lin => ({ linId: lin.linId, text: `${lin.codificacao} - ${lin.descricao}` }))
      console.log(apiRes)
      console.info('linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os linhas')
    }
  },

  methods: {
    adicionarConjuntoPernas() {
      this.cadastroRegra.pernas.push([...this.tiposLinhasPerna])
      this.tiposLinhasPerna.splice(0, this.tiposLinhasPerna.length)
    },
    limparCampos() {
      this.cadastroRegra.descricao = ''
      this.tiposLinhasPerna.splice(0, this.tiposLinhasPerna.length)
      this.cadastroRegra.pernaOperadora = null
      this.cadastroRegra.pernasComReceita.splice(0, this.cadastroRegra.pernasComReceita.length)
      this.cadastroRegra.pernas.splice(0, this.cadastroRegra.pernas.length);
    },
    cadastrarRegra: async function () {
      const contratoCadastroRegra = {
        descricao: '',
        pernaClassificacaoList: [],
        regraDistribuicao: {
          idxPernaOperadora: null,
          idxsPernaComReceita: [],
          idsLinhasComExcecoes: {},
          erateio: false
        }
      }

      contratoCadastroRegra.descricao = this.cadastroRegra.descricao

      contratoCadastroRegra.pernaClassificacaoList = this.cadastroRegra.pernas.map(p => ({ tiposDeLinha: p.map(p1 => ({ id: p1 })) }))
      contratoCadastroRegra.regraDistribuicao.idxPernaOperadora = this.cadastroRegra.pernaOperadora
      contratoCadastroRegra.regraDistribuicao.idxsPernaComReceita = this.cadastroRegra.pernasComReceita
      contratoCadastroRegra.regraDistribuicao.idsLinhasComExcecoes = Object.keys(this.cadastroRegra.excecoes).length !== 0 ? this.cadastroRegra.excecoes : null

      // Cadastrar classificaco de linha
      try {
        const apiRes = await apiService.postCadastrarRegra(contratoCadastroRegra);
        console.log(apiRes)
        this.showToast('Regra cadastrada!')
      } catch (error) {
        console.error('Ocorreu um erro ao cadastrar a regra')
      }

      // const rawJSON = JSON.stringify(contratoCadastroRegra, '', 2)
      // const blob = new Blob([rawJSON], {type : 'application/json'})
      // const url  = URL.createObjectURL(blob)
      // window.open(url)
    },
    adicionarExcessao(regraDistribuicao) {
      this.cadastroRegra.excecoes[this.linhaExcecao] = regraDistribuicao
      this.dialog = false
      this.linhaExcecao = null
    },
    showToast: function (message, title = 'Sucesso', icon = 'success') {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: icon,
        title: title,
        text: message,
      });
    }
  }

}
</script>
