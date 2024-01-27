const titleField = document.getElementById('title')
const authorField = document.getElementById('author')
const pagesField = document.getElementById('pages')
const readField = document.getElementById('read')
const booksWrapper = document.getElementById('books')
const submitBtn = document.getElementById('submit_button')

let books = []

function Book(title, author, pages, read) {

    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    this.info = () => {

        return `'${this.title}' by ${this.author}, ${this.pages}, ${this.read}.`

    }

}

function addBookToTheLibrary() {

    books.push(new Book(titleField.value, authorField.value, pagesField.value, readField.value))

}

submitBtn.addEventListener('onclick', (e) => {

    e.preventDefault()
    addBookToTheLibrary()

})

books.forEach((item) => {

    booksWrapper.insertAdjacentHTML('beforeend', 
    `<div class="card">
        <h3>${book.title}</h3>
        <p><b>${book.author}</b></p>
        <p>Pages: ${book.pages}</p>
        <p>Has it been read?: ${book.read}</p>
    </div>`)

})