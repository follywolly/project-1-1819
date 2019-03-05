import Component from '../component.js'
import ScannerOutput from '../components/scanner-output.js'
import ScannerModal from '../components/scanner-modal.js'
import Book from '../components/book.js'

class Overview extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'class': 'container'},
      v('h1', {}, 'Scanner'),
      v('div', {'class': 'scanner'},
        v('button', {'class': 'scanner__modal-toggle'}, 'scan barcode'),
        v('div', {'class': 'scanner__output-holder'},
          v(ScannerOutput)
        ),
        v(ScannerModal)
      ),
      v('div', {'class': 'book-holder'},
        v(Book)
      ),
      v('p', {'id': 'error'})
    )
  }
}

export default Overview
