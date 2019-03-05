import Component from '../component.js'

class Header extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('header', {'class': 'header'},
      v('nav', {'class': 'main-navigation'},
        v('ul', {},
          v('li', {},
            v('a', {'href': '#/'}, 'home')
          ),
          v('li', {},
            v('a', {'href': '#/my-list'}, 'my list')
          )
        )
      ),
      v('h1', {}, 'OBAmeta')
    )
  }
}

export default Header
