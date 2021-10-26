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

app.get('/style', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/styles.css'))
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex(studentName => studentName === name)

    if(index === -1 && name !== ''){
        students.push(name)
        rollbar.log('student added successfully', {author: 'Emmanuel', type: 'manual entry'})
        res.status(200).send(students)
    } else if(name === ''){
        rollbar.error('No name given')
        res.status(400).send('Must provide a name')
    } else {
        rollbar.critical('Student already exists')
        res.status(400).send('That student already exists')
    }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Jump to hyperspace via port ${port}`))