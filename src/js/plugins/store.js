'use strict'

import Store from '../virtual/store.js'

const store = new Store()

store.setState({
  barcode: 'scan barcode to see ISBN number'
})

export default store
