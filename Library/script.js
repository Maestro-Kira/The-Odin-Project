let Library = [];
const form = document.getElementById('libraryForm');
const removeBtn = document.querySelector('.removeBtn');
const bookArea = document.getElementById('bookDisplayArea')
class Book {
    constructor(title, status, author, pagesAmount, genre) {
        this.title = title;
        this.status = status;
        this.author = author;
        this.pagesAmount = pagesAmount;
        this.genre = genre;
    }
}

function addBookToLibrary(book) {
    return Library.push(book);
}

function shiftLibraryArray(){
    return Library.shift();
}

function getFormValues() {
    const bookTitle = document.getElementById('bookTitle').value;
    const bookStatus = document.getElementById('bookStatus').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const pagesAmount = document.getElementById('pagesAmount').value;
    const genre = document.getElementById('bookGenre').value;

    return {
        title: bookTitle,
        status: bookStatus,
        author: bookAuthor,
        pages: pagesAmount,
        genre: genre,
    };
}
// Helper functions
function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function getStatusSetColor(status) {
    let statusText = '';
    let iconColor = '';

    if (status === 'completed') {
        statusText = 'Completed ';
        iconColor = '#1f5127';
    } else if (status === 'not-started') {
        statusText = 'Not started ';
        iconColor = 'darkred';
    } else if (status === 'in-progress') {
        statusText = 'In progress ';
        iconColor = 'yellow';
    }
    return { statusText, iconColor };
}

// Main functions
function displayBooks() {
    const bookArea = document.getElementById('bookDisplayArea');

    Library.forEach(book => {

        // Create a new book card div
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        // Create and set the book title
        const titleElement = document.createElement('h2');
        titleElement.textContent = capitalizeWord(book.title);
        bookCard.appendChild(titleElement);

        //Create status and set icon color based on its type.
        const { statusText, iconColor} = getStatusSetColor(book.status);
        const statusElement = document.createElement('p');
        statusElement.textContent = statusText;

        const iconElement = document.createElement('i');
        iconElement.classList.add('fa-solid', 'fa-circle', 'fa-sm');
        iconElement.style.color = iconColor;
        statusElement.appendChild(iconElement);
        bookCard.appendChild(statusElement);

        // Create and set the author paragraph
        const authorElement = document.createElement('p');
        authorElement.textContent = `Author: ${capitalizeWord(book.author)}`;
        bookCard.appendChild(authorElement);

        // Create and set the pages paragraph
        const pagesElement = document.createElement('p');
        pagesElement.textContent = `Pages: ${book.pagesAmount}`;
        bookCard.appendChild(pagesElement);

        // Create and set the genre paragraph
        const genreElement = document.createElement('p');
        genreElement.textContent = `Genre: ${capitalizeWord(book.genre)}`;
        bookCard.appendChild(genreElement);

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('removeBtn');
        removeButton.textContent = 'Remove Book';
        bookCard.appendChild(removeButton);

        bookArea.appendChild(bookCard);
    });
}

// Event listeners
form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    const formValues = getFormValues();
    let newBook = new Book(formValues.title, formValues.status, formValues.author, formValues.pages, formValues.genre);
    addBookToLibrary(newBook);
    displayBooks();
    shiftLibraryArray()
});


bookArea.addEventListener('click', function(ev) {
    if (ev.target.classList.contains('removeBtn')) {
        const bookCard = ev.target.closest('.bookCard');
        bookArea.removeChild(bookCard)
    }
})

