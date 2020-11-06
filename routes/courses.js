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

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id)
    res.render('single-course.njk', {
        title: `Course: ${course.title}`,
        course
    })
})

module.exports = router