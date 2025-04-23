import { useEffect, useRef, useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

import Video from '../../../../components/Video/Video'
import Channel from '../../../../components/Channel/Channel'

import { MoviesPreviews, SerialsPreviews } from '../../../../types//index'

import styles from './VideoList.module.css'

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
	const [widthVideoItem, setWidthVideoItem] = useState<number>(0)
	const videoRef = useRef<HTMLDivElement | null>(null)

	const { data = [], error, isError } = queryFunction()

	// Calculate the width of the video item
	// and set it to the state
	function calculateWidthVideoItem() {
		const width = videoRef.current?.offsetWidth
		setWidthVideoItem(width || 0)
	}

	// Set the width of the video item
	useEffect(() => {
		if (!data.length) return

		calculateWidthVideoItem()

		window.addEventListener('resize', calculateWidthVideoItem)
		return () => {
			window.removeEventListener('resize', calculateWidthVideoItem)
		}
	}, [data])


	
	function handleLeafBack() {}
	function handleLeafAhead() {}

	return (
		<section className={styles.videosContainer}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title.replace(/\b\w/g, char => char.toUpperCase())}</h2>
				{url && (
					<a className={styles.url} href={url}>
						View all
					</a>
				)}
			</div>
			<div className={styles.videosWrap}>
				{isError && <div className={styles.error}>{error.message}</div>}

				<button className={`${styles.leaf} ${styles.back}`} onClick={handleLeafBack}>
					Пролистать назад
				</button>
				<div className={styles.videos}>
					{data.map((item, index) => {
						if (type === 'movies') {
							return (
								<Video
									key={item.id}
									data={item as MoviesPreviews}
									myRef={
										index === 0
											? (el: HTMLDivElement | null) => {
													videoRef.current = el
											  }
											: undefined
									}
								/>
							)
						}

						if (type === 'serials') {
							return (
								<Video
									key={item.id}
									data={item as SerialsPreviews}
									myRef={
										index === 0
											? (el: HTMLDivElement | null) => {
													videoRef.current = el
											  }
											: undefined
									}
								/>
							)
						}

						if (type === 'channels') {
							return <Channel key={item.id} />
						}
					})}
					<button className={`${styles.leaf} ${styles.ahead}`} onClick={handleLeafAhead}>
						Пролистать вперед
					</button>
				</div>
			</div>
		</section>
	)
}

export default VideoList
