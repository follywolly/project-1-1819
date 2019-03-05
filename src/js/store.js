'use strict'

import Store from './virtual/store.js'

const store = new Store()

store.setState({
  barcode: null,
  book: null,
  list: []
})

if (localStorage.getItem('list')) {
  const list = JSON.parse(localStorage.getItem('list'))
  store.setState({list})
}

store.watch('list', () => {
  localStorage.setItem('list', JSON.stringify(val))
  const error = document.querySelector('#error')
  if (error) {
    const local = localStorage.getItem('list')
    error.innerText = local ? 'true, ' + local : 'false'
  }
}, null)

export default store
