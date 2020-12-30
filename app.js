const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const nunjucks = require('nunjucks')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const app = express()
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const cardRoutes = require('./routes/card')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')

const MONGODB_URI = 'mongodb+srv://cyber:QU4EXHZEwVxFp6j4@courses.op53b.mongodb.net/shop'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))

const store = new MongoStore({
    collection: 'sessions',
    uri: MONGODB_URI,
})
app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(varMiddleware)
app.use(userMiddleware)
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
const env = nunjucks.configure(['views/'], {
    autoescape: true,
    express: app
})


const PORT = process.env.PORT || 3000

async function start() {
    try {
        await  mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }

}

start()

