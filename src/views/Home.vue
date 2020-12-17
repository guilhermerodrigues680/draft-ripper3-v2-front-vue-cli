<template>
  <v-container class="home">
    <h1 class="text-center">Páginal Inicial - Viagens classificadas</h1>

    <v-row>
      <v-col md="12">
        <v-text-field
          @input="debounceSearch"
          label="Pesquisar"
          class="mx-4"
        ></v-text-field>
      </v-col>
      <v-col md="12">
        <v-data-table
          :headers="headers"
          :items="viagensClassificadas"
          :items-per-page="5"
          :search="search"
          :custom-filter="filterOnlyEquals"
          class="elevation-1"
        >

          <template v-slot:[`item.usuId`]="{ item }">
            <v-btn text @click="usuIdSelecionado($event, item)">
              {{ item.usuId }}
            </v-btn>
          </template>

        </v-data-table>
      </v-col>
    </v-row>

    <v-row v-if="pernasRastreio.length > 0">
      <v-col md="12">
        <h1 class="text-center">Rastreio do usuário selecionado</h1>
        <v-data-table
          dense
          :headers="headersRastreio"
          :items="pernasRastreio"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getViagensClassificadas } from "../services/api-services"
import _ from 'lodash';

export default {
  name: 'Home',

  data: () => ({
    headers: [
      { text: 'Usuário', value: 'usuId' },
      { text: 'Classificação da Viagem', value: 'viagemClassificacaoDescricao' },
      { text: 'Operadora', value: 'operadoraId' },
      { text: 'Receita Operadora', value: 'receitaOperadora' },
    ],
    viagensClassificadas: [],
    search: '',
    selected: [],
    headersRastreio: [
      { text: 'Usuário', value: 'usuId' },
      { text: 'Linha em uso', value: 'linUso' },
      { text: 'Operadora', value: 'operadoraIdUso' },
      { text: 'Tipo de débito', value: 'r95TipoDebito' },
      { text: 'Sequência Integração', value: 'r95NumseqIntegra' },
      { text: 'Sequência', value: 'r95Seqtrn' },
      { text: 'Tarifa', value: 'tarifa' },
      { text: 'Valor Debitado', value: 'valorDebitado' },
      { text: 'ID Ultilização', value: 'r95Id' },
    ],
    pernasRastreio: []
  }),

  mounted: async function () {
    console.debug('this: ', this)
    try {
      const apiRes = await getViagensClassificadas(new Date(2020, 10, 23))
      this.viagensClassificadas = apiRes.viagensClassificadasEReceitas//.slice(0, 10)
      console.info('Viagens carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar as viagens classificadas')
    }
  },

  methods: {
    filterOnlyEquals (value, search, item) {
      return (value != null && search != null && value == search)
        || (item.pernas.map(lp => lp.linIdUso.toFixed()).indexOf(search) !== -1)
        || (item.pernas.map(lp => lp.r95Id.toFixed()).indexOf(search) !== -1)
        || (item.pernas.map(lp => lp.linUso.toLowerCase()).indexOf(search.toLowerCase()) !== -1)
    },
    usuIdSelecionado (evt, item) {
      this.pernasRastreio = item.pernas
    },
    debounceSearch: _.debounce(function (value) {
      this.search = value;
    }, 2000)
  },
}
</script>
