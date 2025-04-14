import { UseQueryResult } from '@tanstack/react-query'
import styles from './VideoList.module.css'
import Video from '../../../../components/Video/Video'
import Channel from '../../../../components/Channel/Channel'

import { MoviesPreviews, SerialsPreviews } from '../../../../types//index'

interface VideoListProps<T> {
	title: string
	url?: string
	queryFunction: () => UseQueryResult<T[]>
	type: 'movies' | 'serials' | 'channels'
}

const VideoList = <T extends MoviesPreviews | SerialsPreviews>({
	title,
	url,
	queryFunction,
	type
}: VideoListProps<T>) => {
	const { data = [], error, isError } = queryFunction()

	return (
		<section className={styles.videosContainer}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title.replace(/\b\w/g, char => char.toUpperCase())}</h2>
				{url && <a className={styles.url} href={url}></a>}
			</div>
			<div className={styles.videos}>
				{isError && <div className={styles.error}>{error.message}</div>}

				{data.map(item => {
					if (type === 'movies') {
						return <Video key={item.id} data={item as MoviesPreviews} />
					}

					if (type === 'serials') {
						return <Video key={item.id} data={item as SerialsPreviews} />
					}

					if (type === 'channels') {
						return <Channel key={item.id} />
					}
				})}
			</div>
		</section>
	)
}

export default VideoList
