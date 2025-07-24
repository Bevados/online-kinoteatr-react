import Slider from './components/Slider/Slider'
import VideoList from './components/VideoList/VideoList'

import { ChanelPreview, MoviePreviews, SerialPreviews } from '../../types/index'

import { useMoviePreviews } from '../../hooks/useMoviePreviews'
import { useSerialPreviews } from '../../hooks/useSerialPreviews'
import { useChannelPreviews } from '../../hooks/useChannelPreviews'

import styles from './Home.module.css'


const Home = () => {

	// Делаю запросы для получения превью фильмов и сериалов
	const { data: dataMoviesPrev = [], isError: movieIsError, error: movieError } = useMoviePreviews()
	const { data: dataSerialsPrev = [], isError: serialIsError, error: serialError } = useSerialPreviews()
	const { data: dataChanelPrev = [], isError: chanelIsError, error: chanelError } = useChannelPreviews()

	// Фильтрую данные для получения новых и популярных фильмов и серилов
	const newMovies = dataMoviesPrev.filter((movie: MoviePreviews) => movie.is_new)
	const popularMovies = dataMoviesPrev.filter((movie: MoviePreviews) => movie.is_popular)
	const newSerials = dataSerialsPrev.filter((serial: SerialPreviews) => serial.is_new)
	const popularSerials = dataSerialsPrev.filter((serial: SerialPreviews) => serial.is_popular)
	const newChanels = dataChanelPrev.filter((chanel: ChanelPreview) => chanel.is_new)
	const popularChanels = dataChanelPrev.filter((chanel: ChanelPreview) => chanel.is_recommended)



	// Блок с ошибкой
	const movieErrorBlock = <div className={styles.error}>{movieError?.message ?? <p>Произошла ошибка</p>}</div>
	const serialErrorBlock = <div className={styles.error}>{serialError?.message ?? <p>Произошла ошибка</p>}</div>
	const chanelErrorBlock = <div className={styles.error}>{chanelError?.message ?? <p>Произошла ошибка</p>}</div>

	console.log(newChanels, popularChanels, chanelErrorBlock, chanelIsError)

	return (
		<>
			<Slider />
			<div className={styles.videoWrap}>
				{!movieIsError && newMovies.length > 0 ? (
					<VideoList title='new movies' type='movies' url='#' data={newMovies} />
				) : (
					movieErrorBlock
				)}

				{!movieIsError && popularMovies.length > 0 ? (
					<VideoList title='popular movies' type='movies' url='#' data={popularMovies} />
				) : (
					movieErrorBlock
				)}

				{!serialIsError && newSerials.length > 0 ? (
					<VideoList title='new serials' type='serials' url='#' data={newSerials} />
				) : (
					serialErrorBlock
				)}

				{!serialIsError && popularSerials.length > 0 ? (
					<VideoList title='popular serials' type='serials' url='#' data={popularSerials} />
				) : (
					serialErrorBlock
				)}

				{/* <VideoList title='new serials' type='movies' url='#' />

				<VideoList title='channel' type='channels' url='#' /> */}
			</div>
		</>
	)
}

export default Home
