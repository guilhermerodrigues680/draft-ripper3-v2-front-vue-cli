<template>
  <v-row>
    <v-col xs="12">

      <v-data-table
        :headers="headers"
        :items="viagensClassificadas"
        :items-per-page="5"
        :search="search"
        :custom-filter="filterOnlyEquals"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus'
        }"
        @click:row="rowClick"
        class="table-cursor elevation-1"
      >
        <template v-slot:[`item.operadoraId`]="{ item }">
          {{ Object.keys(item.receitaOperadora).join(",") }}
        </template>
        <template v-slot:[`item.receitaOperadora`]="{ item }">
          {{ item.receitaOperadora }}
        </template>
      </v-data-table>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ViagensClassificadasTable',

  props: {
    viagensClassificadas: Array,
    search: String
  },

  data: () => ({
    headers: [
      { text: 'Usuário', value: 'usuId' },
      { text: 'Classificação da Viagem', value: 'viagemClassificacaoDescricao' },
      { text: 'Operadora(s)', value: 'operadoraId' },
      { text: 'Receita Operadora(s)', value: 'receitaOperadora' },
    ]
  }),

  methods: {
    filterOnlyEquals (value, search, item) {
      return (value != null && search != null && value == search)
        || (item.pernas.map(lp => lp.linIdUso.toFixed()).indexOf(search) !== -1)
        || (item.pernas.map(lp => lp.r95Id.toFixed()).indexOf(search) !== -1)
        || (item.pernas.map(lp => lp.linUso.toLowerCase()).indexOf(search.toLowerCase()) !== -1)
        || (item.viagemClassificacaoDescricao.toLowerCase().includes(search.toLowerCase()))
    },
    rowClick (item /*, itemSlotData*/) {
      this.$emit('usuidClick', item.pernas)
    }
  }

}
</script>

<style>
.table-cursor tbody tr:hover {
  cursor: pointer;
}
</style>
