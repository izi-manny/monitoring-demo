const express = require('express')
const app = express()
const Rollbar = require('rollbar') // has to be capitalized because it's a Class

let rollbar = new Rollbar({
    accessToken: 'c21c563fcddd439ba8aa9a19924a686c',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const path = require('path')

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    students.push(name)
    rollbar.log('student added successfully', {author: 'Emmanuel', type: 'manual entry'})
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Jump to hyperspace via port ${port}`))