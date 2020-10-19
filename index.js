const port = 3001;
const path = require('path')
const express = require('express')
const app = express()
const formidable = require('formidable');
require('./core/mongoose')();
const user = require('./models/user')
const fs = require('fs');
const throttle = require('express-throttle-bandwidth')
const folder = path.join(__dirname, 'files');

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128)) // throttling bandwidth

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

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

app.post('/upload', (req, res, next) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.uploadDir = folder
    form.parse(req, (err, fields, files) => {
        console.log('fields', fields)
        console.log('files', files)
        // console.log('\n-----------')
        // console.log('Fields', fields)
        // console.log('Received:', Object.keys(files))
        // console.log()
        if (err) {
            next(err);
            return;
        }
        res.json({ fields, files });
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
