import logoFooter from '../../../../assets/logo/logoFooter.png'
import appStore from '../../../../assets/footer/appStore.png'
import googlePlay from '../../../../assets/footer/googlePlay.png'
import styles from './Company.module.css'
import Social from '../Social/Social'

const Company = () => {
	return (
		<section className={styles.company}>
			<a href='#' className={styles.logo} aria-label='To the main page'>
				<img src={logoFooter} alt='Logo' />
				<span className='visually-hidden'>To the main page</span>
			</a>

			<p className={styles.description}>
				Hot Africa, we offer original, exclusive and premium stories. Everything you want to watch, anytime, anywhere
				and as much.
			</p>

			<div className={styles.app}>
				<a href='#' className={styles.appLink} aria-label='AppStore'>
					<img src={appStore} />
					<span className='visually-hidden'>AppStore</span>
				</a>
				<a href='#' className={styles.appLink} aria-label='googlePlay'>
					<img src={googlePlay} />
					<span className='visually-hidden'>googlePlay</span>
				</a>
			</div>

			<Social />

			<div className={styles.usefulLinks}>
				<a href='#'>Terms of use</a>
				<a href='#'>Privacy Policy</a>
				<a href='#'>SiteMap</a>
			</div>

			<p className={styles.copyright}>
				Copyright © 2022 Hot Africa. <span>All rights reserved.</span>
			</p>
		</section>
	)
}

export default Company