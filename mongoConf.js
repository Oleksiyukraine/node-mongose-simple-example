module.exports = {
    uri: 'mongodb://localhost/test',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false, // Don't build indexes
        poolSize: 40, // Maintain up to 10 socket connections
        bufferMaxEntries: 0
    }
}
