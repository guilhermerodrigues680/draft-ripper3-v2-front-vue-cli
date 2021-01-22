<template>
  <div>
    <v-app-bar
      app
      color="primary"
      dark
      elevate-on-scroll
      >

      <v-toolbar-title>Seleção BRT - Debug</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="ma-0 pa-0 fill-height">
        <v-row class="text-center">
          <v-col cols="12">
            <v-img
              :src="require('../assets/icons-actions-edit-select.svg')"
              contain
              height="100"
            />
          </v-col>
          <v-col class="mb-4">
            <h1 class="display-2 font-weight-bold mb-3">Selecione um BRT</h1>
          </v-col>
        </v-row>

        <v-row class="text-center">
          <v-col
            class="mb-4"
            v-for="brt in brts"
            v-bind:key = "brt.id"
            cols="12"
            md="3"
            sm="3"
          >
          <v-hover close-delay="65" v-slot="{ hover }">
            <v-card
              class="mx-auto cursor-pointer"
              v-ripple="{ class: `primary--text` }"
              :elevation="hover ? 1 : 0"
              :color="hover ? 'primary lighten-3' : ''"
              max-width="300"
              outlined
              @click="selecionaBRT(brt)"
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline my-1">{{ brt.nome }}</v-list-item-title>
                  <v-list-item-subtitle>{{ brt.descricao }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer absolute color="primary" dark app>
      <v-col
        class="text-center"
        cols="12"
      >
        <strong>Ripper</strong> - {{ new Date().getFullYear() }}
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: 'SelecionaBRT',
  title: 'Seleção BRT',

  data: () => ({
    brts: [
      { id: 1, nome: "BRT A", descricao: "Brt operando A" },
      { id: 2, nome: "BRT B", descricao: "Brt operando B" },
      { id: 3, nome: "BRT C", descricao: "Brt operando C" },
      { id: 4, nome: "BRT D", descricao: "Brt operando D" },
      { id: 5, nome: "BRT E", descricao: "Brt operando E" },
    ]
  }),

  methods: {
    selecionaBRT: function (brt) {
      console.log('Selecionado BRT', brt.id, brt.nome, brt.descricao, brt)
      this.$router.push(`/brt/${brt.id}`)
    }
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>