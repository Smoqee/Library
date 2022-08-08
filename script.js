let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if(read === false) {
            return(`${title} by ${author}, ${pages} pages, not read yet`)
        } else {
            return(`${title} by ${author}, ${pages} pages, read`)
        }
    }
}

function addBookToLibrary(object) {
    //take user input and store new book objects in array
    myLibrary.push(object)
}

const tableBody = document.querySelector('tbody')



function displayBooks() {
    for(let i in myLibrary) {
        const addedBook = document.createElement('tr')
        addedBook.innerHTML = `
        <td>${myLibrary[i].title}</td>
        <td>${myLibrary[i].author}</td>
        <td>${myLibrary[i].pages}</td>
        <td>${myLibrary[i].read}</td>
        `
        tableBody.appendChild(addedBook)
    }
}

//just some examples
const TributeVonPanem = new Book("Tribute von Panem", "Komischer Vogel", 724, true)
const HarryPotter = new Book("Harry Potter", "JK is rolling", 1239, true)
addBookToLibrary(TributeVonPanem)
addBookToLibrary(HarryPotter)


//show books
displayBooks()
