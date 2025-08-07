import { useEffect, useState } from 'react'

import ButtonLink from '../ButtonLink/ButtonLink'
import PreviewProgram from './components/PreviewProgram/PreviewProgram'

import { Chanel } from '../../types'

import styles from './Channel.module.css'

interface ChannelProps {
	data: Chanel
	myRef?: (el: HTMLDivElement | null) => void
}

const Channel = ({ data, myRef }: ChannelProps) => {
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth <= 768)
		}

		handleResize()

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className={styles.previewWrap} ref={myRef}>
			<img src={data.nowFilmPoster} alt={data.showingNow} className={styles.poster} />
			<img src={data.logo} alt={data.name} className={styles.logo} />

			<PreviewProgram
				title={!isMobile ? 'Showing now' : 'Now'}
				programName={data.showingNow}
				customClass={styles.previewProgram}
			/>
			<PreviewProgram
				title={!isMobile ? 'Up next' : 'Next'}
				programName={data.upNext}
				customClass={styles.previewProgram}
			/>

			<div className={styles.descriptionWrap}>
				<p className={styles.description}>{data.description}</p>
				<ButtonLink text='Watch now' href='#' stylesProps={styles.watchNow} />
			</div>
		</div>
	)
}

export default Channel
