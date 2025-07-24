import { gql } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'
import client from '../apolloClient'

const GET_MOVIE_PREVIEWS = gql`
	query GetMoviePreviews($filter: MovieFilter) {
		moviePreviews(filter: $filter) {
			id
			title
			poster_url
			duration
			is_popular
			is_new
		}
	}
`

const fetchMovies = async () => {
	const { data } = await client.query({
		query: GET_MOVIE_PREVIEWS,
		variables: {
			filter: {
				is_popular: true,
				is_new: true
			}
		}
	})
	return data.moviePreviews
}

export const useMoviePreviews = () => {
	return useQuery({
		queryKey: ['moviePreviews', { is_popular: true, is_new: true }],
		queryFn: fetchMovies
	})
}
