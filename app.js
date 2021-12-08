// our 'data' / Model
let myLibrary = [
    {
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        pages: 928,
        read: true,
        cover: 'covers/don.jpg'
    },
    
    {
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        pages: 864,
        read: false,
        cover: 'covers/anna-karenina.jpg'
    },
    {
        title: 'Night Film',
        author: 'Marisha Pessl',
        pages: 602,
        read: false,
        cover: 'covers/night.jpg'
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        pages: 766,
        read: true,
        cover: 'covers/dune.jpg'
    },
    {
        title: 'The Alice Network the longest book tile in the world',
        author: 'Kate Quinn',
        pages: 560,
        read: true,
        cover: 'covers/alice.jpg'
    }
];


class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


let operator = {
    init: () => {
        view.render();
    }
}


let view = {
    render: () => {
        const bookList = document.querySelector('.library');
        if(bookList.hasChildNodes()) {
           bookList.innerHTML = '';
        }
        view.displayBooks(bookList); 
        view.bookModal();
        document.querySelector('.bookForm').addEventListener('submit', view.createNewBook);
    },
    displayBooks: (bookListDOM) => {
        myLibrary.forEach((book, idx) => {
            //creating DOM elements
            let bookCard = document.createElement('li');
            bookCard.classList.add('library__book');
            bookCard.dataset.order = idx;
            let bookCover = document.createElement('img');
            let bookDetails = document.createElement('div');
            bookDetails.classList.add('library__details');
            let bookTitle = document.createElement('p');
            bookTitle.classList.add('library__bookTitle');
            let bookAuthor = document.createElement('p');
            bookAuthor.classList.add('library__author');
            let bookPages = document.createElement('p');
            bookPages.classList.add('library__pages');
            let bookRead = document.createElement('p');
            bookRead.classList.add('library__read');
            let bookBtn = document.createElement('div');
            bookBtn.classList.add('library__btn');
            let bookDelete = document.createElement('i');
            bookDelete.classList.add('far', 'fa-trash-alt');

            // assign index to dom element
            myLibrary[idx].order = idx;
            
            // logic for read/to read status 
            if(!book.read) {
                bookBtn.innerHTML = 'Not Read';
            } else {
                bookBtn.innerHTML = 'Read';
                bookBtn.classList.add('library__btn--read');
            }

            // card click event to toggle Read / Want to Read - DOM and data
            bookCard.addEventListener('click', (e) => {
                let btn = e.target.querySelector('.library__btn');
                let bookObject = btn.parentElement.parentElement.dataset.order;
                btn.classList.toggle('library__btn--read');

                if(btn.classList.contains('library__btn--read')) {
                  btn.innerHTML = 'Read';
                  myLibrary[bookObject].read = true;
                } else {
                   btn.innerHTML = 'Not Read';
                   myLibrary[bookObject].read = false;
                }
            })

            bookDelete.addEventListener('click', () => {
                let bookIdx = bookDelete.parentElement.dataset.order;
                myLibrary.splice(bookIdx, 1);
                view.render();
                
            })

            bookTitle.innerText = book.title;
            bookAuthor.innerText = book.author;
            bookPages.innerText = `${book.pages} Pages`
            bookRead.innerText = book.read;
            bookListDOM.prepend(bookCard);
            if(!book.cover) {
                bookCover.src = 'covers/temp.jpg';
            } else {
                bookCover.src = book.cover;
            }
            bookCover.classList.add('library__cover');
            bookDetails.append(bookTitle, bookAuthor, bookPages, bookBtn);
            bookCard.append(bookCover, bookDetails, bookDelete);
        })
    },
    createNewBook: (e) => {
        e.preventDefault();
        let title = document.querySelector('.bookForm__title')
        let author = document.querySelector('.bookForm__author')
        let pages = document.querySelector('.bookForm__pages')
        let read = document.querySelector('.bookForm__read')
        let newBook = new Book(title.value, author.value, pages.value, read.checked);
        myLibrary.push(newBook);
        view.render();
        const form = document.querySelector('.bookForm');
        const body = document.querySelector('.overlay');
        form.classList.remove('bookForm--active');
        body.classList.remove('overlay--active');
    },
    bookModal: () => {
        // open modal
        const overlay = document.querySelector('.overlay');
        const addBookBtn = document.querySelector('.toolbar__add');
        const form = document.querySelector('.bookForm');
        addBookBtn.addEventListener('click', ()=> {
            overlay.classList.add('overlay--active');
            form.classList.add('bookForm--active');
            overlayClick();
        });
        // click outside to close
        const overlayClick = () => {
            const overlay = document.querySelector('.overlay--active');
            console.log(overlay)
            overlay.addEventListener('click', (e) => {
                if(e.target.classList.contains('overlay--active')) {
                    e.target.classList.remove('overlay--active');
                    form.classList.remove('bookForm--active');
                }
            })
        };
    }
}

operator.init();





