const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        username:"user_1",
        password:"passw_1",
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gmail.com",
        DOB:"22-01-1990",
    },
    {
        username:"user_2",
        password:"passw_2",
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        username:"user_3",
        password:"passw_3",
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gmsil.com",
        DOB:"21-03-1989",
    },
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
