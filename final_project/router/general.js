const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

//cd expressBookReviews/final_project
// lsof -ti :5000 | xargs kill -9
public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered" });
});

/*var 1
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify({books},null,4));
});
*/

/*var 2
public_users.get('/', function (req, res) {
    new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject("Books not found");
      }
    })
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
  });
  */

  /*var 3
  public_users.get('/', async function (req, res) {
    try {
      const getBooks = () => {
        return new Promise((resolve, reject) => {
          if (books) {
            resolve(books);
          } else {
            reject("Books not found");
          }
        });
      };
  
      const result = await getBooks();
      res.status(200).json(result);
  
    } catch (err) {
      res.status(404).json({ message: err });
    }
  });
    */
   
  const axios = require('axios');

public_users.get('/', async function (req, res) {
    try {
      const response = await axios.get('http://localhost:5000/');
      res.status(200).json(response.data);
    } catch (err) {

      res.status(404).json({ message: err.message });
    }
  });







// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"}); 
  const result = Object.values(books).filter(b => b.isbn == req.params.isbn);
  
  if (result.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }
  
  res.send(result);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const result = Object.values(books).filter(b => b.author == req.params.author);
  
  if (result.length === 0) {
    return res.status(404).json({ message: "Author not found" });
  }
  
  res.send(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const result = Object.values(books).filter(b => b.title == req.params.title);
  
  if (result.length === 0) {
    return res.status(404).json({ message: "Title not found" });
  }
  
  res.send(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const result= Object.values(books).filter(b => b.isbn == req.params.isbn).map(r=>r.reviews);
  
  if (result.length === 0) {
    return res.status(404).json({ message: "isbn not found" });
  }
  res.send(result);
  
});

module.exports.general = public_users;
