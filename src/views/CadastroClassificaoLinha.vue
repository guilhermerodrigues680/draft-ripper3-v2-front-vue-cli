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
        <v-col cols="12">
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
      </v-row>
      <!-- FIM - Criar tipo linha -->

      <!-- Classificar Linha -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5">Classificar linha</h2>

          <v-form v-model="formCadastroClassificaoLinha">
            <v-container class="ma-0 pa-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="cadastroClassificaoLinha.linha"
                    label="Linha"
                    item-text="text"
                    item-value="linId"
                    :items="todasLinhas"
                    :menu-props="{ auto: true }"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="6">
                  <v-select
                    v-model="cadastroClassificaoLinha.tipoLinha"
                    :label="tiposLinha.length === 0 ? 'Tipo para essa linha. OBS: Cadastre um tipo primeiro' : 'Tipo para essa linha'"
                    :items="tiposLinha"
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
                  <v-select
                    v-model="cadastroClassificaoLinha.alimentadoras"
                    :items="todasLinhas"
                    :menu-props="{ auto: true }"
                    label="Linhas Alimentadoras"
                    item-text="text"
                    item-value="linId"
                    multiple
                    chips
                    hide-details
                    prepend-icon="mdi-bus-multiple"
                  ></v-select>
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
    const linhas = await apiService.getTodasLinhas();
    const linDesc = linhas.map(lin => ({ linId: lin.linId, text: `${lin.codificacao} - ${lin.descricao}` }))
    this.todasLinhas = linDesc
  },

  methods: {
    cadastrarTipoLinha() {
      this.tiposLinha.push(this.cadastroTipoLinha.nome);
      this.cadastroTipoLinha.nome = null
      this.cadastroTipoLinha.descricao = null
    },
    changeCheckDtValIndefinida(value) {
      value && (this.cadastroClassificaoLinha.dataValidade = null)
    },
    cadastrarClassificacao: async function() {
      const rawJSON = JSON.stringify(this.cadastroClassificaoLinha, '', 2)
      const blob = new Blob([rawJSON], {type : 'application/json'})
      const url  = URL.createObjectURL(blob);
      window.open(url);
    }
  },
}
</script>