const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;


// where we will keep the todos (will simulate db)
let todos = [        
// {
//     "todo":"walk dog",
//     "completed": false,
//     "id": 1019293
// },
// {
//     "todo":"laundry",
//     "completed": true,
//     "id": 339393
// }
];

app.use(cors())

// configure body parser middleware
// body-parse will grab HTTP body, decode the info and append it to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add todo to the todos list (post request)
app.post('/todo', (req, res) => {
    const todo = req.body; // body info from form
    console.log(todo)

    todos.push(todo)
    res.send('Todo was added to the database')
})

// read all todos
app.get('/todos', (req, res) => {
    res.json(todos)
})

// read single todo by id
app.get('/todo/:id', (req, res) => {
    // reading id from the url
    const id = req.params.id;
    console.log('ID', id)

    // searching for todos for id
    for (let todo of todos) {
        if(todo.id === id) {
            res.json(todo)
            return
        }
    }
   
    // send 404 if id is not found
    res.status(404).send('Todo not found!')
})

// delete single todo by id
app.delete('/todo/:id', (req, res) => {
    // reading id from url
    const id = req.params.id;

    // remove todo from the todos array
    todos = todos.filter(todo => {
        // console.log(todo.id)
        // console.log(id)
        if(todo.id !== id) {
            return true
        }
        return false
    })

    console.log("UPDATE AFTER DELETE:", todos)
    res.send('Todo is deleted')
})
// delete multiple todos (in an array)
app.delete('', (req, res) => {
    // delete an array of todos
})

// edit/update todo
app.post('/todo/:id', (req, res) => {
    // res.send('Todo has been edited!')
})

app.listen(port, () => console.log(`Todo app listening at port ${port}!`))