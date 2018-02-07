export const typeOf = type => {
  switch(String(type)) {
    case '1': return 'SOLO'
    case '2': return 'DUO'
    case '4': return 'SQUAD'
  }
}

export const modeOf = mode => {
  switch(mode) {
    case 'tpp': return 'TPP'
    case 'fpp': return 'FPP'
  }
}