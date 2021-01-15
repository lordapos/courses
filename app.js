const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const helmet = require('helmet')
const compression = require('compression')
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
const profileRoutes = require('./routes/profile')
const notFoundRoutes = require('./routes/404')
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const errorHandler = require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys')

app.use(express.static(path.join(__dirname, 'public')));
app.use('/avatars', express.static(path.join(__dirname, 'avatars')));
app.use(express.urlencoded({extended: true}))

const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI,
})
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}))
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(helmet())
app.use(compression())
app.use(varMiddleware)
app.use(userMiddleware)
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/404', notFoundRoutes)
const env = nunjucks.configure(['views/'], {
    autoescape: true,
    express: app
})

app.use(errorHandler)

const PORT = process.env.PORT || 3000
async function start() {
    try {
        await  mongoose.connect(keys.MONGODB_URI, {
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

