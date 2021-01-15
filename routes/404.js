const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('404.njk', {
        title: '404 page not found',
    })
})

module.exports = router