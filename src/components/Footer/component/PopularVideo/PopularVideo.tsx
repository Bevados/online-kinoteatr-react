import { useEffect, useState } from 'react'

import { Movie } from '../../../../types'

import styles from './PopularVideo.module.css'

interface PopularVideoProps {
	title: string
	data: Movie[] | []
	isLoading?: boolean
	isError?: boolean
	error?: Error | null
}

const PopularVideo = ({ title, data, isLoading, isError, error }: PopularVideoProps) => {
	const [mobile, setMobile] = useState<boolean>(window.innerWidth <= 768)
	const [openList, setOpenList] = useState<boolean>(false)

	useEffect(() => {
		function handleResize() {
			setMobile(window.innerWidth <= 768)
			console.log(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className={styles.popularVideo}>
			<div className={styles.titleWrap}>
				<button
					className={styles.title}
					onClick={() => {
						setOpenList(prew => !prew)
					}}
					disabled={!mobile}>
					{title}
				</button>
				<span className={`${styles.icon} ${openList ? styles.active : ''}`}></span>
			</div>

			<div className={styles.listVideoWrap}>
				{isLoading && <p>Loading...</p>}
				{isError && <p>{error?.message || 'Произошла ошибка'}</p>}
				<ul className={`${styles.listVideo} ${mobile ? styles.mobileList : ''}`}>
					{data.map(({ id, title }) => (
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
