<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">
      <h1 class="text-center text-h3 font-weight-light">DEBUG - Viagens classificadas</h1>

      <v-row>
        <v-col cols="12">
          <v-select
            v-model="selecaoDiaProcessado"
            :items="datasProcessadas"
            label="Datas Processadas"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-btn
            elevation="2"
            block
            small
            color="primary"
            @click="buscarDataProcessamento"
          >Buscar processamento</v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn
            elevation="2"
            block
            small
            color="info"
            @click="atualizarDatasProcessadas"
          >Atualizar dias</v-btn>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col cols="6">
          <v-text-field
            @input="debounceSearch"
            label="Pesquisar"
          ></v-text-field>
        </v-col>
      </v-row>

      <ViagensClassificadasTable
        :viagensClassificadas="viagensClassificadas"
        :search="search"
        @usuidClick="usuidClick"
      />

      <v-divider class="my-5"></v-divider>

      <RastreioUsuario :pernas="pernasRastreio"/>

      <v-divider class="my-5"></v-divider>

      <v-row>
        <v-col cols="12">
          <h2>Adiantamento de receita por financeira</h2>
        </v-col>
        <v-col cols="12">
          <v-data-table
            dense
            :headers="financeirasAdiantamentosHeaders"
            :items="financeirasAdiantamentos"
            :items-per-page="-1"
            :sort-by="'financeira'"
            :sort-desc="false"
            item-key="financeira"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>


    </v-container>
  </v-container>
</template>

<script>
import ViagensClassificadasTable from '@/components/ViagensClassificadasTable.vue'
import RastreioUsuario from '@/components/RastreioUsuario.vue'

import * as apiService from "../services/api-service";
import _ from 'lodash';

export default {
  name: 'ViagensClassificadas',

  components: {
    ViagensClassificadasTable,
    RastreioUsuario
  },

  data: () => ({
    viagensClassificadas: [],
    search: '',
    pernasRastreio: [],
    datasProcessadas: [],
    selecaoDiaProcessado: '',
    financeirasAdiantamentos: [],
    financeirasAdiantamentosHeaders: [
      { text: 'Financeira', value: 'financeira', align: 'center' },
      { text: 'Adiantamento Total (R$)', value: 'adiantamentoTotal', align: 'center' },
    ]
  }),

  mounted: async function () {

    try {
      const apiRes = await apiService.processamento.getDiasProcessados()
      this.datasProcessadas = apiRes.sort()
      this.showToast('Datas processadas carregadas!', 'Info', 'info')
      console.info('Arquivos processados')
    } catch (error) {
      this.showToast('Erro ao carregar datas processadas', 'Erro', 'error')
      console.error('Não foi possivel carregar os arquivos processados')
    }

    // try {
    //   const apiRes = await getViagensClassificadas(new Date(2020, 10, 23))
    //   this.viagensClassificadas = apiRes.viagensClassificadasEReceitas //.slice(0, 10)
    //   console.info('Viagens carregadas')
    // } catch (error) {
    //   console.error('Não foi possivel carregar as viagens classificadas')
    // }
  },

  methods: {
    debounceSearch: _.debounce(function (value) {
      this.search = value;
      this.showToast('Realizando busca...', 'Info', 'info')
    }, 2000),
    usuidClick (pernas) {
      this.pernasRastreio = pernas;
      this.showToast('Rastreio usuario carregado!', 'Info', 'info')
    },
    buscarDataProcessamento: async function () {
      try {
        const apiRes = await apiService.processamento.getDiaProcessado(new Date(this.selecaoDiaProcessado))
        const brrId = +this.$route.params.idBRT
        const resultadoProcessamentoDiaBRT = apiRes.resultadoProcessamentoDia.resultadoProcessamentoDiaBRTList.find(processDia => processDia.brrId === brrId)
        this.viagensClassificadas = resultadoProcessamentoDiaBRT.viagensClassificadasEReceitas
        this.financeirasAdiantamentos = resultadoProcessamentoDiaBRT.financeirasAdiantamentos
        this.showToast(`Viagens classificadas do BRT ${this.$route.params.idBRT} carregadas!`)
        console.info('Viagens carregadas')
      } catch (error) {
        this.showToast('Ocorreu um erro. BRT ' + this.$route.params.idBRT, 'Erro', 'error')
        console.error('Não foi possivel carregar as viagens classificadas do BRT ' + this.$route.params.idBRT)
      }
    },
    atualizarDatasProcessadas: async function () {
      try {
        const apiRes = await apiService.processamento.getDiasProcessados()
        this.datasProcessadas = apiRes.sort()
        console.info('Arquivos processados')
        this.showToast('Datas processadas carregadas!', 'Info', 'info')
      } catch (error) {
        this.showToast('Ocorreu um erro.', 'Erro', 'error')
        console.error('Não foi possivel carregar os arquivos processados')
      }
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
