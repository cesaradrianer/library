const submitBtn = document.getElementById('submit-btn')
const authorInput = document.getElementById('author-input')
const titleInput = document.getElementById('title-input')
const pagesInput = document.getElementById('pages-input')
const readInput = document.getElementById('read')
const bookArea = document.getElementById('book-area')
const dialogBtn = document.getElementById('dialog-btn')
const dialog = document.getElementById('book-dialog')
const detailsDialog = document.getElementById('details')
const closeDialogBtn = document.getElementById('close-btn')
const closeDetailsBtn = document.getElementById('close-details-btn')
const bookTitle = document.getElementById('book-title')
const pageNumber = document.getElementById('page-number')
const readText = document.getElementById('read-text')
const bookAuthor = document.getElementById('book-author')

let books = []
const radioInputs = Object.entries(readInput)

function Book(author, title, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
    this.info = () => {
        console.log('Title: ' + this.title + ', Author: ' + this.author + ', Pages: ' + this.pages + ' Read: ' + this.read)
    }
}

function deleteBook(bookId) {
    const elemToBeRemoved = document.getElementById(`card-${bookId}`)
    elemToBeRemoved.remove()
    books.splice(books.map(elem => elem.id).indexOf(bookId), 1)
}

function getCheckboxState() {
    if (readInput.checked) {
        return "Yes"
    } else {
        return "No" 
    }
}

function updateReadStatus(bookId) {
    const elemToBeUpdated = document.getElementById(`card-${bookId}`)
    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            if (books[i].read == 'Yes') {
                books[i].read = 'No'
                elemToBeUpdated.childNodes[9].outerHTML = '<p>Has it been read?: <b>No</b></p>'
            } else if (books[i].read == 'No') {
                books[i].read = 'Yes'
                elemToBeUpdated.childNodes[9].outerHTML = '<p>Has it been read?: <b>Yes</b></p>'
            }
        }
    }
}

function cutText() {
    const bookTitle = titleInput.value
    if (bookTitle.length > 9) {
        return bookTitle.slice(0, 8) + '...'
    } else {
        return bookTitle
    }
}

function showDetails(bookId) {
    const chosenBook = books[books.map(elem => elem.id).indexOf(bookId)]
    detailsDialog.showModal()
    bookTitle.innerText = 'Title: ' + chosenBook.title
    bookAuthor.innerText = 'Author: ' + chosenBook.author
    pageNumber.innerText = 'Page Number: ' + chosenBook.pages
    readText.innerText = 'Has it been read?: ' + chosenBook.read
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    books.push(new Book(authorInput.value, titleInput.value, pagesInput.value, getCheckboxState(), books.length))
    books.slice(books.length - 1, books.length).forEach((book) => {
        const bookName = cutText(book.title)
        bookArea.insertAdjacentHTML('beforeend', `<div id="card-${book.id}" class="card">
                                                    <h1 id="book-title-${book.id}">${bookName}</h1>
                                                    <hr>
                                                    <p><i>By ${book.author}</i></p>
                                                    <p>Number of pages: <b>${book.pages}</b></p>
                                                    <p>Has it been read?: <b>${book.read}</b></p>
                                                    <div class="btn-section">
                                                        <button onclick="deleteBook(${book.id})" class="btn-del"><i id="close-btn" class="fa-solid fa-xmark"></i></button>
                                                        <button onclick="updateReadStatus(${book.id})" class="btn-secondary">Update Read</button>
                                                        <button onclick="showDetails(${book.id})" class="btn-secondary">See Details</button>
                                                    </div>
                                                  </div>`)
    })
    dialog.close()
})

dialogBtn.onclick = () => {
    dialog.showModal()
}

closeDialogBtn.onclick = () => {
    dialog.close()
}

closeDetailsBtn.onclick = () => {
    detailsDialog.close()
}