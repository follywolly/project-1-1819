import Component from '../component.js'
import Scanner from '../components/scanner.js'
import Book from '../components/book.js'

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
      v('p', {'id': 'error'})
    )
  }
}

export default Overview
