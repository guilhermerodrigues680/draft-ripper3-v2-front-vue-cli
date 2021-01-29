<template>
  <v-row justify="center" v-if="classificacao !== null">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    > 
      <v-card>
        <v-toolbar dark color="primary lighten-2">
          <v-btn icon dark @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            Configurar Operadora e Financeira: {{ `${classificacao.linha.codificacao} - ${classificacao.linha.descricao}` }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="closeModal">
              OK
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      

        <v-list three-line subheader>
          <v-subheader>Detalhes Operadoras e Financeiras:  {{ `${classificacao.linha.codificacao} - ${classificacao.linha.descricao}` }}</v-subheader>

          <v-list-item>
            <v-data-table
              :headers="headers"
              :items="ofiOperadorasFinanceiras"
              :items-per-page="-1"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:[`item.operadora`]="{ item }">
                {{ item.operadora !== null ? item.operadora : 'Qualquer Operadora'  }}
              </template>
              
              <template v-slot:[`item.financeira`]="{ item }">
                {{ item.financeira !== null ? item.financeira : 'Própria Operadora' }}
              </template>
              
              <template v-slot:[`item.controls`]="props">
                <v-btn dark small color="red" @click="onDeleteButtonClick(props.item)">
                  <v-icon dark>mdi-delete-outline</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-list-item>
          
          <v-list-item>
            <v-container class="ma-0 pa-0">
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="cadastro.operadora"
                    label="Operadora"
                    clearable
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="3">
                  <v-text-field
                    v-model="cadastro.financeira"
                    label="Financeira"
                    clearable
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-btn
                  @click="onCadastroButtonClick"
                  color="primary"
                  >Adicionar</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import * as apiService from "../services/api-service";

export default {
  name: 'EditarOperadoraFinanceira',

  props: {
    classificacao: Object
  },

  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    cadastro: {
      operadora: '',
      financeira: ''
    },
    headers: [
          // { text: 'ofiId', align: 'start', sortable: true, value: 'ofiId' },
          // { text: 'cllId', align: 'start', sortable: true, value: 'cllId' },
          { text: 'operadora', value: 'operadora' },
          { text: 'financeira', value: 'financeira' },
          { text: "", value: "controls", sortable: false }
        ],
        ofiOperadorasFinanceiras: []
  }),

  watch: {
    classificacao: async function (/*newVal, oldVal*/) {
      //console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      console.debug('Prop classificacao atualizada, valor: ', this.classificacao && this.classificacao.linha && this.classificacao.linha.descricao)
      if (this.classificacao === null) {
        return
      }

      this.dialog = true
      
      try {
        const apiRes = await apiService.operadoraFinanceira.getOperadoraFinanceiraCllId(this.$route.params.idBRT, this.classificacao.id)
        console.log(apiRes, JSON.parse(JSON.stringify(apiRes.operadorasFinanceiras)))
        this.ofiOperadorasFinanceiras = apiRes.operadorasFinanceiras
        console.info('ok')
      } catch (error) {
        console.error('erro ao carregar')
      }
    }
  },

  methods: {
    closeModal: function () {
      this.dialog = false
      this.$emit('closeModal')
    },
    onDeleteButtonClick: async function (item) {
      console.log(item);

      try {
        await apiService.operadoraFinanceira.deleteOperadoraFinanceira(this.$route.params.idBRT, item.ofiId);
        console.info('Sucesso no delete')
      } catch (error) {
        console.error('Erro no cadastro')
      }
      
      try {
        const apiRes = await apiService.operadoraFinanceira.operadoraFinanceira.getOperadoraFinanceiraCllId(this.$route.params.idBRT, this.classificacao.id)
        console.log(apiRes, JSON.parse(JSON.stringify(apiRes.operadorasFinanceiras)))
        this.ofiOperadorasFinanceiras = apiRes.operadorasFinanceiras
        console.info('ok')
      } catch (error) {
        console.error('erro ao carregar')
      }
    },
    onCadastroButtonClick: async function () {
      //Math.round((Math.random() + Number.EPSILON) * 100),
      const newObj = {
        cllId: this.classificacao.id,
        operadora: this.cadastro.operadora === null || this.cadastro.operadora.trim() === '' ? null : +this.cadastro.operadora,
        financeira: this.cadastro.financeira === null || this.cadastro.financeira.trim() === '' ? null : +this.cadastro.financeira
      }

      try {
        await apiService.operadoraFinanceira.postOperadoraFinanceira(this.$route.params.idBRT, newObj);
        console.info('Sucesso no cadastro')
      } catch (error) {
        console.error('Erro no cadastro')
      }

      try {
        const apiRes = await apiService.operadoraFinanceira.getOperadoraFinanceiraCllId(this.$route.params.idBRT, this.classificacao.id)
        console.log(apiRes, JSON.parse(JSON.stringify(apiRes.operadorasFinanceiras)))
        this.ofiOperadorasFinanceiras = apiRes.operadorasFinanceiras
        console.info('ok')
      } catch (error) {
        console.error('erro ao carregar')
      }
    }
  }

}
</script>
