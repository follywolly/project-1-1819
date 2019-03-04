import Component from './templates/component.js'

class App extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'app'},
      v('div', {'id': 'router-view'}) // every route renders in router-view element
    )
  }
}

export default App
