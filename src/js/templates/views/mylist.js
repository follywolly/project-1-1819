import Component from '../component.js'
import List from '../components/list.js'
import APAGenerator from '../components/apagenerator.js'

class MyList extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'class': 'container list-container'},
      v('h2', {}, 'List'),
      v('div', {},
        v(APAGenerator)
      ),
      v('div', {},
        v(List)
      ),
      v('div', {'id': 'error'})
    )
  }
}

export default MyList
