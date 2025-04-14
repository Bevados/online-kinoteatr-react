// useMoviePreviews.ts
import { useQuery } from '@tanstack/react-query'
import { gql } from '@apollo/client'
import client from '../apolloClient'

const GET_SERIAL_PREVIEWS = gql`
	query GetSerialPreviews {
		serialPreviews {
			id
			title
			poster_url
			duration
			episodes
		}
	}
`

const fetchSerials = async () => {
	const { data } = await client.query({
		query: GET_SERIAL_PREVIEWS
	})
	return data.serialPreviews
}

export const useSerialPreviews = () => {
	return useQuery({ queryKey: ['serialPreviews'], queryFn: fetchSerials })
}
