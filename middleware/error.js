module.exports = function(req, res, next) {
  res.status(404).redirect('/404')
  next()
}