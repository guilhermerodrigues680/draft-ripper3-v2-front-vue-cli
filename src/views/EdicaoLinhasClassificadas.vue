<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1 class="text-h3 font-weight-light">
          Edição de linhas classificadas
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-text-field
          @input="debounceSearch"
          label="Pesquisar"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="linhasClassificadas"
          :items-per-page="5"
          :search="search"
          :custom-filter="customFilter"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
          class="elevation-1"
        >
          <template v-slot:[`item.linha`]="{ item }">
            {{ `${item.linha.codificacao} - ${item.linha.descricao}` }}
          </template>
          
          <template v-slot:[`item.tipoLinha`]="{ item }">
            {{ item.tipoLinha.nome }}
          </template>
          
          <template v-slot:[`item.dataValidade`]="{ item }">
            {{ item.dataValidade === null ? '-' : item.dataValidade }}
          </template>

          <template v-slot:[`item.controls`]="props">
            <v-btn dark small color="orange" class="ma-1" @click="editClassificacaoLinha(props.item)">
              <v-icon dark>mdi-square-edit-outline</v-icon>
            </v-btn>
            <v-btn dark small color="red" class="ma-1" @click="deleteClassificacaoLinha(props.item)">
              <v-icon dark>mdi-delete-outline</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import * as apiService from "../services/api-service";
import _ from 'lodash';

export default {
  name: "EdicaoLinhasClassificadas",
  title: "EdicaoLinhasClassificadas",

  data: () => ({
    headers: [
      { text: 'linha', value: 'linha' },
      { text: 'tipoLinha', value: 'tipoLinha' },
      { text: 'É Terminal', value: 'eterminal' },
      { text: 'dataVigencia', value: 'dataVigencia' },
      { text: 'dataValidade', value: 'dataValidade' },
      { text: "", value: "controls", sortable: false }
    ],
    linhasClassificadas: [],
    search: '',
  }),

  created: async function() {
    try {
      const apiRes = await apiService.classificacaoLinha.getListaClassificaoLinha(this.$route.params.idBRT);
      this.linhasClassificadas = apiRes.classificacaoLinha
      console.log(apiRes)
      console.info('Classificacao linhas carregado')
    } catch (error) {
      console.error('Não foi possivel carregar as Classificações de linhas')
      this.showToast('Não foi possivel carregar as Classificações de linhas.', 'Erro', 'error')
    }
  },

  methods: {
    editClassificacaoLinha: function (/*item*/) {
      this.showToast('Edição não implementada ainda', 'Info', 'info')
    },
    deleteClassificacaoLinha: async function (item) {
      try {
        await apiService.classificacaoLinha.deleteListaClassificaoLinha(this.$route.params.idBRT, item.id)
        this.showToast('Classificação apagada!')
      } catch (error) {
        console.error(error)
        if (error.response && error.response.data && error.response.data.message) {
          this.showToast(error.response.data.message, 'Erro', 'error', true)
          return
        }
        
        this.showToast('Classificação não apagada', 'Erro', 'error')
      }
    },
    debounceSearch: _.debounce(function (value) {
      this.search = value;
      this.showToast('Realizando busca...', 'Info', 'info')
    }, 2000),
    customFilter (value, search, item) {
      return (value != null && search != null && value == search)
        // || (item.pernas.map(lp => lp.linIdUso.toFixed()).indexOf(search) !== -1)
        // || (item.pernas.map(lp => lp.r95Id.toFixed()).indexOf(search) !== -1)
        // || (item.pernas.map(lp => lp.linUso.toLowerCase()).indexOf(search.toLowerCase()) !== -1)
        || (item.linha.descricao.toLowerCase().includes(search.toLowerCase()))
        || (item.linha.codificacao.toLowerCase().includes(search.toLowerCase()))
        || (item.linId == search)
    },
    showToast: function (message, title = 'Sucesso', icon = 'success', showConfirmButton=false) {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: showConfirmButton,
        timer: showConfirmButton ? null : 3000,
        icon: icon,
        title: title,
        text: message,
      });
    }
  },

}
</script>