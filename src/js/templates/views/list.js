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
      return v('div', {'class': 'container'},
        v('h2', {}, 'List'),
        v('p', {}, 'You don\'t have any books in your list yet.'),
        v('div', {'id': 'error'})
      )
    }
    return v('div', {'class': 'container'},
      v('h2', {}, 'List'),
      v('ul', {'class': 'list'},
        ...this.state.list.map(item => v('li', {'class': 'list__item book'},
            v('button', {'class': 'book__list-btn btn', 'data-book': item.title}, 'x'),
            v('div', {'class': 'book__content-holder'},
              v('h3', {'class': 'book__title'}, item.title),
              v('figure', {'class': 'book__figure'},
                v('img', {'src': item.img})
              )
            )
          )
        )
      ),
      v('div', {'id': 'error'})
    )
  }
  mounted() {
    const delBtns = document.querySelectorAll('.book__list-btn')
    delBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        const element = e.target
        const container = element.parentNode
        const title = element.dataset.book
        const list = this.state.list
        const index = list.findIndex(book => book.title === title)

        if (index > -1){
          const newList = list
          newList.splice(index, 1)
          this.store.setState({list: newList})
          container.classList.add('remove')
          container.addEventListener('transitionend', () => {
            this.setState({list: newList})
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
