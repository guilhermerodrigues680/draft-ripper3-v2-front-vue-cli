<template>
  <v-container fluid class="fill-height align-start">
    <v-container class="ma-0 pa-0">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 font-weight-light">DEBUG - Configurações processamento</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-btn
            elevation="2"
            color="warning"
            @click="iniciarProcessamento"
          >Iniciar processamento</v-btn>
        </v-col>

        <v-col cols="3">
          <v-btn
            elevation="2"
            color="error"
            @click="pararProcessamento"
          >Parar processamento</v-btn>
        </v-col>
      </v-row>

    </v-container>
  </v-container>
</template>

<script>
import apiService from "../services/api-service/index";

export default {
  name: 'ProcessamentoConfig',

  data: () => ({
    //
  }),


  methods: {
    iniciarProcessamento: async function() {
      try {
        await apiService.getIniciarProcessamento()
        this.showToast('Processamento iniciado!')
      } catch (error) {
        console.log(error)
        this.showToast('Ocorreu um erro.', 'Erro', 'error')
      }
    },
    pararProcessamento: async function() {
      try {
        await apiService.getPararProcessamento()
        this.showToast('Processamento parado!', 'Info', 'info')
      } catch (error) {
        console.log(error)
        this.showToast('Ocorreu um erro.', 'Erro', 'error')
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
  }

}
</script>
