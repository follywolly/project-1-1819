import Component from '../component.js'

class Popup extends Component {
  constructor(props){
    super(props)
    const modal = this.store.getState('modal')
    this.state = {
      msg: modal.msg,
      show: modal.show,
      error: modal.error
    }
  }
  build(){
    const v = this.domHandler.virtualize

    if (!this.state.show) {
      return v('div', {'id': 'modal'})
    }
    if (this.state.error) {
      return v('div', {'id': 'modal', 'class': 'error'},
        v('p', {}, this.state.msg)
      )
    }
    return v('div', {'id': 'modal'},
      v('p', {}, this.state.msg)
    )
  }
  mounted() {
    this.store.watch('modal', (val) => {
      this.setState(val)
    }, this.id)
    if (this.state.show) {
      const modal = document.querySelector('#modal')
      modal.classList.add('show')
      modal.addEventListener('transitionend', () => {
        if (modal.classList.contains('show')) {
          setTimeout(() => {
            modal.classList.remove('show')
          }, 1500)
        } else {
          this.store.setState({modal: {show: false, msg: '', error: false}})
        }
      })
    }
  }
}

export default Popup
