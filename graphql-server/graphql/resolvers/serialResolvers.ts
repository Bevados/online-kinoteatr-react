import admin from 'firebase-admin'

export const serialResolvers = {
	Query: {
		serialPreviews: async (_parent: undefined, args: { filter?: { is_popular?: boolean; is_new?: boolean } }) => {
			const { filter } = args
			const db = admin.firestore()
			const snapshot = await db.collection('serials').get()

			const serials = snapshot.docs.map(doc => {
				const data = doc.data()
				return {
					id: doc.id,
					title: data.title,
					poster_url: data.poster_url,
					duration: data.duration,
					episodes: data.episodes,
					is_popular: data.is_popular,
					is_new: data.is_new
				}
			})

			if (!filter) {
				return serials
			}

			const wantPopular = filter.is_popular === true
			const wantNew = filter.is_new === true

			return serials.filter(serial => (wantPopular && serial.is_popular) || (wantNew && serial.is_new))
		}
	}
}
