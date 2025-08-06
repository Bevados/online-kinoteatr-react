import Slider from './components/Slider/Slider'
import VideoList from './components/VideoList/VideoList'

import { Chanel, MoviePreviews, SerialPreviews } from '../../types/index'

import { useMoviePreviews } from '../../hooks/useMoviePreviews'
import { useSerialPreviews } from '../../hooks/useSerialPreviews'
import { useChannelPreviews } from '../../hooks/useChannelPreviews'

import styles from './Home.module.css'
import { useMemo } from 'react'

const Home = () => {
	// Делаю запросы для получения превью фильмов и сериалов
	const { data: dataMoviesPrev = [], isError: movieIsError, isLoading: loadingMovies } = useMoviePreviews()
	const { data: dataSerialsPrev = [], isError: serialIsError, isLoading: loadingSerials } = useSerialPreviews()
	const { data: dataChanelPrev = [], isError: chanelIsError, isLoading: loadingChannels } = useChannelPreviews()

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
			newChanels: dataChanelPrev.filter((chanel: Chanel) => chanel.is_new),
			popularChanels: dataChanelPrev.filter((chanel: Chanel) => chanel.is_recommended)
		}),
		[dataChanelPrev]
	)

	return (
		<>
			<Slider />
			<section className={styles.videoWrap}>
				{loadingMovies && loadingSerials && loadingChannels && <p>Загрузка...</p>}

				{movieIsError && serialIsError && chanelIsError && <p>Произошла ошибка загрузки данных</p>}

				{!movieIsError && !loadingMovies && (
					<VideoList title='new movies' type='movies' url='#' data={newMovies} loading={loadingMovies} />
				)}

				{!movieIsError && !loadingMovies && (
					<VideoList title='popular movies' type='movies' url='#' data={popularMovies} loading={loadingMovies} />
				)}

				{!serialIsError && !loadingSerials && (
					<VideoList title='new serials' type='serials' url='#' data={newSerials} loading={loadingSerials} />
				)}

				{!serialIsError && !loadingSerials && (
					<VideoList title='popular serials' type='serials' url='#' data={popularSerials} loading={loadingSerials} />
				)}

				{!chanelIsError && !loadingChannels && (
					<VideoList title='recommended chanels' type='channels' data={popularChanels} loading={loadingChannels} />
				)}

				{!chanelIsError && !loadingChannels && (
					<VideoList title='new chanels' type='channels' data={newChanels} loading={loadingChannels} />
				)}
			</section>
		</>
	)
}

export default Home
