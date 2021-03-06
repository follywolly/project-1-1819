import DOM from '../virtual/dom.js'
import helper from '../virtual/helper.js'
import store from '../store.js'

class Component {
  constructor(props){
    this.domHandler = new DOM()
    this.helper = helper
    this.store = store
    this.props = props
    this.state = {}
    this.id = this.store.unId
    this.store.commit('updateID') // increment unique id for every instance of components
    this.isLoading = false // default no loading state
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    this.domHandler.update(this) // update the component when state changes
  }
  loading(bool) {
    if (bool === 'previous') {
      this.isLoading = false
      return this.domHandler.update(this)
    }
    this.isLoading = bool
    if (bool === true) {
      this.domHandler.update(this)
    }
  }
  preBuild() {
    let node
    if (this.isLoading) {
      node = this.loader() // loading state
    } else {
      node = this.build() // default state
    }
    node.props['data-id'] = this.id // keep track of unique id per component on html elements

    return node
  }
  mounted() {
    return undefined
  }
  loader() {
    const v = this.domHandler.virtualize // shorthand for the DOM virtualize method
    return v('div', {'class': 'holder loading'},
      v('p', {}, 'Loading...')
    )
  }
  build() {
    return undefined
  }
}
export default Component
