import Component from '../component.js'

class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: this.store.getState('list')
    }
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'class': 'container'},
      v('h2', {}, 'List'),
      v('ul', {},
        ...this.state.list.map(item => v('li', {}, item.title))
      )
    )
  }
}

export default List
