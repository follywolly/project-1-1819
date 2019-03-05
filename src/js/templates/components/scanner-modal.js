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
      v('button', {'class': 'scanner__modal-toggle'}, 'close scanner'),
      v('div', {'id': 'interactive', 'class': 'viewport'}),
      v('div', {'class': 'error'})
    )
  }
  mounted() {
    this.container = document.querySelector('#scanner__modal')
    this.toggleModal()
  }
  toggleModal(){
    const toggles = document.querySelectorAll('.scanner__modal-toggle')

    Quagga.onDetected(result => {
    	if (result.codeResult.code){
        Quagga.stop()
    		this.store.setState({barcode: result.codeResult.code})
    		setTimeout(() => { this.container.classList.remove('active') }, 1000)
    	}
    })

    toggles.forEach(toggle => toggle.addEventListener(
      'click',
      () => {
        this.container.classList.toggle('active')

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
    )
  }
}

export default ScannerModal
