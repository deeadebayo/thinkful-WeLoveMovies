if (process.env.USER) require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const moviesRouter = require('./movies/movies.router')
const theatersRouter = require('./theaters/theaters.router')
const reviewsRouter = require('./reviews/reviews.router')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/movies', moviesRouter)
app.use('/theaters', theatersRouter)
app.use('/reviews', reviewsRouter)

// Not found handler
app.use((req, res, next) =>
	next({ status: 404, message: `Not found: ${req.originalUrl}` })
)

// Error handler
app.use((error, req, res, next) => {
	const { status = 405, message = 'Something went wrong!' } = error
	res.status(status).json({ error: message })
})

module.exports = app
