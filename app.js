const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
const env = nunjucks.configure(['views/'], {
    autoescape: true,
    express: app
});

app.use(express.urlencoded({extended: true}))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})