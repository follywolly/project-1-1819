class Helper {
  constructor() {}
  chunk(array, size = 3) {
    let length = array == null ? 0 : array.length;
    if (!length) {
      return []
    }
    let index = 0,
        result = []

    while (index < length) {
      let ch = array.slice(index, index + size) // zolang er nog overige items in de array zitten, maak nieuwe chunk zo lang als size. Als er minder items in zitten dan de size grootte wordt de laatste chunk automatisch gevuld met overige items.
      result.push(ch)
      index += size // reset index naar het eind van de vorige gemaakte chunk
    }
    return result
  }
  genAPA(book) {
    // author, a. a., & author, a. b., & author, b. a. (pubYear). Title. City, State: publisher.
    let str = ``

    // authors
    if (book.authors.length > 0) {
      book.authors.forEach((author, i) => {
        if (i === book.authors.length - 1) {
          str += `${author}. `
        } else {
          str += `${author}, & `
        }
      })
    } else {
      str += `${book.title}. `
    }

    // publication - pubYear
    if (book.publication.year) {
      str += `(${book.publication.year}). `
    } else {
      str += `(n.d.). `
    }

    // publication - title
    if (book.authors.length > 0) {
      str += `${book.title}. `
    }


    // publication - City, state & publisher
    if (book.publication.place && book.publication.publisher) {
      str += `${book.publication.place}: ${book.publication.publisher}.`
    } else if (book.publication.place) {
      str += `${book.publication.place}.`
    } else if (book.publication.publisher) {
      str += `${book.publication.publisher}.`
    }

    return str.trim()
  }
}
export default Helper
