import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'

import PopularVideo from './component/PopularVideo/PopularVideo'
import Company from './component/Company/Company'
import SignInButton from '../SignInButton/SignInButton'
import Profile from '../Profile/Profile'

import { fetchMovies, fetchSerials } from '../../services/fetchData'

import styles from './Footer.module.css'

const Footer = () => {
	const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated)

	const {
		data: moviesData = [],
		isLoading: moviesIsLoading,
		isError: moviesIsError,
		error: moviesError
	} = useQuery({
		queryKey: ['movies'],
		queryFn: fetchMovies,
		staleTime: Infinity
	})

	const {
		data: serialsData = [],
		isLoading: serialsIsLoading,
		isError: serialsIsError,
		error: serialsError
	} = useQuery({
		queryKey: ['serials'],
		queryFn: fetchSerials,
		staleTime: Infinity
	})

	return (
		<footer className={styles.footer}>
			<Company />
			<div className={styles.wrapProfilePopular}>
				{!isAuthenticated && <SignInButton className={styles.signIn} />}
				{isAuthenticated && <Profile className={styles.profile} type='footer' />}
				<PopularVideo
					title='Movies'
					data={moviesData}
					isLoading={moviesIsLoading}
					isError={moviesIsError}
					error={moviesError}
				/>
				<PopularVideo
					title='Series'
					data={serialsData}
					isLoading={serialsIsLoading}
					isError={serialsIsError}
					error={serialsError}
				/>
			</div>
		</footer>
	)
}

export default Footer
