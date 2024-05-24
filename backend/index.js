const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const book = require("./models/Book");

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGOOSE_URL = process.env.MONGOOSE_URL;

mongoose.connect(MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.get('/books', async(req, res) => {
    try{
        const final = [];

        const list = await book.find();
        const len = list.length;

        for (var i = 0; i < len; i++){
            const a = list[i].id;
            const b = list[i].title;
            const obj = {id: a, title: b};
            final.push(obj);
        }

        //console.log("listed objects:", final);works 
        return res.status(200).json(final);
    }catch(err){
        console.error("Error when calling unavailable list: ", err);
        return res.status(500).json({error: "Internal server error"});
    }
});

app.get('/unavail', async(req, res) =>{
    try{
        const final = [];

        const list = await book.find({avail: false});
        const len = list.length;

        for (var i = 0; i < len; i++){
            const a = list[i].id;
            const b = list[i].title;
            const obj = {id: a, title: b};
            final.push(obj);
        }

        //console.log("listed objects:", final);works 
        return res.status(200).json(final);
    }catch(err){
        console.error("Error when calling unavailable list: ", err);
        return res.status(500).json({error: "Internal server error"});
    }
});

app.get('/avail', async(req, res) =>{
    try{
        const final = [];

        const list = await book.find({avail: true});
        const len = list.length;

        for(var i = 0; i < len; i++){
            const a = list[i].id;
            const b = list[i].title;
            const obj = {id: a, title: b};
            final.push(obj);
        }

        return res.status(200).json(final);
    }catch(err){
        console.error("Error when calling available list: ", err);
        return res.status(500).json({error: "Internal server error"});
    }
});

app.put('/check_in/books/:id', async(req, res) =>{
    const bookId = req.params.id;
    try{
        const change = await book.findOneAndUpdate(
            {id: bookId},
            req.body,
            {new:true}
        );

        console.log(change);
        if (change){
            return res.status(200).json({ message: "Book checked in!" });
        }else{
            return res.status(404).json({ error: "Book not in system" });
        }
    }catch(err){
        console.error("Error when checking in book: ", err);
        return res.status(500).json({error: "Internal server error"});
    }
});

app.put('/check_out/books/:id', async(req, res) =>{
    const bookId = req.params.id;

    try{
        const change = await book.findOneAndUpdate(
            {id: bookId}, 
            req.body,
            {new: true}
        );

        console.log("Checked out book: ", change);
        if (change){
            return res.status(200).json({ message: "Book checked out!" });
        }else{
            return res.status(404).json({ error: "Book not in system" });
        }
    }catch(err){
        console.error("Error when checking out book: ", err);
        return res.status(500).json({error: "Internal server error"});
    }
});

app.post('/add_book', async (req, res) => {
    const { id, title, author, publisher, isbn } = req.body;

    try {
        const answer = await book.findOne({ id: id });

        console.log("Answer: ", answer);

        if (answer) {
            return res.status(403).json({ error: "Book with ID already exists in the library!" });
        }

        const result = await book.create({
            id: id,
            title: title,
            author: author,
            publisher: publisher,
            isbn: isbn,
            avail: true,
            who: "",
            due: ""
        });

        console.log("New book added: ", result);

        return res.status(201).json({ message: "Book was added to the library!" });
    } catch (err) {
        console.error("Add Book error: ", err);
        return res.status(500).json({ error: "Error when trying to add book" });
    }
});


app.delete('/delete_book/:id', async(req, res) => {
    const bookId = req.params.id;
    try{
        const result = await book.findOneAndDelete({id: bookId});
        console.log("Book Deleted");

        if (result){
            return res.status(200).json({message: "Book was deleted!"});
        }else{
            return res.status(204).json({error: "Book wasn't deleted!"});
        }
    }catch(err){
        console.error("Delete book error: ", err);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

app.get('/find_book/:id', async(req, res) => {
    const bookId = req.params.id;

    try{
        const result = await book.findOne({id: bookId});

        console.log("Book found: ", result);

        if (result){
            return res.status(200).json(result);
        }else{
            return res.status(404).json({error: "Book not found in library!"})
        }
    }catch(err){
        console.error("Find book error: ", err);
        return res.status(500).json({error: "Internal Server error"});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});