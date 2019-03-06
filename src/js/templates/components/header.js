import Component from '../component.js'

class Header extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('header', {'class': 'header'},
      v('a', {'href': '#/', 'class': 'main-navigation__link'},
        v('h1', {'class': 'header__title'}, 'OBA-APA')
      ),
      v('nav', {'class': 'main-navigation'},
        v('ul', {'class': 'main-navigation__list'},
          // v('li', {'class': 'main-navigation__list-item'},
          //   v('a', {'href': '#/', 'class': 'main-navigation__link'}, 'home')
          // ),
          v('li', {'class': 'main-navigation__list-item'},
            v('a', {'href': '#/my-list', 'class': 'main-navigation__link'}, 'my list')
          )
        )
      )
    )
  }
}

export default Header
