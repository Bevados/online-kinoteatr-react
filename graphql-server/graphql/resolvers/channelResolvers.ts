import admin from 'firebase-admin'

export const channelResolvers = {
	Query: {
		channelPreviews: async (_parent: undefined, args: { filter?: { is_new?: boolean; is_recommended?: boolean } }) => {
			const { filter } = args
			const db = admin.firestore()
			const snapshot = await db.collection('program').get()

			const channels = snapshot.docs.map(doc => {
				const data = doc.data()
				return {
					id: doc.id,
					description: data.description,
					logo: data.logo,
					name: data.name,
					is_new: data.is_new,
					nowFilmPoster: data.nowFilmPoster,
					is_recommended: data.is_recommended,
					showingNow: data.showingNow,
					upNext: data.upNext
				}
			})

			if (!filter) {
				return channels
			}

			const wantNew = filter.is_new === true
			const wantRecommended = filter.is_recommended === true

			return channels.filter(chanel => (wantNew && chanel.is_new) || (wantRecommended && chanel.is_recommended))
		}
	}
}
