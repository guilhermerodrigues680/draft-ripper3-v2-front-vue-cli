<template>
  <v-row v-if="pernas.length > 0">
    <v-col>
      <h1 class="text-center">Rastreio do usuário selecionado</h1>

      <v-data-table
        dense
        :headers="headers"
        :items="pernas"
        hide-default-footer
        class="elevation-1"
      ></v-data-table>

    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'RastreioUsuario',

  props: {
    pernas: Array
  },

  data: () => ({
    headers: [
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
  })

}
</script>
