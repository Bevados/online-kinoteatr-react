import { gql } from 'apollo-server'

export const serialTypeDefs = gql`
	type SerialPreview {
		id: ID!
		title: String!
		poster_url: String!
		duration: String!
		episodes: Int!
		is_popular: Boolean
		is_new: Boolean
	}

	input SerialFilter {
		is_popular: Boolean
		is_new: Boolean
	}

	type Query {
		serialPreviews(filter: SerialFilter): [SerialPreview!]!
	}
`
