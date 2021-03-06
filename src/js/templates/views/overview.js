import Component from '../component.js'
import Scanner from '../components/scanner.js'
import Book from '../components/book.js'
import Popup from '../components/popup.js'

class Overview extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'class': 'container'},
      v(Scanner),
      v('div', {'class': 'book-holder'},
        v(Book)
      ),
      v('div', {},
        v(Popup)
      ),
      v('p', {'class': 'small center'},
        'Machine background image design by ',
        v('a', {'href': 'http://www.freepik.com'}, 'Freepik')
      )
    )
  }
}

export default Overview
