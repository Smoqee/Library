/**
 * Book class to add unlimited books with bind specifics
 */
class Book {
    constructor(title, author, pages, status) {
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
    }

    info() {
        if(this.status === false) {
            return(`${this.title} by ${this.author}, ${this.pages} pages, not read yet`)
        } else {
            return(`${this.title} by ${this.author}, ${this.pages} pages, read`)
        }
    }

    toggleStatus() {
        if(this.status === true) {
            this.status = false
        } else {
            this.status = true
        }
    }
}

let myLibrary = [
    new Book('Tribute von Panem', "Komischer Vogel", 724, true),
    new Book('Harry Potter', 'JK is rollin', '1392', false),
    new Book('The Hobbit', 'Tolkien', 673, true)
]

const tableBody = document.querySelector('tbody')


function addBookToLibrary() {
    const newTitle = document.querySelector('#title')
    const newAuthor = document.querySelector('#author')
    const newPages = document.querySelector('#pages')
    const newStatus = document.querySelector('#status')    
    myLibrary.push(
        new Book(newTitle.value, newAuthor.value, newPages.value, newStatus.options[newStatus.selectedIndex].value === "true")
        )
    displayBooks()
}



function displayBooks() {
    tableBody.innerHTML = ""
    for(let i in myLibrary) {
        const addedBook = document.createElement('tr')
        if (myLibrary[i].status === true) {
            addedBook.innerHTML = `
            <td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td class="status-field">read</td>
            <td><button class="remove-book data-${i}">x</button></td>
            `
        } else {
            addedBook.innerHTML = `
            <td>${myLibrary[i].title}</td>
            <td>${myLibrary[i].author}</td>
            <td>${myLibrary[i].pages}</td>
            <td class="status-field">not yet read</td>
            <td><button class="remove-book data-${i}">x</button></td>
            `
        }
        
        
        tableBody.appendChild(addedBook)
    }


    const removeBookButtons = document.querySelectorAll('.remove-book')
    removeBookButtons.forEach(obj => {
        obj.addEventListener('click', (e) => {
            myLibrary.splice(obj.classList[1].split('-')[1], 1)
            displayBooks()
        })
    })
    const statusFields = document.querySelectorAll('.status-field')
    statusFields.forEach(obj => {
        obj.style.textDecoration = 'underline'
        obj.style.fontStyle = 'italic'
        obj.addEventListener('click', (e) => {
            let objectNumber = obj.nextSibling.nextSibling.firstChild.classList[1].split('-')[1]
            myLibrary[objectNumber].toggleStatus()
            displayBooks()
        })
    })

}

function resetInput() {
    
    const newTitle = document.querySelector('#title')
    const newAuthor = document.querySelector('#author')
    const newPages = document.querySelector('#pages')
    const newStatus = document.querySelector('#status')
    newTitle.value = ""
    newAuthor.value = ""
    newPages.value = ""
    newStatus.value = "true"
}


const button = document.querySelector('#main-button')
const cancel = document.querySelector('#cancel')

const newBookTable = document.querySelector('#new-book')
button.addEventListener('click', (e) => {
    if(button.classList.contains('hidden-field')) {
        button.classList.toggle('hidden-field')
        newBookTable.style.visibility = "visible"
        button.innerText = "Submit"
        button.type = 'button'

        cancel.style.visibility = 'visible'
    } else {
        button.type = 'submit'
        if(document.querySelector('form').checkValidity() === true) {
            addBookToLibrary()
            resetInput()
            e.preventDefault()
        }
    }
})

cancel.addEventListener('click', (e) => {
    resetInput()
    newBookTable.style.visibility = "hidden"
    cancel.style.visibility = "hidden"
    button.innerText = "+ Add to Library"
    button.classList.toggle('hidden-field')
})





displayBooks()

//show all books in list
