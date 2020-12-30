const {Router} = require('express')
const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login.njk', {
        title: 'Authentication',
        isLogin: true,
    })
})

module.exports = router