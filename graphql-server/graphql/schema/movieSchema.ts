import { gql } from 'apollo-server'

export const movieTypeDefs = gql`
	type MoviePreview {
		id: ID!
		title: String!
		poster_url: String!
		duration: String!
	}

	type Query {
		moviePreviews: [MoviePreview!]!
	}
`