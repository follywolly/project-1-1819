'use strict'

import Store from './virtual/store.js'

const store = new Store()

store.setState({
  barcode: null,
  book: null,
  list: [{title: 'Book 1', img: 'https://unsplash.it/400/400'}, {title: 'Book 2', img: 'https://unsplash.it/400/400'}],
  modal: {
    show: false,
    msg: ''
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
