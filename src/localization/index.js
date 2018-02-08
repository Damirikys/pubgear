import ru from './translations/ru'
import en from './translations/en'

const localization = {
  locale: en,
  init: lng => {
    if (lng.startsWith('ru')) {
      localization.locale = ru
      require('moment/locale/ru')
    } else {
      localization.locale = en
      require('moment/locale/en-gb')
    }
  }
}

export default localization