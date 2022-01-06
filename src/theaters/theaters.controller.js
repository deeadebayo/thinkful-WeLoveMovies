const service = require('./theaters.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

const list = async (req, res) => {
	const movieId = req.params.movie_id
	let data
	if (movieId) {
		data = await service.listTheatersByMovieId(movieId)
	} else {
		data = await service.list()
	}
	res.json({ data })
}

module.exports = {
	list: asyncErrorBoundary(list),
}
