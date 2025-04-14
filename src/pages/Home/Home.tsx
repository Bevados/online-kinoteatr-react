import Slider from './components/Slider/Slider'
import VideoList from './components/VideoList/VideoList'

import { MoviesPreviews, SerialsPreviews } from '../../types/index'

import { useMoviePreviews } from '../../hooks/useMoviePreviews'
import { useSerialPreviews } from '../../hooks/useSerialPreviews'


import styles from './Home.module.css'

const Home = () => {
	return (
		<>
			<Slider />
			<div className={styles.videoWrap}>
				<VideoList<MoviesPreviews>
					title='new movies'
					queryFunction={useMoviePreviews}
					type='movies'
				/>

				<VideoList<SerialsPreviews>
					title='new serials'
					queryFunction={useSerialPreviews}
					type='movies'
				/>
			</div>
		</>
	)
}

export default Home
