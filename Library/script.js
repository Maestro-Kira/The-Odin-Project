let Library = [];
const form = document.getElementById('libraryForm');
const bookArea = document.getElementById('bookDisplayArea');

// Load library from localStorage
function loadLibraryFromStorage() {
    const storedLibrary = localStorage.getItem('library');
    if (storedLibrary) {
        Library = JSON.parse(storedLibrary).map(bookData =>
            new Book(bookData.title, bookData.status, bookData.author, bookData.pagesAmount, bookData.genre)
        );
    }
}

// Save library to localStorage
function saveLibraryToStorage() {
    localStorage.setItem('library', JSON.stringify(Library));
}

// Book class and functions
class Book {
    constructor(title, status, author, pagesAmount, genre) {
        this.title = title;
        this.status = status;
        this.author = author;
        this.pagesAmount = pagesAmount;
        this.genre = genre;
    }

    toggleReadStatus() {
        // Define the possible statuses in a cycle
        const statuses = ['not-started', 'in-progress', 'completed'];
        const currentIndex = statuses.indexOf(this.status);
        const nextIndex = (currentIndex + 1) % statuses.length; // Cycle to the next status
        this.status = statuses[nextIndex]; // Update the book status
    }
}

function addBookToLibrary(book) {
    Library.push(book);
    saveLibraryToStorage(); // Save to localStorage after adding
}

function getFormValues() {
    const bookTitle = document.getElementById('bookTitle').value.trim();
    const bookStatus = document.getElementById('bookStatus').value;
    const bookAuthor = document.getElementById('bookAuthor').value.trim();
    const pagesAmount = document.getElementById('pagesAmount').value.trim();
    const genre = document.getElementById('bookGenre').value.trim();

    return {
        title: bookTitle,
        status: bookStatus,
        author: bookAuthor,
        pages: pagesAmount,
        genre: genre,
    };
}

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

function displayBooks() {
    // Remove existing book cards
    while (bookArea.firstChild) {
        bookArea.removeChild(bookArea.firstChild);
    }

    Library.forEach(book => {
        // Create a new book card div
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');

        // Create and set the book title
        const titleElement = document.createElement('h2');
        titleElement.textContent = capitalizeWord(book.title);
        bookCard.appendChild(titleElement);

        // Create status and set icon color based on its type.
        const { statusText, iconColor } = getStatusSetColor(book.status);
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

        // Create the update button
        const updateStatusButton = document.createElement('button');
        updateStatusButton.classList.add('updateBtn');
        updateStatusButton.textContent = 'Update';
        bookCard.appendChild(updateStatusButton);

        bookArea.appendChild(bookCard);
    });
}

// Check for duplicates
function isDuplicateBook(title) {
    return Library.some(book => book.title.toLowerCase() === title.toLowerCase());
}

// Event listeners
form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const formValues = getFormValues();

    // Check for duplicates
    if (isDuplicateBook(formValues.title)) {
        alert('This book already exists in your library.');
        return;
    }

    let newBook = new Book(formValues.title, formValues.status, formValues.author, formValues.pages, formValues.genre);
    addBookToLibrary(newBook);
    displayBooks();
});

// Event delegation for removing books
bookArea.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('removeBtn')) {
        const bookCard = ev.target.closest('.bookCard');
        const bookTitle = bookCard.querySelector('h2').textContent.toLowerCase();

        // Remove the book from the Library array
        Library = Library.filter(book => book.title.toLowerCase() !== bookTitle);
        saveLibraryToStorage(); // Save to localStorage after removing
        bookArea.removeChild(bookCard);
    }
});

// Event delegation for status change
bookArea.addEventListener('click', function (ev) {
    if (ev.target.classList.contains('updateBtn')) {
        const bookCard = ev.target.closest('.bookCard');
        const bookTitle = bookCard.querySelector('h2').textContent.toLowerCase(); // Get the book title

        // Find the book in the Library array
        Library.forEach(book => {
            if (book.title.toLowerCase() === bookTitle) {
                book.toggleReadStatus(); // Call the method to toggle status

                // Update the displayed status text and icon color
                const { statusText, iconColor } = getStatusSetColor(book.status);

                // Find the status <p> element (without the class)
                const statusElement = bookCard.querySelector('p'); // First <p> assumed to be the status

                // Update the status text without removing the <i> tag
                statusElement.firstChild.textContent = statusText; // Update text content

                // Update the icon color
                const iconElement = statusElement.querySelector('i');
                iconElement.style.color = iconColor;
            }
        });

        // Save the updated Library to localStorage
        saveLibraryToStorage();
    }
});

// Call displayBooks to show any existing books from localStorage when the page loads
window.addEventListener('load', () => {
    loadLibraryFromStorage();
    displayBooks();
});
