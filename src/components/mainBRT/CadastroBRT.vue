<template>
  <div class="text-center fill-height">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          class="fill-height"
          v-bind="attrs"
          v-on="on"
        >
          <v-hover close-delay="65" v-slot="{ hover }">
            <v-card
              class="mx-auto cursor-pointer"
              v-ripple="{ class: `primary--text` }"
              :elevation="hover ? 1 : 0"
              :color="hover ? 'primary lighten-3' : ''"
              max-width="300"
              outlined
              height="100%"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline my-1">+</v-list-item-title>
                  <v-list-item-subtitle>Criar um novo BRT</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-hover>
        </div>
      </template>
        <v-card>
          <v-card-title class="grey lighten-2">
            <span class="headline">Criar um BRT</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="cadastro.nome"
                    label="Nome *"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="cadastro.descricao"
                    label="Descrição *"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                    v-model="cadastro.orgId"
                    :items="[1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]"
                    label="Orgão gestor *"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small class="red--text text--lighten-1">*indica campos obrigatórios</small>
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
              @click="criaBRT()"
            >
              Criar BRT
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as apiService from "../../services/api-service";

export default {
  name: 'CadastroBRT',
  
  data: () => ({
    dialog: false,
    cadastro: {
      nome: '',
      descricao: '',
      orgId: null
    }
  }),

  methods: {
    criaBRT: async function () {
      this.dialog = false

      const brtRipperReqBody = {
        nome: this.cadastro.nome,
        descricao: this.cadastro.descricao,
        orgId: this.cadastro.orgId
      }

      console.log('Criar BRT', brtRipperReqBody)

      try {
        const apiRes = await apiService.brtRipper.postCadastrarBRTRipper(brtRipperReqBody)
        console.info('BRT criado!', apiRes)
        this.$emit('sucessoAoCriarBRT')
        this.resetForm()
      } catch (error) {
        console.error('Ocorreu um erro ao tentar cadastrar o BRT')
        this.$emit('erroAoCriarBRT')
      }
    },
    resetForm: function () {
      this.cadastro.nome = ''
      this.cadastro.descricao = ''
      this.cadastro.orgId = null
    },
  }

}
</script>