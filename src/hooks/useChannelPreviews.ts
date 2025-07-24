// useMoviePreviews.ts
import { useQuery } from '@tanstack/react-query'
import { gql } from '@apollo/client'
import client from '../apolloClient'

const GET_CHANNEL_PREVIEWS = gql`
	query GetChannelPreviews($filter: ChannelFilter) {
		channelPreviews(filter: $filter) {
			id
			description
			logo
			name
			is_new
			nowFilmPoster
			is_recommended
			showingNow
			upNext
		}
	}
`

const fetchChannel = async () => {
	const { data } = await client.query({
		query: GET_CHANNEL_PREVIEWS,
		variables: {
			filter: {
				is_new: true,
				is_recommended: true
			}
		}
	})
	return data.channelPreviews
}

export const useChannelPreviews = () => {
	return useQuery({ queryKey: ['channelPreviews', { is_new: true, is_recommended: true }], queryFn: fetchChannel })
}
