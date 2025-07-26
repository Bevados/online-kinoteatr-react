import Slider from './components/Slider/Slider'
import VideoList from './components/VideoList/VideoList'

import { ChanelPreview, MoviePreviews, SerialPreviews } from '../../types/index'

import { useMoviePreviews } from '../../hooks/useMoviePreviews'
import { useSerialPreviews } from '../../hooks/useSerialPreviews'
import { useChannelPreviews } from '../../hooks/useChannelPreviews'

import styles from './Home.module.css'
import { useMemo } from 'react'

const Home = () => {
	// Делаю запросы для получения превью фильмов и сериалов
	const { data: dataMoviesPrev = [], isError: movieIsError, error: movieError } = useMoviePreviews()
	const { data: dataSerialsPrev = [], isError: serialIsError, error: serialError } = useSerialPreviews()
	const { data: dataChanelPrev = [], isError: chanelIsError, error: chanelError } = useChannelPreviews()

	// Фильтрую и мемоизирую данные для новых и популярных фильмов, сериалов и каналов
	const { newMovies, popularMovies } = useMemo(
		() => ({
			newMovies: dataMoviesPrev.filter((movie: MoviePreviews) => movie.is_new),
			popularMovies: dataMoviesPrev.filter((movie: MoviePreviews) => movie.is_popular)
		}),
		[dataMoviesPrev]
	)

	const { newSerials, popularSerials } = useMemo(
		() => ({
			newSerials: dataSerialsPrev.filter((serial: SerialPreviews) => serial.is_new),
			popularSerials: dataSerialsPrev.filter((serial: SerialPreviews) => serial.is_popular)
		}),
		[dataSerialsPrev]
	)

	const { newChanels, popularChanels } = useMemo(
		() => ({
			newChanels: dataChanelPrev.filter((chanel: ChanelPreview) => chanel.is_new),
			popularChanels: dataChanelPrev.filter((chanel: ChanelPreview) => chanel.is_recommended)
		}),
		[dataChanelPrev]
	)

	// Блок с ошибкой
	const movieErrorBlock = (
		<div className={styles.error}>{movieError?.message ?? <p>Произошла ошибка загрузки фильмов</p>}</div>
	)
	const serialErrorBlock = (
		<div className={styles.error}>{serialError?.message ?? <p>Произошла ошибка загрузки сериалов</p>}</div>
	)
	const chanelErrorBlock = <div className={styles.error}>{chanelError?.message ?? <p>Произошла ошибка каналов</p>}</div>

	console.log(newChanels, popularChanels, chanelErrorBlock, chanelIsError)

	return (
		<>
			<Slider />
			<div className={styles.videoWrap}>
				{movieIsError
					? movieErrorBlock
					: newMovies.length > 0 && <VideoList title='new movies' type='movies' url='#' data={newMovies} />}

				{movieIsError
					? movieErrorBlock
					: popularMovies.length > 0 && <VideoList title='popular movies' type='movies' url='#' data={popularMovies} />}

				{serialIsError
					? serialErrorBlock
					: newSerials.length > 0 && <VideoList title='new serials' type='serials' url='#' data={newSerials} />}

				{serialIsError
					? serialErrorBlock
					: popularSerials.length > 0 && (
							<VideoList title='popular serials' type='serials' url='#' data={popularSerials} />
					  )}

				{/* <VideoList title='channel' type='channels' url='#' /> */}
			</div>
		</>
	)
}

export default Home
