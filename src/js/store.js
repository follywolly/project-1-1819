'use strict'

import Store from './virtual/store.js'

const store = new Store()

store.setState({
  barcode: null,
  book: null
})

export default store
