import Component from '../component.js'
import ScannerOutput from './scanner-output.js'
import ScannerModal from './scanner-modal.js'

class Scanner extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'class': 'scanner'},
      v('button', {'class': 'scanner__modal-toggle btn center', 'id': 'scanner-toggle'}, 'scan barcode'),
      v(ScannerModal),
      v('div', {'class': 'scanner__output-holder'},
        v(ScannerOutput)
      ),
    )
  }
}

export default Scanner
