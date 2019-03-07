import Component from '../component.js'
import data from '../../plugins/data.js'

class Book extends Component {
  constructor(props){
    super(props)
    this.state = {
      book: this.store.getState('book'), // {title: 'book 1', subjects: [], img: 'https://unsplash.it/400/400', authors: ['Some, N']}, 
      error: false
    }
    this.data = data
  }
  build(){
    const v = this.domHandler.virtualize
    if (this.state.error) {
      return v('div', {'class': 'book placeholder'},
        v('p', {'id': 'error', 'class': 'center'}, `${this.state.error}`)
      )
    }
    if (!this.state.book) {
      return v('div', {'class': 'book placeholder'},
        v('h2', {'class': 'overview-title center'},
        v('img', {'src': './images/oba_logo.svg'}),
        'sourceror'),
        v('p', {'class': 'center'}, 'Welcome to the OBA source reference list generator.'),
        v('p', {'class': 'center'}, 'Get started by scanning a book!')
      )
    }
    return v('div', {'class': 'book'},
      v('div', {'class': 'book__content-holder'},
        v('button', {'class': 'book__list-btn micro-action-btn btn', 'id': 'add-button'}, '+'),
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
      const book = this.state.book
      const index = list.findIndex(obj => obj.title === book.title && obj.authors[0] === book.authors[0])
      if (index > -1) {
        this.store.setState({modal: {show: true, msg: 'This book is already on your list!'}})
      } else {
        list.push(this.state.book)
        this.store.setState({list})
        this.store.setState({modal: {show: true, msg: 'Added book to list'}})
      }
    })
  }
  async loadBook(isbn) {
    this.loading(true)
    this.setState({error: false})

    try {
      // request
      const obj = await this.data.getSingle(isbn)
      const book = {...obj, data: ''}
      this.loading(false)
      this.store.setState({book})
      this.setState({book})
    } catch (e) {
      this.loading(false)
      this.setState({error: e})
    }
  }
}

export default Book
