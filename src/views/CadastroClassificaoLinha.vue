<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">

      <v-row>
        <v-col>
          <h1 class="text-h3 font-weight-light">
            Cadastro de Tipos e Classificações de Linha
          </h1>
        </v-col>
      </v-row>

      <!-- Criar tipo linha -->
      <v-row>
        <v-col cols="12" class="my-0 py-0">
          <h2 class="text-h5">Cadastro de tipo de linha</h2>

          <v-form v-model="formCadastroTipoLinha">
            <v-container class="ma-0 pa-0">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="cadastroTipoLinha.nome"
                    label="Nome"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="cadastroTipoLinha.descricao"
                    label="Descrição"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-btn
                  @click="cadastrarTipoLinha"
                  color="primary"
                  large
                  >Cadastrar Tipo de Linha</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
        
        <v-col cols="12" class="mt-0 pt-0">
          <v-tooltip
            top
            v-for="tipo in tiposLinha"
            v-bind:key="tipo.id"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                class="mx-3 mb-1"
                color="orange lighten-1"
                text-color="black"
                label
                link
                v-bind="attrs"
                v-on="on"
                close
                close-icon="mdi-delete"
                @click:close="clickDeletarTipo(tipo)"
              >
                {{ tipo.nome }}
              </v-chip>
            </template>
            <span>{{ tipo.descricao }}</span>
          </v-tooltip>
        </v-col>

      </v-row>
      <!-- FIM - Criar tipo linha -->

      <v-divider></v-divider>

      <!-- Classificar Linha -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5">Classificar linha</h2>

          <v-form v-model="formCadastroClassificaoLinha">
            <v-container class="ma-0 pa-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-autocomplete
                    v-model="cadastroClassificaoLinha.linha"
                    label="Linha"
                    item-text="text"
                    item-value="linId"
                    clearable
                    :items="todasLinhas"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="cadastroClassificaoLinha.tipoLinha"
                    :label="tiposLinha.length === 0 ? 'Tipo para essa linha. OBS: Cadastre um tipo primeiro' : 'Tipo para essa linha'"
                    :items="tiposLinha"
                    item-text="nome"
                    item-value="id"
                    :menu-props="{ auto: true }"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="cadastroClassificaoLinha.nomeClassificacao"
                    label="Nome da classificação"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="cadastroClassificaoLinha.dataVigencia"
                    label="Data de inicio de vigência"
                    type="date"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="3" class="pt-0 pb-0">
                  <v-checkbox
                    v-model="checkDtValIdenfinida"
                    @change="changeCheckDtValIndefinida"
                    label="Data de validade indefinida"
                  ></v-checkbox>
                </v-col>

                <v-col cols="12" md="3" class="pt-0 pb-0" v-if="!checkDtValIdenfinida">
                  <v-text-field
                    v-model="cadastroClassificaoLinha.dataValidade"
                    label="Data de validade"
                    type="date"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="3" class="pt-0 pb-0">
                  <v-checkbox
                    v-model="cadastroClassificaoLinha.eTerminal"
                    :label="`É um terminal? ${cadastroClassificaoLinha.eTerminal ? 'Sim' : 'Não'}`"
                  ></v-checkbox>
                </v-col>

                <v-col cols="12" md="9" v-if="cadastroClassificaoLinha.eTerminal" class="pt-0 pb-0">
                  <v-autocomplete
                    v-model="cadastroClassificaoLinha.alimentadoras"
                    :items="todasLinhas"
                    label="Linhas Alimentadoras"
                    item-text="text"
                    item-value="linId"
                    multiple
                    chips
                    deletable-chips
                    hide-details
                    prepend-icon="mdi-bus-multiple"
                  ></v-autocomplete>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" md="4">
                  <v-btn
                    @click="cadastrarClassificacao"
                    color="primary"
                    large
                    block
                  >Cadastrar Classificação</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
      <!-- FIM Classificar-->
    </v-container>
  </v-container>
</template>

<script>
import apiService from "../services/api-service/index";

export default {
  name: 'CadastroClassificaoLinha',
  title: 'Cadastro Classificação Linha',

  data: () => ({
    formCadastroTipoLinha: null,
    cadastroTipoLinha: {
      nome: null,
      descricao: null
    },
    formCadastroClassificaoLinha: null,
    todasLinhas: [],
    tiposLinha: [],
    checkDtValIdenfinida: true,
    cadastroClassificaoLinha: {
      linha: null,
      tipoLinha: null,
      nomeClassificacao: null,
      dataVigencia: null,
      dataValidade: null,
      eTerminal: false,
      alimentadoras: []
    }
  }),

  created: async function() {
    try {
      const apiRes = await apiService.getTiposLinha();
      this.tiposLinha = apiRes.tiposDeLinha.map(t => ({ id: t.id, nome: t.nome, descricao: t.descricao }))
      console.log(apiRes)
      console.info('Tipos linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os Tipos de linhas')
      this.showToast('Não foi possivel carregar os Tipos de linhas.', 'Erro', 'error')
    }

    try {
      const apiRes = await apiService.getTodasLinhas();
      this.todasLinhas = apiRes.linhas.map(lin => ({ linId: lin.linId, text: `${lin.codificacao} - ${lin.descricao}` }))
      console.log(apiRes)
      console.info('linhas carregadas')
    } catch (error) {
      console.error('Não foi possivel carregar os linhas')
      this.showToast('Não foi possivel carregar as linhas.', 'Erro', 'error')
    }
  },

  methods: {
    cadastrarTipoLinha: async function () {
      const contratoTipoLinha = {
        nome: '',
        descricao: ''
      }

      contratoTipoLinha.nome = this.cadastroTipoLinha.nome
      contratoTipoLinha.descricao = this.cadastroTipoLinha.descricao

      // Cadastrar tipo de linha
      try {
        const apiRes = await apiService.postCadastrarTipoLinha(contratoTipoLinha);
        console.log(apiRes)
        this.showToast('Tipo de linha cadastrado!')
        this.cadastroTipoLinha.nome = null
        this.cadastroTipoLinha.descricao = null
      } catch (error) {
        console.error('Ocorreu um erro ao cadastrar o tipo da linha')
      }

      // Recuperar novos tipos de linha
      try {
        const apiRes = await apiService.getTiposLinha();
        this.tiposLinha = apiRes.tiposDeLinha.map(t => ({ id: t.id, nome: t.nome, descricao: t.descricao }))
        console.log(apiRes)
        console.info('Tipos linhas carregadas')
      } catch (error) {
        console.error('Não foi possivel carregar os Tipos de linhas')
      }

    },
    changeCheckDtValIndefinida(value) {
      value && (this.cadastroClassificaoLinha.dataValidade = null)
    },
    cadastrarClassificacao: async function() {
      const contratoClassificacaoLinha = {
        linId: null,
        tipoLinhaId: null,
        nome: '',
        dataVigencia: '',
        dataValidade: null,
        alimentadoras: [],
        eterminal: false
      }

      contratoClassificacaoLinha.linId = this.cadastroClassificaoLinha.linha
      contratoClassificacaoLinha.tipoLinhaId = this.cadastroClassificaoLinha.tipoLinha
      contratoClassificacaoLinha.nome = this.cadastroClassificaoLinha.nomeClassificacao
      contratoClassificacaoLinha.dataVigencia = this.cadastroClassificaoLinha.dataVigencia
      contratoClassificacaoLinha.dataValidade = this.cadastroClassificaoLinha.dataValidade
      contratoClassificacaoLinha.alimentadoras = this.cadastroClassificaoLinha.alimentadoras
      contratoClassificacaoLinha.eterminal = this.cadastroClassificaoLinha.eTerminal

      // Cadastrar classificaco de linha
      try {
        const apiRes = await apiService.postCadastrarClassificacoLinha(contratoClassificacaoLinha);
        console.log(apiRes)
        this.showToast('Classificação de linha cadastrada!')
      } catch (error) {
        console.error('Ocorreu um erro ao cadastrar a classificacao da linha')
      }

    },
    clickDeletarTipo: async function(tipo) {
      console.log(tipo)
      try {
        await apiService.deleteTipoLinha(tipo.id);
        this.showToast('Tipo de linha deletado!')
      } catch(error) {
        console.error(error)
        this.showToast('Não foi possivel apagar o tipo de linha.', 'Erro', 'error')
        return
      }

      // Recuperar novos tipos de linha
      try {
        const apiRes = await apiService.getTiposLinha();
        this.tiposLinha = apiRes.tiposDeLinha.map(t => ({ id: t.id, nome: t.nome, descricao: t.descricao }))
        console.log(apiRes)
        console.info('Tipos linhas carregadas')
      } catch (error) {
        console.error('Não foi possivel carregar os Tipos de linhas')
      }
    },
    showToast: function (message, title = 'Sucesso', icon = 'success') {
      this.$swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        icon: icon,
        title: title,
        text: message,
      });
    }
  },
}
</script>