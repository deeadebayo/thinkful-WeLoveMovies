const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

const addCritic = mapProperties({
	critic_id: 'critic.critic_id',
	preferred_name: 'critic.preferred_name',
	surname: 'critic.surname',
	organization_name: 'critic.organization_name',
})

const update = (reviewId, updatedReview) =>
	knex('reviews')
		.select('*')
		.where({ review_id: reviewId })
		.update(updatedReview, '*')

const getUpdatedRecord = reviewId =>
	knex('reviews as r')
		.join('critics as c', 'r.critic_id', 'c.critic_id')
		.select('*')
		.where({ review_id: reviewId })
		.first()
		.then(result => {
			const updatedRecord = addCritic(result)
			updatedRecord.critic_id = updatedRecord.critic.critic_id
			return updatedRecord
		})

const read = reviewId =>
	knex('reviews as r').select('*').where({ review_id: reviewId }).first()

const destroy = reviewId => knex('reviews').where({ review_id: reviewId }).del()

module.exports = {
	update,
	getUpdatedRecord,
	read,
	delete: destroy,
}
