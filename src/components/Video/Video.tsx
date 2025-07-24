import ButtonLink from '../ButtonLink/ButtonLink'
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
	myRef?: (el: HTMLDivElement | null) => void
}

const Video = ({ data, myRef }: VideoProps) => {
	return (
		<div className={styles.previewWrap} ref={myRef}>
			<img src={data.poster_url} alt={data.title} className={styles.poster} />
			<div className={styles.description}>
				<h2 className={styles.title}>{data.title}</h2>
				{!data.episodes ? (
					<p className={styles.duration}>
						Duration: <span>{data.duration}</span>
					</p>
				) : (
					<p className={styles.duration}>
						<span>{data.duration}</span>
						{Number(data.duration) > 1 ? ' seasons' : ' season'} | <span>{data.episodes}</span> episodes
					</p>
				)}
				<ButtonLink text='Watch now' href='#' stylesProps={styles.watchNow} />
			</div>
		</div>
	)
}

export default Video
