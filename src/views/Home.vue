<template>
  <v-container>
    <h1 class="text-center">DEBUG - Viagens classificadas</h1>

    <v-select
      v-model="selecaoDiaProcessado"
      :items="datasProcessadas"
      label="Datas Processadas"
    ></v-select>

    <v-btn
      @click="buscarDataProcessamento"
    >Buscar processamento</v-btn>
    <v-btn
      @click="atualizarDatasProcessadas"
    >Atualizar datas processadas</v-btn>

    <v-col>
      <v-text-field
        @input="debounceSearch"
        label="Pesquisar"
        class="mx-4"
      ></v-text-field>
    </v-col>

    <ViagensClassificadasTable
      :viagensClassificadas="viagensClassificadas"
      :search="search"
      @usuidClick="usuidClick"
    />

    <RastreioUsuario :pernas="pernasRastreio"/>

  </v-container>
</template>

<script>
import ViagensClassificadasTable from '@/components/ViagensClassificadasTable.vue'
import RastreioUsuario from '@/components/RastreioUsuario.vue'

import { /*getViagensClassificadas*/getDiaProcessado, getDiasProcessados } from "../services/api-services"
import _ from 'lodash';

export default {
  name: 'Home',

  components: {
    ViagensClassificadasTable,
    RastreioUsuario
  },

  data: () => ({
    viagensClassificadas: [],
    search: '',
    pernasRastreio: [],
    datasProcessadas: [],
    selecaoDiaProcessado: ''
  }),

  mounted: async function () {

    try {
      const apiRes = await getDiasProcessados()
      this.datasProcessadas = apiRes.sort()
      console.info('Arquivos processados')
    } catch (error) {
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
    }, 2000),
    usuidClick (pernas) {
      this.pernasRastreio = pernas;
    },
    buscarDataProcessamento: async function () {
      try {
        const apiRes = await getDiaProcessado(new Date(this.selecaoDiaProcessado))
        this.viagensClassificadas = apiRes.viagensClassificadasEReceitas
        console.info('Viagens carregadas')
      } catch (error) {
        console.error('Não foi possivel carregar as viagens classificadas')
      }
    },
    atualizarDatasProcessadas: async function () {
      try {
        const apiRes = await getDiasProcessados()
        this.datasProcessadas = apiRes.sort()
        console.info('Arquivos processados')
      } catch (error) {
        console.error('Não foi possivel carregar os arquivos processados')
      }
    }
  }

}
</script>
