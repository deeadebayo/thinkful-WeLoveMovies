const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

const addCritic = mapProperties({
	critic_id: 'critic.critic_id',
	preferred_name: 'critic.preferred_name',
	surname: 'critic.surname',
	organization_name: 'critic.organization_name',
})

const list = () => knex('movies').select('*')

const listShowingMovies = () =>
	knex('movies as m')
		.join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
		.select('m.*')
		.where({ 'mt.is_showing': true })
		.distinct('m.movie_id')

const findMovie = id =>
	knex('movies').select('*').where({ movie_id: id }).first()

const listTheaters = id =>
	knex('movies_theaters as mt')
		.join('theaters as t', 'mt.theater_id', 't.theater_id')
		.select('*')
		.where({ movie_id: id, is_showing: true })

const listReviews = id =>
	knex('movies as m')
		.join('reviews as r', 'm.movie_id', 'r.movie_id')
		.join('critics as c', 'c.critic_id', 'r.critic_id')
		.select('*')
		.where({ 'r.movie_id': id })
		.then(result => {
			const movieList = []
			result.forEach(item => {
				const criticObject = addCritic(item)
				movieList.push(criticObject)
			})
			return movieList
		})

module.exports = {
	list,
	listShowingMovies,
	findMovie,
	listTheaters,
	listReviews,
}
