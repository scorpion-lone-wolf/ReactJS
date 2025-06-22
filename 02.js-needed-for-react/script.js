const { getBook, getBooks } = require("./data");

// =============================
// Destructuring
// =============================
console.log("\n============ Destructuring ========================\n");

const book = getBook(1);
const {
  id,
  title,
  author: authorName, // rename object variable while destructuring
  pages,
  publicationDate,
  genres,
  hasMovieAdaptation,
  reviews,
} = book; // *Object destructuring
console.log(id, title, authorName, pages, publicationDate, genres, hasMovieAdaptation, reviews);

let [firstGenres, secondGenres] = genres; // * array destructuring
console.log(firstGenres, secondGenres);

// =============================
// Rest and Spread Operator
// =============================

console.log("\n============ rest && spread ========================\n");

[firstGenres, secondGenres, ...restGenres] = genres; // rest operator
console.log(firstGenres, secondGenres, restGenres);

const newGenres = [...genres, "epic fantasy"]; // spread operator in array
console.log("new Genres: ", newGenres);

const updatedBook = {
  ...book,
  // Adding new property
  moviePublicationDate: "2001-12-19",
}; // spread operator in object
console.log("updatedBook: ", updatedBook);

// =============================
// Template Literals
// =============================

console.log("\n============ Template Literals ========================\n");

const summary = `${title} is a book written by ${authorName} and has ${pages} pages.`;
console.log(summary);

// =============================
// Ternary Operator
// =============================

console.log("\n============ Ternary Operator instead of if else ========================\n");

const pagesRange = pages > 1000 ? "over a thousand" : "less than a thousand";
console.log("Pages Ranges : ", pagesRange);

// =============================
// Arrow functions
// =============================

console.log("\n============ Arrow Functions ========================\n");

// given a date 'yyyy-mm-dd' format ,return 'yyyy'
const getYear = date => date.split("-")[0];

console.log(getYear(publicationDate));

// =============================
// Short circuiting And Logical Operators (&& , || , ??)
// =============================

console.log("\n============ && , || , ?? ========================\n");

// && : for all falsy values (false, 0, 0n,  '', undefined, null, NaN ) this will return first operant
// || : is the opposite of && , for all fasly value this will return the second operand

console.log(true && "I will be printed"); // I will be printed
console.log(false && "I will not be printed"); // false
console.log(hasMovieAdaptation && "This book has a movie");

console.log(true || "I will not be printed"); // true
console.log(false || "I will be printed"); // I will be printed
const spansihTranslated = book.translations.spanish || "Not translated";
console.log(spansihTranslated);

// nullish coalescing operator ?? : for undefined and null , the second operant will be returned else first one
console.log(undefined ?? "I will be returned"); //I will be returned
console.log(null ?? "I will be returned as well"); // I will be returned as well
console.log(false ?? "No i wont be returned"); // false

// =============================
// Optional Chaining
// =============================s

console.log("\n============ Optional Chaining (?.) ========================\n");

function getTotalReviewCount(book) {
  const goodReadsCount = book?.reviews?.goodreads?.reviewsCount ?? 0;
  const librarythingCount = book?.reviews?.librarything?.reviewsCount ?? 0;
  return goodReadsCount + librarythingCount;
}

console.log(getTotalReviewCount(book));

// =============================
// map, filter and reduce
// =============================

console.log("\n============ map, filter, reduce ========================\n");

const allBooks = getBooks();

const allTitles = allBooks.map(book => book.title);
console.log("All titles of the books are : ", allTitles);

// books that has more then 500 pages
const booksTitleMoreThen500Pages = allBooks
  .filter(book => book.pages > 500)
  .map(book => book.title);
console.log("Books title more then 500 pages : ", booksTitleMoreThen500Pages);

const totalPages = allBooks.reduce((prevValue, book) => prevValue + book.pages, 0); // initialize prevValue = 0
console.log("Total pages of all books is : ", totalPages);

// =============================
// Array Sort methods
// =============================

console.log("\n============ Array Sort methods ========================\n");
// sort based on number of pages
const sortedBooks = allBooks.slice().sort((obj1, obj2) => {
  return obj1.pages - obj2.pages;
});
console.log("Sorted Books : ", sortedBooks);

// =============================
// Working With Immutable Array
// =============================

console.log("\n============ Immutable Array ========================\n");

// 1) add book object to an allBooks array
const newBook = {
  id: 6,
  title: "Hary potter",
  author: "J. K. Rowling",
  pages: 1234,
};

const bookAfterAdd = [...allBooks, newBook];
console.log("Book after add : ", bookAfterAdd);

// 2) delete an book object with id 3 from the bookAfterAdd array
const bookAfterDelete = bookAfterAdd.filter(book => {
  return book.id !== 3;
});
console.log("Book after delete : ", bookAfterDelete);

// 3) update book object in an array
const bookAfterUpdate = bookAfterDelete.map(book => {
  if (book.id === 6) return { ...book, pages: 0 };
  return book;
});

console.log("Book after update : ", bookAfterUpdate);

// =============================
// promise (then ,catch) && async/await
// =============================

console.log("\n============ Promise ========================\n");
// json placeholder api
fetch("https://jsonplaceholder.typicode.com/todos")
  .then(res => {
    return res.json();
  })
  .then(data => {
    console.log("Response with then-catch :", data.length);
  })
  .catch(err => {
    console.error("err ", err);
  });
console.log("I won't wait for the response");

console.log("\n============ async await ========================\n");

async function getDatafromApi() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  console.log("Response with async-await :", data.length);
  console.log("I will wait for the response");
}

getDatafromApi();
