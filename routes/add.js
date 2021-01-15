const {Router} = require('express')
const {validationResult} = require('express-validator')
const Course = require('../models/course')
const auth = require('../middleware/auth')
const {courseValidators} = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('add-course.njk', {
        title: 'Add Course',
        isAddCourse: true,
    })
})

router.post('/', auth, courseValidators, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).render('add-course.njk', {
            title: 'Add Course',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                title: req.body.title,
                price: req.body.price,
            }
        })
    }

    const course = new Course({
        title: req.body.title,
        price: req.body.price,
        img: '/' + req.file.path,
        userId: req.user
    })

    try {
        await course.save()
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

module.exports = router