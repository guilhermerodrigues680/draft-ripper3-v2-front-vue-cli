<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row>
      <v-col cols="12">
        <v-timeline dense>
          <v-timeline-item v-for="(perna, idx) in pernaClassificacaoList" :key="idx">
            <v-card class="elevation-2">
              <v-card-title class="body-1">
                {{ idx + 1 }}ª perna <span class="font-weight-medium">{{ idxPernaParaNome(idx, pernaClassificacaoList) }}</span>
                - {{ perna.tiposDeLinha.map(tipo => tipo.nome).join(' ou ') }}
              </v-card-title>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "TimelineUtilizacao",

  props: {
    pernaClassificacaoList: Array
  },

  methods: {
    idxPernaParaNome: function (idx, pernaArr) {
      return idx === 0 ? '(Origem)' : idx === pernaArr.length - 1 ? '(Destino)' : ''
    }
  }

}
</script>