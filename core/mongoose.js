const conf = require('../mongoConf')
const mongoose = require('mongoose')

module.exports = () => {
    return mongoose.connect(conf.uri, conf.options, (err, data) => {
        if (err) {
            console.log('Can`t connect to mongoDB =(')
        } else {
            console.log('Connect to mongo success!')
        }
    })
}
