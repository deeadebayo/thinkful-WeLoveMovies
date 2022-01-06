const service = require('./reviews.service')
const boundary = require('../errors/asyncErrorBoundary')

const reviewExists = async (req, res, next) => {
	const { reviewId } = req.params
	const review = await service.read(reviewId)
	if (review) {
		res.locals.review = review
		return next()
	}
	return next({ status: 404, message: `Review cannot be found.` })
}

const update = async (req, res) => {
	const { reviewId } = req.params

	await service.update(reviewId, req.body.data)
	res.json({ data: await service.getUpdatedRecord(reviewId) })
}

const destroy = async (req, res) => {
	const { reviewId } = req.params

	await service.delete(reviewId)
	res.sendStatus(204)
}

module.exports = {
	update: [boundary(reviewExists), boundary(update)],
	delete: [boundary(reviewExists), boundary(destroy)],
}
