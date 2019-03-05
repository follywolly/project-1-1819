import { API } from './obawrapper/index.js'

const api = new API({
    key: '1e19898c87464e239192c8bfe422f280'
})

const singleTemp = book => {
  return {
    img: book.coverimages.coverimage[0]['_text'],
    title: book.titles.title['_text']
  }
}

const data = {
  async getSingle(val) {
    const stream = await api.createStream(`search/${val}`)

    return new Promise((resolve, reject) => {
      stream
        .pipe(singleTemp)
        .pipe(resolve)
        .catch(reject)
    })
  }
}

export default data
