import { API } from './obawrapper/index.js'
import helper from '../virtual/helper.js'

const api = new API({
    key: '1e19898c87464e239192c8bfe422f280'
})

const singleTemp = book => {
  const temp = {
    img: book.coverimages
      ? book.coverimages.coverimage[0]._text
      : '',
    title: book.titles
      ? (book.titles['short-title']
        ? book.titles['short-title']._text
        : book.titles.title._text)
      : '',
    authors: book.authors.author
      ? (book.authors.author.length > 0
        ? [book.authors['main-author']._text, ...book.authors.author.map(helper.formatAuthor)]
        : [book.authors['main-author']._text])
      : [],
    publication: book.publication
     ? {
        year: book.publication.year ? book.publication.year._text : '',
        publisher: book.publication.publishers ? book.publication.publishers.publisher._text : '',
        place: book.publication.publishers ? book.publication.publishers.publisher._attributes.place.replace(/[^a-zA-Z0-9\-\,\s]/g,'') : ''
      }
    : {year: '', publisher: '', place: ''},
    subjects: book.subjects
    ? (book.subjects['topical-subject']
      ? (book.subjects['topical-subject'].length > 0
        ? book.subjects['topical-subject'].map(subject => subject._text)
        : [book.subjects['topical-subject']._text])
      : [])
    : []
  }
  temp.subjects = temp.subjects ? temp.subjects : []
  return helper.noNull(temp)
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
