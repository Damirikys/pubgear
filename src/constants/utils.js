export const noavatarUrl = 'https://www.sololearn.com/Images/NoAvatar.jpg'

export const backgroundImg = 'http://image.ibb.co/c7VMJm/erangel.png'

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