import Component from '../component.js'

class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      list: this.store.getState('list')
    }
  }
  build(){
    const v = this.domHandler.virtualize
    if (this.state.list.length === 0) {
      return v('p', {'class': 'list'}, 'You don\'t have any books in your list yet.')
    }
    return v('ul', {'class': 'list'},
      ...this.state.list.map(item => v('li', {'class': 'list__item book'},
          v('button', {'class': 'book__list-btn micro-action-btn btn', 'data-book': item.title, 'data-writer': item.authors[0]}, 'x'),
          v('div', {'class': 'book__content-holder'},
            v('h3', {'class': 'book__title'}, item.title),
            v('figure', {'class': 'book__figure'},
              v('img', {'src': item.img})
            )
          )
        )
      )
    )
  }
  mounted() {
    const delBtns = document.querySelectorAll('.book__list-btn')
    if (!delBtns) return
    delBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const element = e.target
        const container = element.parentNode
        const title = element.dataset.book
        const writer = element.dataset.writer
        const list = this.state.list
        const index = list.findIndex(book => book.title === title && book.authors[0] === writer)

        if (index > -1){
          const newList = list
          newList.splice(index, 1)
          this.store.setState({list: newList})
          container.classList.add('remove')
          container.addEventListener('transitionend', () => {
            setTimeout(()=>{
              this.setState({list: newList})
            }, 300)
          })
        } else if (list.length > 0) {
          this.error('Book to delete doesn\'t exist')
        }
      })
    })
  }
  error(err){
    document.querySelector('#error').innerText = err
  }
}

export default List
