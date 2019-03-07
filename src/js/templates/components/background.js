import Component from '../component.js'

class Background extends Component {
  constructor(props){
    super(props)
    this.state = {
      rows: [0,1,2,3,4,5,6,7,8,9],
      columns: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    }
  }
  build(){
    const v = this.domHandler.virtualize

    return v('div', {'class': 'background'},
      ...this.state.rows.map(row =>
        v('div', {'class': 'scrolltext'},
          v('ul', {'class': 'scrolltext__list'},
            ...this.state.columns.map(column =>
              v('li', {}, column)
            )
          ),
          v('ul', {'class': 'scrolltext__list'},
            ...this.state.columns.map(column =>
              v('li', {}, column)
            )
          )
        )
      )
    )
  }
}

export default Background
