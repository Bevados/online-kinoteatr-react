export interface Movies {
	id: string
	actors: string[]
	description: string
	duration: string
	genres: string[]
	is_featured: boolean
	is_new: boolean
	is_popular: boolean
	poster_url: string
	raiting: number
	release_date: string
	title: string
}
export interface Serials {
	id: string
	actors: string[]
	description: string
	duration: string
	genres: string[]
	is_featured: boolean
	is_new: boolean
	is_popular: boolean
	poster_url: string
	raiting: number
	release_date: string
	title: string
	episodes: number
}

export interface MoviePreviews {
	id: string
	duration: string
	poster_url: string
	title: string
	is_new: boolean
	is_popular: boolean
}

export interface SerialPreviews {
	id: string
	duration: string
	episodes: number
	title: string
	poster_url: string
	is_new: boolean
	is_popular: boolean
}

export interface Chanel {
	id: string
	description: string
	logo: string
	name: string
	is_new: boolean
	nowFilmPoster: string
	is_recommended: boolean
	showingNow: string
	upNext: string
}
