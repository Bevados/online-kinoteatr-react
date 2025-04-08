import Slider from './components/Slider/Slider'
import VideoList from './components/VideoList/VideoList'

import styles from './Home.module.css'

const Home = () => {
	return (
		<>
			<Slider />
			<div className={styles.videoWrap}>
				<VideoList type='new movies' />
			</div>
		</>
	)
}

export default Home
