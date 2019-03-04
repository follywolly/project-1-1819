import Component from '../component.js'

class Overview extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {},
      v('h1', {}, 'Hello world')
    )
  }
}

export default Overview
