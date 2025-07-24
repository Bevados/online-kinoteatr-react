// useMoviePreviews.ts
import { useQuery } from '@tanstack/react-query'
import { gql } from '@apollo/client'
import client from '../apolloClient'

const GET_SERIAL_PREVIEWS = gql`
	query GetSerialPreviews($filter: SerialFilter) {
		serialPreviews(filter: $filter) {
			id
			title
			poster_url
			duration
			episodes
			is_popular
			is_new
		}
	}
`

const fetchSerials = async () => {
	const { data } = await client.query({
		query: GET_SERIAL_PREVIEWS,
		variables: {
			filter: {
				is_popular: true,
				is_new: true
			}
		}
	})
	return data.serialPreviews
}

export const useSerialPreviews = () => {
	return useQuery({ queryKey: ['serialPreviews', { is_popular: true, is_new: true }], queryFn: fetchSerials })
}
