<template>
  <v-container>
    <h1 class="text-center">Viagens classificadas</h1>

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

import { getViagensClassificadas } from "../services/api-services"
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
    pernasRastreio: []
  }),

  mounted: async function () {
    try {
      const apiRes = await getViagensClassificadas(new Date(2020, 10, 23))
      this.viagensClassificadas = apiRes.viagensClassificadasEReceitas //.slice(0, 10)
      console.info('Viagens carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar as viagens classificadas')
    }
  },

  methods: {
    debounceSearch: _.debounce(function (value) {
      this.search = value;
    }, 2000),
    usuidClick (pernas) {
      this.pernasRastreio = pernas;
    }
  }

}
</script>
