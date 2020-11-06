const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (req, res) => {
    const courses = await Course.getAll()
    res.render('courses.njk', {
        title: 'Courses',
        isCourses: true,
        items: courses
    })
})

module.exports = router