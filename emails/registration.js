const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'You have successfully created an account',
        html: `
            <h1>Welcome to courses.cyber-lords</h1>
            <p>You have successfully created an account - ${email}</p>
            <hr />
            <a href="http://courses.cyber-lords.com/">SHOP</a>
        `
    }
}