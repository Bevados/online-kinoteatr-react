import { gql } from 'apollo-server'

export const serialTypeDefs = gql`
	type SerialPreview {
		id: ID!
		title: String!
		poster_url: String!
		duration: String!
		episodes: Int!
	}

	type Query {
		serialPreviews: [SerialPreview!]!
	}
`
