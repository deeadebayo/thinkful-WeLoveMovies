const router = require('express').Router({ mergeParams: true })
const {
	listMovie,
	findMovie,
	listTheaters,
	listReviews,
} = require('./movies.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')

router.route('/').get(listMovie).all(methodNotAllowed)

router.route('/:movieId').get(findMovie).all(methodNotAllowed)

router.route('/:movieId/theaters').get(listTheaters).all(methodNotAllowed)

router.route('/:movieId/reviews').get(listReviews).all(methodNotAllowed)

module.exports = router
