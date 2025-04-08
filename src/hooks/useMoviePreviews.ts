// useMoviePreviews.ts
import { useQuery } from '@tanstack/react-query'
import { gql } from '@apollo/client'
import client from '../apolloClient'

const GET_MOVIE_PREVIEWS = gql`
	query GetMoviePreviews {
		moviePreviews {
			id
			title
			poster_url
		}
	}
`

const fetchMovies = async () => {
	const { data } = await client.query({
		query: GET_MOVIE_PREVIEWS
	})
	return data.moviePreviews // Возвращаем только нужные данные
}

export const useMoviePreviews = () => {
	return useQuery({ queryKey: ['moviePreviews'], queryFn: fetchMovies })
}
