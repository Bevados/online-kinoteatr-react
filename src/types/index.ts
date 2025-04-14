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

export interface MoviesPreviews {
	id: string
	duration: string
	poster_url: string
	title: string
}

export interface SerialsPreviews {
	id: string
	duration: string
	episodes: number
	title: string
	poster_url: string
}
