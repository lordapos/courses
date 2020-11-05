const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('home.njk', {
        title: 'Cyber Shop',
        isHome: true,
    })
})

module.exports = router