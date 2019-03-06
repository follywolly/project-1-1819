import Component from '../component.js'

class APAGenerator extends Component {
  constructor(props){
    super(props)
    this.state = {
      apaList: [],
      list: this.store.getState('list')
    }
  }
  build(){
    const v = this.domHandler.virtualize
    if (this.state.list.length === 0) {
      return v('div', {'class': 'apa-generator'})
    }
    if (this.state.apaList.length === 0) {
      return v('div', {'class': 'apa-generator'},
        v('button', {'id': 'generate-apa-btn', 'class': 'apa-generator__btn btn'}, 'Generate APA'),
        v('div', {'id': 'apa-output', 'class': 'apa-generator__output'})
      )
    }
    return v('div', {'class': 'apa-generator'},
      v('button', {'id': 'generate-apa-btn', 'class': 'apa-generator__btn btn'}, 'Generate APA'),
      v('div', {'id': 'apa-output', 'class': 'apa-generator__output'},
        v('button', {'id': 'apa-output__close-btn', 'class': 'btn micro-action-btn'}, 'x'),
        ...this.state.apaList.map(book =>
          v('p', {}, book)
        )
      )
    )
  }
  mounted() {
    this.store.watch('list', (list) => {
      this.setState({list})
    }, this.id)

    if (this.state.list.length === 0) {
      return
    }

    const apaBtn = document.querySelector('#generate-apa-btn')
    const closeBtn = document.querySelector('#apa-output__close-btn')
    const apaOutput = document.querySelector('#apa-output')

    if (this.state.apaList.length > 0) {
      apaOutput.classList.add('show')
      closeBtn.addEventListener('click', () => {
        closeBtn.parentNode.classList.remove('show')
        closeBtn.parentNode.addEventListener('transitionend', () => {
          this.setState({apaList: []})
        })
      })
    }
    apaBtn.addEventListener('click', () => {
      const apaList = this.state.list.map(book => this.helper.genAPA(book))
      this.setState({apaList})
    })

  }
}

export default APAGenerator
