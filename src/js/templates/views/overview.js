import Component from '../component.js'
import { liveStreamConfig } from '../../plugins/quaggaHandler.js'

class Overview extends Component {
  constructor(props){
    super(props)
  }
  build(){
    const v = this.domHandler.virtualize
    return v('div', {},
      v('h1', {}, 'Scanner'),
      v('div', {'class': 'scanner-holder'},
        v('button', {'class': 'scanner__modal-toggle'}, 'scan barcode'),
        v('div', {'id': 'scanner__output'}, this.store.state.barcode),
        v('div', {'id': 'scanner__modal'},
          v('button', {'class': 'scanner__modal-toggle'}, 'close scanner'),
          v('div', {'id': 'interactive', 'class': 'viewport'}),
          v('div', {'class': 'error'})
        )
      )
    )
  }
  mounted() {
    this.toggleModal()
  }
  toggleModal(){
    const toggles = document.querySelectorAll('.scanner__modal-toggle')
    const modal = document.querySelector('#scanner__modal')
    toggles.forEach(toggle => toggle.addEventListener(
      'click',
      () => {
        modal.classList.toggle('active')

        if (modal.classList.contains('active')) {
          Quagga.init(
        		liveStreamConfig,
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

export default Overview
