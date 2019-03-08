/* global: Quagga */
'use strict'

// modules
import Router from './virtual/router.js'

import Overview from './templates/views/overview.js'
import MyList from './templates/views/mylist.js'
import store from './store.js'

console.log('linked');

const router = new Router()

router.use(() => {
  if (store.getState('modal').show) {
    store.setState({modal: {show: false, msg: '', error: false}})
  }
})

router.add(
  [
    {
      href: '/',
      temp: () => new Overview,
      callback: () => console.log('callback overview')
    },
    {
      href: '/my-list',
      temp: () => new MyList,
      callback: () => console.log('callback list')
    }
  ]
)

router.navigate()
