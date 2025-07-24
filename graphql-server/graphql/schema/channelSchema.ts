import { gql } from 'apollo-server'

export const channelTypeDefs = gql`
	type ChannelPreview {
		id: ID!
		description: String!
		logo: String!
		name: String!
		is_new: Boolean
		nowFilmPoster: String!
		is_recommended: Boolean
		showingNow: String!
		upNext: String!
	}

	input ChannelFilter {
		is_new: Boolean
		is_recommended: Boolean
	}

	type Query {
		channelPreviews(filter: ChannelFilter): [ChannelPreview!]!
	}
`
