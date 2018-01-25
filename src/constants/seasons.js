const dateFormat = require('dateformat')
const dateNow = new Date()

export const CURRENT_SEASON = dateFormat(dateNow, 'yyyy-mm')
export const SEASONS = [
  '2018-01',
]