import admin from 'firebase-admin'

export const serialResolvers = {
	Query: {
		serialPreviews: async () => {
			const db = admin.firestore()
			const snapshot = await db.collection('serials').get()

			return snapshot.docs.map(doc => {
				const data = doc.data()
				return {
					id: doc.id,
					title: data.title,
					poster_url: data.poster_url,
					duration: data.duration,
					episodes: data.episodes
				}
			})
		}
	}
}
