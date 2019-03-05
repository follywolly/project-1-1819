import Component from '../component.js'

class ScannerOutput extends Component {
  constructor(props){
    super(props)
    this.state = {
      barcode: ''
    }
  }
  build(){
    const v = this.domHandler.virtualize

    if (!this.state.barcode) {
      return v('div', {'id': 'scanner__output'})
    }
    return v('div', {'id': 'scanner__output'},
      v('p', {}, `ISBN Number: ${this.state.barcode}`)
    )
  }
  mounted() {
    this.store.watch('barcode', (val) => {
      this.setState({barcode: val})
    }, this.id)
  }
}

export default ScannerOutput
