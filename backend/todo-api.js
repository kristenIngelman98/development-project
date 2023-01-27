const express = require('express');

const app = express();
const port = 8080;


// where we will keep the books (will simulate db)
let books = [        
{
    "todo":"walk dog",
    "completed": false,
    "id": 1019293
},
{
    "todo":"laundry",
    "completed": true,
    "id": 339393
},
{
    "todo":"grocery shop",
    "completed": false,
    "id": 392343
},
{
    "todo":"read ninja book",
    "completed": false,
    "id": 392341
},
{
    "todo":"run",
    "completed": false,
    "id": 392342
}];

app.post('/todo', (req, res) => {


    res.send('Todo was added to the database')
})

app.get('/todos', (req, res) => {
    res.json(books)
})

app.get('/todo/:id', (req, res) => {

})

// delete todo by id
app.delete('/todo/:id', (req, res) => {

})

// edit todo
app.post('/todo/:id', (req, res) => {


    res.send('Todo has been edited!')
})

app.listen(port, () => console.log(`Todo app listening at port ${port}!`))

