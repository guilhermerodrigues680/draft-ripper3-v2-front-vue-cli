<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">

      <v-row>
        <v-col>
          <h1 class="text-h3 font-weight-light">
            Operadoras e Financeiras
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-text-field
            @input="debounceSearch"
            label="Pesquisar"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="linhasClassificadas"
            :items-per-page="5"
            :search="search"
            :custom-filter="customFilter"
            :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
            }"
            @click:row="classificacaoClick"
            class="table-cursor elevation-1 row-pointer"
          >
            <template v-slot:[`item.linha`]="{ item }">
              {{ `${item.linha.codificacao} - ${item.linha.descricao}` }}
            </template>
            
            <template v-slot:[`item.tipoLinha`]="{ item }">
              {{ item.tipoLinha.nome }}
            </template>
            
            <template v-slot:[`item.dataValidade`]="{ item }">
              {{ item.dataValidade === null ? '-' : item.dataValidade }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <EditarOperadoraFinanceira :classificacao="classificacaoSelecionada" @closeModal="closeModal"/>

    </v-container>
  </v-container>
</template>

<script>
import EditarOperadoraFinanceira from '@/components/EditarOperadoraFinanceira.vue'

import apiService from "../services/api-service/index";
import _ from 'lodash';

export default {
  name: 'OperadorasFinanceiras',
  title: 'Operadoras e Financeiras',

  components: {
    EditarOperadoraFinanceira
  },

  data: () => ({
    headers: [
      { text: 'linha', value: 'linha' },
      { text: 'tipoLinha', value: 'tipoLinha' },
      { text: 'dataVigencia', value: 'dataVigencia' },
      { text: 'dataValidade', value: 'dataValidade' },
    ],
    linhasClassificadas: [],
    search: '',
    classificacaoSelecionada: null
  }),

  created: async function() {
    try {
      const apiRes = await apiService.getListaClassificaoLinha();
      this.linhasClassificadas = apiRes.classificacaoLinha
      console.log(apiRes)
      console.info('Classificacao linhas carregado')
    } catch (error) {
      console.error('Não foi possivel carregar as Classificações de linhas')
      this.showToast('Não foi possivel carregar as Classificações de linhas.', 'Erro', 'error')
    }
  },

  methods: {
    classificacaoClick: function (item /*, itemSlotData*/) {
      // console.log('Clique', item)
      this.classificacaoSelecionada = item;
    },
    closeModal: function () {
      console.log('Close modal')
    },
    debounceSearch: _.debounce(function (value) {
      this.search = value;
      this.showToast('Realizando busca...', 'Info', 'info')
    }, 2000),
    customFilter (value, search, item) {
      return (value != null && search != null && value == search)
        // || (item.pernas.map(lp => lp.linIdUso.toFixed()).indexOf(search) !== -1)
        // || (item.pernas.map(lp => lp.r95Id.toFixed()).indexOf(search) !== -1)
        // || (item.pernas.map(lp => lp.linUso.toLowerCase()).indexOf(search.toLowerCase()) !== -1)
        || (item.linha.descricao.toLowerCase().includes(search.toLowerCase()))
        || (item.linha.codificacao.toLowerCase().includes(search.toLowerCase()))
        || (item.linId == search)
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
  },
}
</script>

<style lang="css" scoped>
.row-pointer >>> tbody tr :hover {
  cursor: pointer;
}
</style>
