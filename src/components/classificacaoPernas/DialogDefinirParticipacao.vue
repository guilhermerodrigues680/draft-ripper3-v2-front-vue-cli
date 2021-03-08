<template>
  <div class="text-center fill-height">
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="fill-height"
          v-bind="attrs"
          v-on="on"
        >
          <v-btn
           elevation="2"
           block
           color="orange"
           class="white--text"
          >Definir participação</v-btn>
        </div>
      </template>
        <v-card>
          <v-card-title class="grey lighten-2">
            <span class="headline">Definir participação de financeiras</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="operadoraParticipacaoRateioCustom.financeira"
                    label="Financeira ID"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="operadoraParticipacaoRateioCustom.participacao"
                    label="Participação %"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-btn
                    elevation="2"
                    block
                    large
                    color="purple"
                    @click="addButtonClick"
                  >
                    Adicionar
                  </v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers"
                    :items="listOperadoraParticipacaoRateioCustom"
                    :items-per-page="-1"
                    hide-default-footer
                    class="elevation-1"
                  >
                    <template v-slot:[`item.financeira`]="{ item }">
                      {{ item.financeira }}
                    </template>

                    <template v-slot:[`item.participacao`]="{ item }">
                      {{ item.participacao * 100 }}
                    </template>
                    
                    <template v-slot:[`item.controls`]="props">
                      <v-btn dark small color="red" @click="onDeleteButtonClick(props.item)">
                        <v-icon dark>mdi-delete-outline</v-icon>
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>

            </v-container>
            <small class="red--text text--lighten-1">{{errorMessage}}</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="dialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="salveBtnClick"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'DialogDefinirParticipacao',

  // props: {
    
  // },

  data: () => ({
    errorMessage: '*O somatório deve ser 100%',
    dialog: false,
    operadoraParticipacaoRateioCustom: {
      financeira: null,
      participacao: null
    },
    headers: [
      { text: 'financeira', value: 'financeira' },
      { text: 'participação', value: 'participacao' },
      { text: "", value: "controls", sortable: false }
    ],
    mapaOperadoraParticipacaoRateioCustom: { },
  }),

  computed: {
    listOperadoraParticipacaoRateioCustom: function () {
      return Object.keys(this.mapaOperadoraParticipacaoRateioCustom).map(key => ({
        financeira: +key,
        participacao: +this.mapaOperadoraParticipacaoRateioCustom[key]
      }))
    }
  },

  methods: {
    onDeleteButtonClick: function (item) {
      Vue.delete(this.mapaOperadoraParticipacaoRateioCustom, item.financeira)
    },
    addButtonClick: function () {
      const participacao = Math.round((+this.operadoraParticipacaoRateioCustom.participacao + Number.EPSILON) * 1e6) / 1e8
      Vue.set(this.mapaOperadoraParticipacaoRateioCustom, +this.operadoraParticipacaoRateioCustom.financeira, participacao)
      this.operadoraParticipacaoRateioCustom.financeira = null
      this.operadoraParticipacaoRateioCustom.participacao = null
    },
    salveBtnClick: function () {
      const total = Object.values(this.mapaOperadoraParticipacaoRateioCustom).reduce((pre, cur) => pre + cur, 0)
      
      if (total !== 1) {
        const totalPercent = Math.round(((total * 100) + Number.EPSILON) * 1e6) / 1e6
        this.errorMessage = `*ATENÇÃO: O somatório de participação totalizou ${totalPercent}%, ele deve ser 100%`
        return
      }

      // OK!
      console.debug(this.mapaOperadoraParticipacaoRateioCustom)
      this.$emit('setPercentual', this.mapaOperadoraParticipacaoRateioCustom);
      Vue.set(this, 'mapaOperadoraParticipacaoRateioCustom', {})
      Vue.set(this, 'operadoraParticipacaoRateioCustom', {
        financeira: null,
        participacao: null
      })
      this.dialog = false
    }
  }

}
</script>
