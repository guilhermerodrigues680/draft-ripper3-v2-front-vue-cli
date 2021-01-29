<template>
  <div class="swagger" id="swagger"></div>
</template>

<script>
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

export default {
    name: "Swagger",
    mounted() {
      //const spec = require('../assets/spec.json');
      SwaggerUI({
        // spec: spec,
        url: 'openapi-ripper.yaml',
        dom_id: '#swagger'
      })
    }
}
</script>

<style>
#swagger {
  width: 100%;
}

#swagger pre.microlight code {
  /* all: unset; */
  background-color: unset;
  color: #eee;
  padding: unset;
}

#swagger .swagger-ui .info {
  background-color: unset !important;
}

</style>