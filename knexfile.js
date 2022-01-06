const path = require('path')

require('dotenv').config()

const {
	DATABASE_URL = 'postgres://kgyeolkf:iLfYjOgU9k3_7qv6VWGw209jdCyvvlWH@castor.db.elephantsql.com/kgyeolkf',
} = process.env

module.exports = {
	development: {
		client: 'postgresql',
		connection: DATABASE_URL,
		pool: { min: 0, max: 5 },
		migrations: {
			directory: path.join(__dirname, 'src', 'db', 'migrations'),
		},
		seeds: {
			directory: path.join(__dirname, 'src', 'db', 'seeds'),
		},
	},

	production: {
		client: 'postgresql',
		connection: DATABASE_URL,
		pool: { min: 0, max: 5 },
		migrations: {
			directory: path.join(__dirname, 'src', 'db', 'migrations'),
		},
		seeds: {
			directory: path.join(__dirname, 'src', 'db', 'seeds'),
		},
	},

	test: {
		client: 'sqlite3',
		connection: {
			filename: ':memory:',
		},
		migrations: {
			directory: path.join(__dirname, 'src', 'db', 'migrations'),
		},
		seeds: {
			directory: path.join(__dirname, 'src', 'db', 'seeds'),
		},
		useNullAsDefault: true,
	},
}
