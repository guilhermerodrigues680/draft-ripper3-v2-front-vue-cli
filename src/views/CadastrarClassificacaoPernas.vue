<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col>
          <h1 class="text-h3 font-weight-light">
            Cadastrar Classificacao de Viagem
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="cadastroRegra.nome"
            label="Nome"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="cadastroRegra.descricao"
            label="Descricao"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="8">
          <v-select
            v-model="tiposLinhasPerna"
            :items="tiposLinhas"
            chips
            label="Tipos de linha para a perna"
            multiple
          ></v-select>
        </v-col>

        <v-col cols="12" md="4">
          <v-btn
            elevation="2"
            block
            large
            color="primary"
            @click="adicionarConjuntoPernas"
          >Adicionar Conjunto de Pernas</v-btn>
        </v-col>
      </v-row>

      <v-row v-if="cadastroRegra.pernas.length > 0">
        <v-col cols="12" md="6">
          <v-select
            v-model="cadastroRegra.pernaOperadora"
            :items="cadastroRegra.pernas"
            label="Perna da operadora que recebe a receita"
            thumb-color="orange"
            thumb-label="always"
          ></v-select>
        </v-col>
      </v-row>

      <v-row v-if="cadastroRegra.pernas.length > 0">
        <v-col cols="12" md="12">
          <p>Pernas que entram no calculo da receita: </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="2" v-for="(perna, idx) in cadastroRegra.pernas" :key="idx">
          <v-checkbox
            v-model="cadastroRegra.pernasComReceita"
            :label="idx === 0 ? 'Perna Origem' : idx === cadastroRegra.pernas.length-1 ? 'Perna Destino' : (idx+1).toString()"
            :value="idx"
            class="ma-0 pa-0"
          ></v-checkbox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <v-card>
            <v-list-item v-for="(perna, idx) in cadastroRegra.pernas" :key="idx">
              <v-list-item-content>
                <v-list-item-title>{{ idx === 0 ? 'Perna Origem' : idx === cadastroRegra.pernas.length-1 ? 'Perna Destino' : (idx+1).toString() }} - {{ perna }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3" v-if="cadastroRegra.pernas.length > 0">
          <v-btn
            elevation="2"
            color="primary"
            large
            block
          >Criar Regra</v-btn>
        </v-col>

        <v-col cols="12" md="3">
          <v-btn
            elevation="2"
            color="primary"
            large
            block
            @click="limparCampos"
          >Limpar Campos</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'CadastrarClassificacaoPernas',

  data: () => ({
    tiposLinhasPerna: [],
    tiposLinhas: ['ALimentadora', 'Estacao'],
    cadastroRegra: {
      nome: '',
      descricao: '',
      pernas: [],
      pernaOperadora: null,
      pernasComReceita: []
    }
  }),

  mounted: async function () {
    // console.log('CadastrarClassificacaoViagem', this);
    // try {
    //   const apiRes = await getTiposLinhas()
    //   this.tiposLinhas = apiRes.tiposLinhas //.map(t => t.id)
    //   console.info('Tipos linhas carregadas')
    // } catch (error) {
    //   console.error('Não foi possivel carregar os Tipos de linhas')
    // }
  },

  methods: {
    adicionarConjuntoPernas() {
      this.cadastroRegra.pernas.push([...this.tiposLinhasPerna])
      this.tiposLinhasPerna.splice(0, this.tiposLinhasPerna.length)
    },
    limparCampos() {
      this.cadastroRegra.nome = ''
      this.cadastroRegra.descricao = ''
      this.tiposLinhasPerna.splice(0, this.tiposLinhasPerna.length)
      this.cadastroRegra.pernaOperadora = null
      this.cadastroRegra.pernasComReceita.splice(0, this.cadastroRegra.pernasComReceita.length)
      this.cadastroRegra.pernas.splice(0, this.cadastroRegra.pernas.length);
    }
  }

}
</script>
