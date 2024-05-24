# MERN_Library

Capstone project of my TXST  Fall 2023 Internet Software Development course. The capstone project is designed to “tie it all together,”  essentially a cumulative assignment incorporating all the skills and technologies learned and demonstrated in all the prior assignments. Used the knowledge to created a full-stack MERN application to track library books with the following properties: 
* ID
* Title
* Author
* Publisher
* ISBN
* Availability 
* Who checked it out
* Due date

## Description 

Once installed and executed the user will land on the home page and use the navigation bar to find and use the needed serviceS. If Books, Available, and Unavailable links are clicked the pages will automatically render their lists by books' ID and title. In the Add Book link the user must put in the info for all thr book inputs (ID, title, author, publisher, and isbn) before adding the book into the MongoDB database. Both Delete Book and Find Book links just needs user to input the book ID to do their respective services. In the Check-In/Out link, to check-in a book the user must input only the book ID and click the check-in button. But to check-out a book they must also input their name and due date (2 weeks from date) and click the check-out button. All Pages will either send their respective success messages or an error messages after user actions. 

## Getting Started

### Dependencies

* Cors
* React
* React-router-dom
* Express
* Dotenv
* Mongoose

### Installing

* Download zip file on GitHub
* Clone repository
* Fork repository

### Executing program

* Open the terminal and in the root directory run the command:
```
npm start
```

## Author

Aide Cuevas (LinkedIn in profile)

## Version History

* 0.2
    * Fixed the errors with the check-in/out
    * Add the ability to list of books in library, find details on a book, add a new book to the library, and delete a book from the library
* 0.1
    * Only able to list available/unavailable books and check-in/out books
    * Had errors when users tried to check-in/out books

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments 

Inspiration, code snippets, etc.
* Mr. Charles Rick King, TXST Internet Software Development - CS3320
* W3schools (https://www.w3schools.com/)
