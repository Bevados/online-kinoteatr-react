import { useEffect, useState } from 'react'

import { MoviesSerials } from '../../../../types'

import styles from './PopularVideo.module.css'

interface PopularVideoProps {
	title: string
	data: MoviesSerials[] | []
	isLoading?: boolean
	isError?: boolean
	error?: Error | null
	className?: string
	}

const PopularVideo = ({
	title,
	data,
	isLoading,
	isError,
	error,
	className,
}: PopularVideoProps) => {
	const [filtredData, setFiltredData] = useState<[] | MoviesSerials[]>([])
	const [mobile, setMobile] = useState<boolean>(window.innerWidth <= 950)
	const [openList, setOpenList] = useState<boolean>(false)

	useEffect(() => {
		function handleResize() {
			setMobile(window.innerWidth <= 950)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		setFiltredData(
			data
				.filter(item => item.is_popular)
				.sort((a, b) => b.raiting - a.raiting)
				.slice(0, 8)
		)
	}, [data])

	return (
		<div className={`${styles.popularVideo} ${className}`}>
			<button
				className={styles.title}
				onClick={() => {
					setOpenList(prew => !prew)
				}}
				disabled={!mobile}>
				<span>{title}</span>
				<span className={`${styles.icon} ${openList ? styles.iconActive : ''}`}></span>
			</button>

			<div className={`${styles.listVideoWrap} ${mobile ? styles.mobileList : ''} ${openList ? styles.listOpen : ''}`}>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error?.message || 'Произошла ошибка'}</p>}
				<ul className={`${styles.listVideo} `}>
					{filtredData.map(({ id, title }) => (
						<li key={id}>
							<a href='#'>{title}</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default PopularVideo
