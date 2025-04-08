import { useQuery } from '@tanstack/react-query'
import styles from './VideoList.module.css'
import { fetchMovies } from '../../../../services/fetchData'


interface VideoListProps {
	type: 'recommended channels' | 'new channels' | 'new movies' | 'popular movies' | 'popular serials'
	url?: string
}

const VideoList = ({ type, url }: VideoListProps) => {


	const { data } = useQuery({
		queryKey: ['movies'],
		queryFn: fetchMovies
	})


	console.log(data);

	return (
		<section className={styles.videosContainer}>
			<div className={styles.header}>
				<h2 className={styles.title}>{type.replace(/\b\w/g, char => char.toUpperCase())}</h2>
				{url && <a className={styles.url} href={url}></a>}
			</div>
			<div className={styles.videos}></div>
		</section>
	)
}

export default VideoList
