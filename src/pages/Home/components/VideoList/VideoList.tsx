import { useEffect, useRef, useState } from 'react'

import Video from '../../../../components/Video/Video'
import Channel from '../../../../components/Channel/Channel'

import { MoviePreviews, SerialPreviews, Chanel } from '../../../../types/index'

import styles from './VideoList.module.css'

interface VideoListProps {
	title: string
	url?: string
	data: (MoviePreviews | SerialPreviews | Chanel)[]
	type: 'movies' | 'serials' | 'channels'
	loading: boolean
}

const VideoList = ({ title, url, data, type, loading }: VideoListProps) => {
	const [widthVideoItem, setWidthVideoItem] = useState<number>(0)
	const [widthVideosBlock, setWidthVideosBlock] = useState<number>(0)
	const [widthVisibleVideosBlock, setWidthVisibleVideosBlock] = useState<number>(0)
	const [transformVideoContainer, setTransformVideoContainer] = useState<number>(0)

	const maxValueScrollVideosBlock = widthVideosBlock - widthVisibleVideosBlock

	const videoRef = useRef<HTMLDivElement | null>(null)
	const videosRef = useRef<HTMLDivElement | null>(null)

	// Расчет видимой и не видимой ширины блока с видео
	function calculateWidthVideosBlock() {
		if (videosRef.current) {
			requestAnimationFrame(() => {
				const children = Array.from(videosRef.current!.children) as HTMLElement[]
				const computedStyle = window.getComputedStyle(videosRef.current!)

				const gapValue = computedStyle.gap ? parseFloat(computedStyle.gap) : parseFloat(computedStyle.columnGap)

				const widthVisible = videosRef.current!.getBoundingClientRect().width

				let totalWidth = 0

				children.forEach(child => {
					totalWidth += child.getBoundingClientRect().width
				})

				totalWidth += gapValue * (children.length - 1)

				setWidthVideosBlock(totalWidth)
				setWidthVisibleVideosBlock(widthVisible)
			})
		}
	}

	// Рассчитать ширину элемента видео и установить его в состояние
	function calculateWidthVideoItem() {
		const width = videoRef.current?.offsetWidth
		setWidthVideoItem(width || 0)
	}

	// Отслеживание изменения ширины блока с видео и элемента видео
	useEffect(() => {
		if (!data.length) return

		const handleResize = () => {
			calculateWidthVideoItem()
			calculateWidthVideosBlock()
			setTransformVideoContainer(0)
		}

		// Используем ResizeObserver для отслеживания изменений размеров
		const resizeObserver = new ResizeObserver(handleResize)
		if (videosRef.current) {
			resizeObserver.observe(videosRef.current)
		}
		if (videoRef.current) {
			resizeObserver.observe(videoRef.current)
		}

		// Первоначальный расчёт
		handleResize()

		return () => {
			resizeObserver.disconnect()
		}
	}, [data])

	//Прокрутка блока с видео влево при нажатии на кнопку
	function handleLeafBack() {
		if (transformVideoContainer - widthVideoItem < 0) {
			setTransformVideoContainer(0)
		} else {
			setTransformVideoContainer(prev => prev - widthVideoItem)
		}
	}

	//Прокрутка блока с видео вправо при нажатии на кнопку
	function handleLeafAhead() {
		if (transformVideoContainer + widthVideoItem >= maxValueScrollVideosBlock) {
			setTransformVideoContainer(maxValueScrollVideosBlock)
		} else {
			setTransformVideoContainer(prev => prev + widthVideoItem)
		}
	}

	return (
		<section className={styles.videosContainer}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title.replace(/\b\w/g, char => char.toUpperCase())}</h2>
				{url && data.length > 0 && (
					<a className={styles.url} href={url}>
						View all
					</a>
				)}
			</div>

			<div className={styles.videosWrap}>
				<button
					data-hidden={transformVideoContainer <= 0}
					className={`${styles.leaf} ${styles.back}`}
					onClick={handleLeafBack}>
					Пролистать назад
				</button>

				<div className={styles.videosInner}>
					{!loading && data.length === 0 && (
						<p>{type === 'movies' ? 'Список фильмов сейчас не доступен' : 'Список сериалов сейчас не доступен'}</p>
					)}

					{data.length > 0 && (
						<div
							className={styles.videos}
							style={{
								transform: `translateX(-${transformVideoContainer}px)`,
								transition: 'transform 0.5s ease'
							}}
							ref={videosRef}>
							{data.map((item, index) => {
								if (type === 'movies') {
									return (
										<Video
											key={item.id}
											data={item as MoviePreviews}
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
											data={item as SerialPreviews}
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
									return (
										<Channel
											key={item.id}
											data={item as Chanel}
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
							})}
						</div>
					)}
				</div>

				<button
					data-hidden={transformVideoContainer >= widthVideosBlock - widthVisibleVideosBlock}
					className={`${styles.leaf} ${styles.ahead}`}
					onClick={handleLeafAhead}>
					Пролистать вперед
				</button>
			</div>
		</section>
	)
}

export default VideoList
