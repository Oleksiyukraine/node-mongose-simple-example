const port = 3001;
const express = require('express')
const app = express()
require('./core/mongoose')();
const user = require('./models/user')

app.get('/', (req, res) => {
    user.find().exec().then((users) => {
        res.send(users);
    })
})

app.get('/:id', (req, res) => {
    user.find(req.params.id).exec().then((user) => {
        res.send(user);
    })
})

app.listen(port,  () => {
    console.log('----------------------------------------------');
    console.log('');
    console.log(`Server start at port : ${port}`);
    console.log(`Server start at: `, new Date() + 2);
    console.log('');
    console.log('----------------------------------------------');
})