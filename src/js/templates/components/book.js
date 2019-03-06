import Component from '../component.js'
import data from '../../plugins/data.js'

class Book extends Component {
  constructor(props){
    super(props)
    this.state = {
      book: this.store.getState('book')
    }
    this.data = data
  }
  build(){
    const v = this.domHandler.virtualize
    if (!this.state.book) {
      return v('div', {'class': 'book placeholder'})
    }
    return v('div', {'class': 'book'},
      v('div', {'class': 'book__content-holder'},
        v('button', {'class': 'book__list-btn btn', 'id': 'add-button'}, '+'),
        v('h3', {'class': 'book__title'}, this.state.book.title),
        v('figure', {'class': 'book__figure'},
          v('img', {'src': this.state.book.img})
        )
      ),
      v('ul', {'class': 'book__subjects'},
        ...this.state.book.subjects.map(subject => v('li', {'class': 'book__subject'}, subject)),
        v('li', {'class': 'book__subject'})
      )
    )
  }
  loader() {
    const v = this.domHandler.virtualize
    return v('div', {},
      v('div', {'class': 'book loader'},
        v('div', {'class': 'book__content-holder'},
          v('div', {'class': 'book__title loader__child'}),
          v('div', {'class': 'book__figure loader__child'})
        ),
        v('div', {'class': 'book__subjects loader__child'})
      ),
      v('p', {'class': 'center loader__text'}, 'Loading may take a while...')
    )
  }
  mounted() {
    this.store.watch('barcode', (val)=>{
      if (val) {
        this.loadBook(val)
      }
    }, this.id)
    this.add()
  }
  add() {
    const button = document.querySelector('#add-button')
    if (!button) return
    button.addEventListener('click', () => {
      const list = this.store.getState('list')
      list.push(this.state.book)
      this.store.setState({list})
      this.store.setState({modal: {show: true, msg: 'Added book to list'}})
    })
  }
  error(err){
    document.querySelector('#error').innerText = err
  }
  async loadBook(isbn) {
    this.loading(true)
    this.error('')

    try {
      // request
      const book = await this.data.getSingle(isbn)
      this.loading(false)
      this.store.setState({book})
      this.setState({book})
    } catch (e) {
      this.loading(false)
      this.error(e)
    }
  }
}

export default Book
