import Component from '../component.js'

class ScannerOutput extends Component {
  constructor(props){
    super(props)
    this.state = {
      barcode: 'Scan a bar code to see ISBN number'
    }
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'id': 'scanner__output'}, this.state.barcode)
  }
  mounted() {
    this.store.watch('barcode', (val) => {
      this.setState({barcode: val})
    }, this.id)
  }
}

export default ScannerOutput
