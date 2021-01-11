const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'Reset password',
        html: `
            <h1>Forgot your password?</h1>
            <p>If not, then ignore this letter.</p>
            <p>Otherwise follow the link below</p>
            <a href="${keys.BASE_URL}/auth/password/${token}">Restore access</a>
            <hr />
            <a href="${keys.BASE_URL}">SHOP</a>
        `
    }
}