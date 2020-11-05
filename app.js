const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const sassMiddleware = require('node-sass-middleware')

app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'assets/scss'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/css'
}))

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