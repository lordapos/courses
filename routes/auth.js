const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
    res.render('auth/login.njk', {
        title: 'Login',
        isLogin: true,
        error: req.flash('error')
    })
})

router.get('/register', (req, res) => {
    res.render('auth/register.njk', {
        title: 'Register',
        isLogin: true,
        error: req.flash('error')
    })
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            if (areSame) {
                const user = candidate
                req.session.user = user
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if (err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                req.flash('error', 'Wrong password!')
                res.redirect('/auth/login')
            }
        } else {
            req.flash('error', 'User with this email does not exist!')
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login')
    })
})

router.post('/register', async (req, res) => {
    try {
        const {email, password, repeat, name} = req.body
        const candidate = await User.findOne({ email })
        if (candidate) {
            req.flash('error', 'User with this email already exists!')
            res.redirect('/auth/register')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword, cart: {items: []}
            })
            await user.save()
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }
})

module.exports = router