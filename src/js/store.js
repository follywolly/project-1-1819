'use strict'

import Store from './virtual/store.js'

const store = new Store()

store.setState({
  barcode: null,
  book: null,
  list: [{title: 'Book 1', img: 'https://unsplash.it/400/400', publication: {place: 'Amsterdam', publisher: 'Liberon', year: 2008}, authors: ['Nebeker, F', 'Some, N', 'Name, N']}, {title: 'Book 2', img: 'https://unsplash.it/400/400', authors: ['Some, N'], publication: {}}],
  modal: {
    show: false,
    msg: '',
    error: false
  }
})

if (localStorage.getItem('list')) {
  const list = JSON.parse(localStorage.getItem('list'))
  store.setState({list})
}

store.watch('list', (val) => {
  localStorage.setItem('list', JSON.stringify(val))
  const local = localStorage.getItem('list')
}, 0)

export default store
