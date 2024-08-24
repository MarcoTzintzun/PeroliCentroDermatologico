import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import es from 'vuetify/lib/locale/es'
import globalConfig from './globalConfig'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: globalConfig.colors.color1,
        secondary: globalConfig.colors.color2,
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  },
  lang: {
    locales: { es },
    current: 'es'
  }
})
