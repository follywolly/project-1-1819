import Component from './templates/component.js'
import Header from './templates/components/header.js'
import Background from './templates/components/background.js'

class App extends Component {
  constructor(props) {
    super(props)
  }
  build() {
    const v = this.domHandler.virtualize
    return v('div', {'class': 'app'},
      v(Header),
      v('main', {'id': 'router-view', 'class': 'main'}), // every route renders in router-view element
      v(Background)
    )
  }
}

export default App
