import admin from 'firebase-admin'

export const movieResolvers = {
	Query: {
		moviePreviews: async (_parent: undefined, args: { filter?: { is_popular?: boolean; is_new?: boolean } }) => {
			const { filter } = args
			const db = admin.firestore()
			const snapshot = await db.collection('movies').get()

			const movies = snapshot.docs.map(doc => {
				const data = doc.data()
				return {
					id: doc.id,
					title: data.title,
					poster_url: data.poster_url,
					duration: data.duration,
					is_popular: data.is_popular,
					is_new: data.is_new
				}
			})

			if (!filter) {
				return movies
			}

			const wantPopular = filter.is_popular === true
			const wantNew = filter.is_new === true

			return movies.filter(movie => (wantPopular && movie.is_popular) || (wantNew && movie.is_new))
		}
	}
}
