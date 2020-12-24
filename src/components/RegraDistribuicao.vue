<template>
  <v-container class="ma-0 pa-0">
    <v-row v-if="pernas.length > 0">
      <v-col cols="12" md="12">
        <v-select
          v-model="pernaOperadora"
          :items="pernaIdxArr"
          item-text="text"
          item-value="idx"
          label="Perna da operadora que recebe a receita"
          thumb-color="orange"
          thumb-label="always"
        ></v-select>
      </v-col>
    </v-row>

    <v-row v-if="pernas.length > 0">
      <v-col cols="12" md="12">
        <p>Pernas que entram no calculo da receita: </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="2" v-for="(perna, idx) in pernas" :key="idx">
        <v-checkbox
          v-model="pernasComReceita"
          :label="`${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === pernas.length-1 ? '(Destino)' : ''}`"
          :value="idx"
          class="ma-0 pa-0"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
          <v-btn
            @click="adicionarExcecao"
            color="secondary"
            large
            block
          >Adiciona Exceção</v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegraDistribuicao',

  props: {
    pernas: Array,
  },

  data: () => ({
    pernaOperadora: null,
    pernasComReceita: [],
  }),

  computed: {
    pernaIdxArr: function() {
      return this.pernas.map((p, idx, arr) => ({ idx: idx, text: `${idx + 1}ª Perna ${idx === 0 ? '(Origem)' : idx === arr.length - 1 ? '(Destino)' : ''}` }))
    }
  },

  methods: {
    adicionarExcecao() {
      const regraDistribuicao = {
        idxPernaOperadora: null,
        idxsPernaComReceita: [],
        idsLinhasComExcecoes: null,
        erateio: false
      }

      regraDistribuicao.idxPernaOperadora = this.pernaOperadora
      regraDistribuicao.idxsPernaComReceita = [...this.pernasComReceita]

      this.pernaOperadora = null
      this.pernasComReceita = this.pernasComReceita.splice(0, this.pernasComReceita.length)
      this.$emit('adicionarExcecao', regraDistribuicao)
    }
  }
}
</script>
