import PreviewProgram from '../PreviewProgram/PreviewProgram'
import ButtonLink from '../../../ButtonLink/ButtonLink'

import { Chanel } from '../../../../types'

import styles from './CardContext.module.css'

interface CardContentProps {
	data: Chanel
	isMobile: boolean
}

const CardContent = ({ data, isMobile }: CardContentProps) => {
	return (
		<a href={`#channel-${data.name}`} className={styles.cardLink}>
			<img src={data.nowFilmPoster} alt={data.showingNow} className={styles.poster} />
			<img src={data.logo} alt={data.name} className={styles.logo} />

			<PreviewProgram
				title={!isMobile ? 'Showing now' : 'Now'}
				programName={data.showingNow}
				customClass={styles.previewProgram}
				positionTop='5'
			/>
			<PreviewProgram
				title={!isMobile ? 'Up next' : 'Next'}
				programName={data.upNext}
				customClass={styles.previewProgram}
				positionTop='15'
			/>
			<div className={styles.descriptionWrap}>
				<p className={styles.description}>{data.description}</p>
				<ButtonLink text='Watch now' href='#' stylesProps={styles.watchNow} />
			</div>
		</a>
	)
}

export default CardContent