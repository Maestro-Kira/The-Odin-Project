let Library = [];
const form = document.getElementById('libraryForm');
function Book(title, status, author, pagesAmount, genre) {
    this.title = title;
    this.status = status;
    this.author = author;
    this.pagesAmount = pagesAmount;
    this.genre = genre;
}
function addBookToLibrary(book) {
    return Library.push(book);
}

form.addEventListener('submit', function(ev){
    ev.preventDefault();
    let bookTitle = document.getElementById('bookTitle').value;
    let bookStatus = document.getElementById('bookStatus').checked;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let pagesAmount = document.getElementById('pagesAmount').value;
    let genre = document.getElementById('bookGenre').value;

    let newBook = new Book(bookTitle, bookStatus, bookAuthor, pagesAmount, genre);

    addBookToLibrary(newBook);
    console.log(Library)
})


