import { Chanel } from '../../types'
import styles from './Channel.module.css'

interface ChannelProps {
	data: Chanel,
	myRef?: (el: HTMLDivElement | null) => void
}

const Channel = ({ data, myRef }: ChannelProps) => {
	return (
		<div className={styles.previewWrap} ref={myRef}>
			<img src={data.nowFilmPoster} alt={data.name} />
			
		</div>
	)
}

export default Channel