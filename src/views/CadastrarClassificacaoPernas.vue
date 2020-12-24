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
import apiService from "../services/api-service";

export default {
  name: 'CadastrarClassificacaoPernas',

  data: () => ({
    tiposLinhasPerna: [],
    tiposLinhas: [],
    cadastroRegra: {
      descricao: '',
      pernas: [],
      pernaOperadora: null,
      pernasComReceita: []
    }
  }),

  computed: {
    pernaIdxArr: function() {
      return this.cadastroRegra.pernas.map((p, idx, arr) => ({ idx: idx, text: `${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === arr.length - 1 ? '(Destino)' : ''}` }))
    }
  },

  created: async function () {
    try {
      // const apiRes = await apiService.getTodasLinhas();
      // this.tiposLinhas = apiRes.linhas.map(lin => ({ linId: lin.linId, text: `${lin.codificacao} - ${lin.descricao}` }))
      const apiRes = await apiService.getTiposLinha();
      this.tiposLinhas = apiRes.tiposDeLinha.map(t => ({ id: t.id, nome: t.nome }))
      console.log(apiRes)
      console.info('Tipos linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os Tipos de linhas')
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
    cadastrarRegra() {
      const regra = {
        descricao: '',
        pernaClassificacaoList: [],
        regraDistribuicao: {
          idxPernaOperadora: null,
          idxsPernaComReceita: [],
          idsLinhasComExcecoes: {},
          erateio: false
        }
      }

      regra.descricao = this.cadastroRegra.descricao

      regra.pernaClassificacaoList = this.cadastroRegra.pernas.map(p => ({ tiposDeLinha: p.map(p1 => ({ id: p1 })) }))
      regra.regraDistribuicao.idxPernaOperadora = this.cadastroRegra.pernaOperadora
      regra.regraDistribuicao.idxsPernaComReceita = this.cadastroRegra.pernasComReceita

      const rawJSON = JSON.stringify(regra, '', 2)
      const blob = new Blob([rawJSON], {type : 'application/json'})
      const url  = URL.createObjectURL(blob)
      window.open(url)
    }
  }

}
</script>
