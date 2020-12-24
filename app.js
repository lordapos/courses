const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoutes = require('./routes/card')
const User = require('./models/user')

app.use(async (req, res, next) => {
    try {
        const user = await User.findById('5fe492bc4e88e70b247e7a22')
        req.user = user
        next()
    } catch (e) {
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
const env = nunjucks.configure(['views/'], {
    autoescape: true,
    express: app
});

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://cyber:QU4EXHZEwVxFp6j4@courses.op53b.mongodb.net/shop'
        await  mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        const candidate = await User.findOne()
        if (!candidate) {
            const user = new User({
                email: 'test@gmail.com',
                name: 'Rob',
                cart: {items: []}
            })
            await user.save()
        }
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}

start()

