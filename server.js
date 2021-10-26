const express = require('express')
const app = express()
const Rollbar = require('rollbar') // has to be capitalized because it's a Class

let rollbar = new Rollbar({
    accessToken: 'c21c563fcddd439ba8aa9a19924a686c',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Jump to hyperspace via port ${port}`))