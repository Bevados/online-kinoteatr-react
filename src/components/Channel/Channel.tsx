import ButtonLink from '../ButtonLink/ButtonLink'

import { Chanel } from '../../types'
import styles from './Channel.module.css'
import PreviewProgram from './components/PreviewProgram/PreviewProgram'

interface ChannelProps {
	data: Chanel
	myRef?: (el: HTMLDivElement | null) => void
}

const Channel = ({ data, myRef }: ChannelProps) => {
	return (
		<div className={styles.previewWrap} ref={myRef}>
			<img src={data.nowFilmPoster} alt={data.showingNow} />
			<img src={data.logo} alt={data.name} />

			<PreviewProgram title='Showing now' programName={data.showingNow} />
			<PreviewProgram title='Up next' programName={data.upNext} />

			<div className={styles.descriptionWrap}>
				<p className={styles.description}>{data.description}</p>
				<ButtonLink text='Watch now' href='#' stylesProps={styles.watchNow} />
			</div>
		</div>
	)
}

export default Channel
