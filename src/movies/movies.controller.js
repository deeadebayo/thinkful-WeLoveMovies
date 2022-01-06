const service = require('./movies.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

const movieExists = async (req, res, next) => {
	const { movieId } = req.params
	const movie = await service.findMovie(movieId)
	if (movie) {
		res.locals.movie = movie
		return next()
	}
	return next({ status: 404, message: `Movie cannot be found.` })
}

const list = async (req, res, next) => {
	const isShowing = req.query.is_showing
	if (isShowing) {
		res.json({ data: await service.listShowingMovies() })
	} else {
		res.json({ data: await service.list() })
	}
}

const findMovie = async (req, res, next) => res.json({ data: res.locals.movie })

const listTheaters = async (req, res, next) => {
	const { movieId } = req.params
	res.json({ data: await service.listTheaters(movieId) })
}

const listReviews = async (req, res, next) => {
	const { movieId } = req.params
	res.json({ data: await service.listReviews(movieId) })
}

module.exports = {
	listMovie: asyncErrorBoundary(list),
	findMovie: [asyncErrorBoundary(movieExists), findMovie],
	listTheaters: [
		asyncErrorBoundary(movieExists),
		asyncErrorBoundary(listTheaters),
	],
	listReviews: [
		asyncErrorBoundary(movieExists),
		asyncErrorBoundary(listReviews),
	],
}
