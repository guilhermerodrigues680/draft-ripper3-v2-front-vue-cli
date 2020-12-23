import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import pt from 'vuetify/es5/locale/pt'
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  // theme: {
  //   themes: {
  //     light: {
  //       primary: colors.deepOrange.darken4,
  //     },
  //   },
  // },
  lang: {
    locales: { pt },
    current: 'pt',
  }
});
