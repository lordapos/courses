const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/login', (req, res) => {
    res.render('auth/login.njk', {
        title: 'Authentication',
        isLogin: true,
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5fe492bc4e88e70b247e7a22')
    req.session.user = user
    req.session.isAuthenticated = true
    req.session.save(err => {
        if (err) {
            throw err
        }
        res.redirect('/')
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

module.exports = router