/* global: Quagga */
'use strict'

// modules
import Router from './virtual/router.js'

import Overview from './templates/views/overview.js'

console.log('linked');

const router = new Router()

router.add(
  [
    {
      href: '/',
      temp: () => new Overview,
      callback: () => console.log('callback')
    }
  ]
)

router.navigate()
