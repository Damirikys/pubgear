import * as modes from './modes'
import * as types from './types'

export default (config) => {
  const configs = []

  Object.values(modes).forEach(mode =>
    Object.values(types).forEach(type =>
      configs.push({ ...config, mode, type })
    )
  )

  return configs
}