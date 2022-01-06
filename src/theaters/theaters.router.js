const router = require('express').Router({ mergeParams: true })
const { list } = require('./theaters.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')

router.route('/').get(list).all(methodNotAllowed)

module.exports = router
