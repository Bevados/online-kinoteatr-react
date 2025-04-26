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
	const [widthVideosBlock, setWidthVideosBlock] = useState<number>(0)
	const [widthVisibleVideosBlock, setWidthVisibleVideosBlock] = useState<number>(0)
	const [transformVideoContainer, setTransformVideoContainer] = useState<number>(0)

	// console.log(widthVideosBlock)

	const videoRef = useRef<HTMLDivElement | null>(null)
	const videosRef = useRef<HTMLDivElement | null>(null)

	const { data = [], error, isError } = queryFunction()

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
		if (transformVideoContainer + widthVideoItem >= widthVideosBlock - widthVisibleVideosBlock) {
			setTransformVideoContainer(widthVideosBlock - widthVisibleVideosBlock)
		} else {
			setTransformVideoContainer(prev => prev + widthVideoItem)
		}
	}

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

				<button
					className={`${styles.leaf} ${styles.back}`}
					onClick={handleLeafBack}
					disabled={transformVideoContainer <= 0}>
					Пролистать назад
				</button>

				<div className={styles.videosInner}>
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
					</div>
				</div>

				<button
					className={`${styles.leaf} ${styles.ahead}`}
					onClick={handleLeafAhead}
					disabled={transformVideoContainer >= widthVideosBlock - widthVisibleVideosBlock}>
					Пролистать вперед
				</button>
			</div>
		</section>
	)
}

export default VideoList
