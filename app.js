const express = require('express')
const path = require('path')
const nunjucks = require('nunjucks')
const app = express()

app.use(express.static(path.join(__dirname, 'public')));
const env = nunjucks.configure(['views/'], {
    autoescape: true,
    express: app
});

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('home.njk', {
        title: 'Cyber Shop',
        isHome: true,
    })
})

app.get('/courses', (req, res) => {
    res.render('courses.njk', {
        title: 'Courses',
        isCourses: true,
    })
})

app.get('/add', (req, res) => {
    res.render('add-course.njk', {
        title: 'Add Course',
        isAddCourse: true,
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})