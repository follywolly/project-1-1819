/*global: Quagga*/
import Component from '../component.js'
import config from '../../plugins/scanner-config.js'

class ScannerModal extends Component {
  constructor(props){
    super(props)
    this.config = config
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {'id': 'scanner__modal'},
      v('div', {'id': 'interactive', 'class': 'viewport'}),
      v('div', {'class': 'error'})
    )
  }
  mounted() {
    this.container = document.querySelector('#scanner__modal')
    this.toggleModal()
  }
  toggleModal(){
    const toggle = document.querySelector('.scanner__modal-toggle')

    Quagga.onDetected(result => {
    	if (result.codeResult.code){
        Quagga.stop()
    		setTimeout(() => {
          toggle.classList.remove('active')
          this.container.classList.remove('active')
          this.store.setState({barcode: result.codeResult.code})
        }, 0)
    	}
    })

    toggle.addEventListener('click', () => {
      this.container.classList.toggle('active')
      toggle.classList.toggle('active')

      if (this.container.classList.contains('active')) {
        Quagga.init(
      		this.config.liveStream,
      		(err) => {
      			if (err) {
              console.log(err)
      				Quagga.stop()
      				return
      			}
      			Quagga.start()
      		}
      	)
      } else {
        if (Quagga){
      		Quagga.stop()
      	}
      }
    })
  }
}

export default ScannerModal
