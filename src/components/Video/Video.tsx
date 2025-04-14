import styles from './Video.module.css'

interface VideoBaseProps {
	id: string
	poster_url: string
	title: string
	duration: string
}

interface MovieProps extends VideoBaseProps {
	episodes?: never
}

interface SerialProps extends VideoBaseProps {
	episodes: number
}

type VideoData = MovieProps | SerialProps

interface VideoProps {
	data: VideoData
}

const Video = ({ data }: VideoProps) => {
	return (
		<div className={styles.wrap}>
			<img src={data.poster_url} alt={data.title} className={styles.poster} />
			<div className={styles.description}>
				<h2 className={styles.title}>{data.title}</h2>
				{!data.episodes ? (
					<p className={styles.duration}>{`Duration: ${data.duration}`}</p>
				) : (
					<p>{`${data.duration} | ${data.episodes}`}</p>
				)}
			</div>
		</div>
	)
}

export default Video
