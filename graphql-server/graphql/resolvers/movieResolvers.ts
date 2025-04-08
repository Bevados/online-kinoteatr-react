import admin from 'firebase-admin'

export const movieResolvers = {
	Query: {
		moviePreviews: async () => {
			const db = admin.firestore()
			const snapshot = await db.collection('movies').get()

			return snapshot.docs.map(doc => {
				const data = doc.data()
				return {
					id: doc.id,
					title: data.title,
					poster_url: data.poster_url
				}
			})
		}
	}
}

