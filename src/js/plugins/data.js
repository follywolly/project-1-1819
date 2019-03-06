import { API } from './obawrapper/index.js'

const api = new API({
    key: '1e19898c87464e239192c8bfe422f280'
})

const noNull = obj => {
  for (const [key, val] of Object.entries(obj)) {
    obj[key] = !val ? '' : val
  }
  return obj
}

const singleTemp = book => {
  const temp = {
    img: book.coverimages.coverimage[0]._text,
    title: book.titles.title._text,
    subjects: book.subjects['topical-subject'].map(subject => subject['_text']),
    // data: book
  }
  temp.subjects = temp.subjects ? temp.subjects : []
  return noNull(temp)
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
