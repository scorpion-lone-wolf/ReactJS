const { getBook, getBooks } = require("./data");

//=============================
// Destructuring
//=============================
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
} = book; // *Object destructuring
console.log(
  id,
  title,
  authorName,
  pages,
  publicationDate,
  genres,
  hasMovieAdaptation
);

let [firstGenres, secondGenres] = genres; // * array destructuring
console.log(firstGenres, secondGenres);

//=============================
// Rest and Spread Operator
//=============================

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

//=============================
// Template Literals
//=============================

console.log("\n============ Template Literals ========================\n");

const summary = `${title} is a book written by ${authorName} and has ${pages} pages.`;
console.log(summary);

//=============================
// Ternary Operator
//=============================

console.log(
  "\n============ Ternary Operator instead of if else ========================\n"
);

const pagesRange = pages > 1000 ? "over a thousand" : "less than a thousand";
console.log("Pages Ranges : ", pagesRange);

//=============================
// Arrow functions
//=============================

console.log("\n============ Arrow Functions ========================\n");

// given a date 'yyyy-mm-dd' format ,return 'yyyy'
const getYear = (date) => date.split("-")[0];

console.log(getYear(publicationDate));
