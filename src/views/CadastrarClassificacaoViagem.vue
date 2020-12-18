<template>
  <v-container>
    <h1>Cadastrar Classificacao de Viagem</h1>

    <v-col>
      <v-text-field label="Nome"></v-text-field>
      <v-text-field label="Descricao"></v-text-field>

      <v-select
        v-model="tiposLinhasPerna"
        :items="tiposLinhas"
        attach
        chips
        label="Tipos de linha para a perna"
        multiple
        name="descricao"
        item-text="descricao"
        item-value="id"
      ></v-select>

      <v-btn
        elevation="2"
        @click="adicionarConjuntoPernas"
      >Adicionar Conjunto de Pernas</v-btn>
    </v-col>

    <v-row class="ma-0 pa-0">
      <v-col
        cols="12"
        sm="8"
        class="ma-0 pa-0"
      >
        <v-slider
          v-model="numberValue"
          label="Index da perna que recebe a receita"
          step="1"
          :min="0"
          :max="pernas.length - 1"
          thumb-color="orange"
          thumb-label="always"
          class="ma-0 pa-0"
        ></v-slider>
      </v-col>
    </v-row>

    <v-container fluid class="ma-0 pa-0">
      <v-checkbox
        v-model="selectedCheckbox"
        v-for="(perna, idx) in pernaArrayName"
        :key="idx"
        :label="idx.toString()"
        :value="idx"
        class="ma-0 pa-0"
      ></v-checkbox>
    </v-container>

    <v-col class="ma-0 pa-0">
      <v-row class="ma-0 pa-0">
        <v-container fluid class="ma-0 pa-0">
          <v-card class="ma-0 pa-0">
            <v-list-item v-for="(perna, idx) in pernaArrayName" :key="idx">
              <v-list-item-content>
                <v-list-item-title>{{ perna.map(p => p.descricao) }} {{ idx }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-container>
      </v-row>
    </v-col>

    <v-btn
      elevation="2"
    >Criar Regra</v-btn>

    <v-btn
      elevation="2"
    >Limpar Campos</v-btn>

  </v-container>
</template>

<script>
import { getTiposLinhas } from "../services/api-services"

export default {
  name: 'CadastrarClassificacaoViagem',

  data: () => ({
    tiposLinhas: [],
    tiposLinhasPerna: [],
    numberValue: null,
    selectedCheckbox: [],
    pernas: []
  }),

  computed: {
    pernaArrayName: function () {
      return this.pernas.map(p => this.tiposLinhas.filter(tl => p.includes(tl.id)));
    }
  },

  mounted: async function () {
    console.log('CadastrarClassificacaoViagem', this);
    try {
      const apiRes = await getTiposLinhas()
      this.tiposLinhas = apiRes.tiposLinhas //.map(t => t.id)
      console.info('Tipos linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os Tipos de linhas')
    }
  },

  methods: {
    adicionarConjuntoPernas: function() {
      this.pernas.push(this.tiposLinhasPerna)
    }
  }

}
</script>
