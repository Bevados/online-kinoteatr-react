import { gql } from 'apollo-server'

export const movieTypeDefs = gql`
	type MoviePreview {
		id: ID!
		title: String!
		poster_url: String!
		duration: String!
		is_popular: Boolean
		is_new: Boolean
	}

	input MovieFilter {
		is_popular: Boolean
		is_new: Boolean
	}

	type Query {
		moviePreviews(filter: MovieFilter): [MoviePreview!]!
	}
`
