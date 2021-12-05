// our 'data' / Model
let myLibrary = [
    {
        title: 'Dune',
        author: 'Frank Herbert',
        pages: 766,
        read: true,
        cover: 'cover/dune.jpg'
    },
    {
        title: 'A much longer book title',
        author: 'Frank Herbert',
        pages: 766,
        read: true,
        cover: 'cover/dune.jpg'
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        pages: 766,
        read: false,
        cover: 'cover/dune.jpg'
    },
    {
        title: 'Dune',
        author: 'Frank Herbert',
        pages: 766,
        read: true,
        cover: 'cover/dune.jpg'
    },
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
        view.displayBooks(bookList); // why can I use this instead of view here? 
        document.querySelector('.bookForm').addEventListener('submit', view.createNewBook);
    },
    displayBooks: (bookList) => {
        myLibrary.forEach(book => {
            let bookCard = document.createElement('li');
            bookCard.classList.add('library__book');
            let bookCover = document.createElement('img');
            let bookDetails = document.createElement('div');
            bookDetails.classList.add('library__details');
            let bookTitle = document.createElement('p');
            bookTitle.classList.add('library__title');
            let bookAuthor = document.createElement('p');
            bookAuthor.classList.add('library__author');
            let bookPages = document.createElement('p');
            bookPages.classList.add('library__pages');
            let bookRead = document.createElement('p');
            bookRead.classList.add('library__read');
            let bookBtn = document.createElement('div');
            bookBtn.classList.add('library__btn');

            if(!book.read) {
                bookBtn.innerHTML = 'Want to Read';
            } else {
                bookBtn.innerHTML = 'Read';
                bookBtn.classList.add('library__btn--read');
            }

            bookCard.addEventListener('click', (e) => {
                let btn = e.target.querySelector('.library__btn');
                btn.classList.toggle('library__btn--read');
                if(btn.classList.contains('library__btn--read')) {
                  console.log('library__btn--read');
                  btn.innerHTML = 'Read';
                  
                } else {
                   console.log('else');
                   btn.innerHTML = 'Want to Read';
                }
            })

            
            bookTitle.innerText = book.title;
            bookAuthor.innerText = book.author;
            bookPages.innerText = `${book.pages} Pages`
            bookRead.innerText = book.read;
            bookList.prepend(bookCard);
            bookCover.src = 'covers/dune.jpg';
            bookCover.classList.add('library__cover');
            bookDetails.append(bookTitle, bookAuthor, bookPages, bookBtn);
            bookCard.append(bookCover, bookDetails);
        })
    },
    
    createNewBook: (event) => {
            event.preventDefault();
            let title = document.querySelector('.bookForm__title').value;
            let author = document.querySelector('.bookForm__author').value;
            let pages = document.querySelector('.bookForm__pages').value;
            let read = document.querySelector('.bookForm__read').checked;
            let newBook = new Book(title, author, pages, read);
            myLibrary.push(newBook);
            view.render();
    }
}

operator.init();

