import Component from '../component.js'
import data from '../../plugins/data.js'

class Book extends Component {
  constructor(props){
    super(props)
    this.state = {
      book: null
    }
    this.data = data

  }
  build(){
    const v = this.domHandler.virtualize
    if (!this.state.book) {
      return v('div', {'class': 'book placeholder'})
    }
    return v('div', {'class': 'book'},
      v('h3', {'class': 'book__title'}, this.state.book.title),
      v('img', {'src': this.state.book.img})
    )
  }
  mounted() {
    this.store.watch('barcode', (val)=>{
      if (val) {
        this.loadBook(val)
      }
    }, this.id)
  }
  async loadBook(isbn) {
    this.loading = true
    this.setState({})
    const error = err => document.querySelector('#error').innerText = err

    try {
      // request
      const book = await this.data.getSingle(isbn)
      this.loading = false
      this.setState({book})
    } catch (e) {
      error(e)
    }
  }
}

export default Book
