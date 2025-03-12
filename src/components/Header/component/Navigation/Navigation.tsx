import { useEffect, useRef, useState } from 'react'
import SignInButton from '../../../SignInButton/SignInButton.tsx'
import { MenuItem } from '../../index.ts'
import search from '../../../../assets/header/search.svg'
import ButtonSubmenuClose from '../ButtonSubmenuBack/ButtonSubmenuClose.tsx'
import styles from './Navigation.module.css'
import { useSelector } from 'react-redux'
import Profile from '../../../Profile/Profile.tsx'

interface NavigationProps {
	menu: MenuItem[]
	isOpen: boolean
}

const Navigation = ({ menu, isOpen }: NavigationProps) => {
	const [searchActive, setSearchActive] = useState<boolean>(false)
	const [submenuActive, setSubmenuActive] = useState<null | string>(null)
	const [profileMenuIsVisible, setProfileMenuIsVisible] = useState<boolean>(false)
	const refInput = useRef<HTMLDivElement | null>(null)
	const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated)

	// Open submenu on click
	function handleSubmenuClick(name: string) {
		setSubmenuActive(prev => (prev === name ? null : name))
	}

	// Open submenu on mouse enter
	function handleMouseSubmenuEnter(name: string) {
		setSubmenuActive(name)
	}

	// Close submenu on mouse leave
	function handleMouseSubmenuLeave() {
		setSubmenuActive(null)
	}

	//Скрытие submenu и search при клике вне элемента, показ search на мобильных устройствах
	useEffect(() => {
		// Показываем поиск на мобильных устройствах всегда
		if (window.innerWidth <= 768) {
			setSearchActive(true)
		}

		if (!searchActive && !submenuActive && !isOpen) {
			return
		}

		const handleClickOutside = (evt: MouseEvent) => {
			const target = evt.target as HTMLElement

			// Закрыть submenu, если клик вне submenu
			if (
				submenuActive &&
				!target.closest(`.${styles.itemSubmenu}`) &&
				!target.closest(`.${styles.submenuWrap}`) &&
				!target.closest(`.${styles.navButton}`)
			) {
				setSubmenuActive(null)
			}

			// Закрыть поиск, если клик вне поля ввода
			if (window.innerWidth > 768 && searchActive && refInput.current && !refInput.current.contains(target as Node)) {
				setSearchActive(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [searchActive, submenuActive, isOpen])

	return (
		<nav
			className={`${styles.navigation} ${isOpen ? styles.navigationOpen : ''}`}
			aria-label='Main navigation'
			aria-hidden={!isOpen}>
			<ul className={styles.menu}>
				{menu.map(item =>
					'submenu' in item ? (
						<li
							key={item.name}
							className={`${styles.menuItem} ${styles.itemSubmenu}`}
							onMouseEnter={() => {
								handleMouseSubmenuEnter(item.name)
							}}
							onMouseLeave={handleMouseSubmenuLeave}>
							<button
								className={styles.navButton}
								onClick={() => {
									handleSubmenuClick(item.name)
								}}
								type='button'>
								{item.name}
							</button>

							<div
								className={`${styles.submenuWrap} ${submenuActive === item.name ? styles.subMenuOpen : ''}`}
								role='menu'
								aria-hidden={submenuActive !== item.name}>
								<ButtonSubmenuClose name={item.name} active={submenuActive} setActive={setSubmenuActive} />
								<ul className={styles.submenu}>
									{item.submenu.map(subitem => (
										<li key={subitem.name} className={styles.submenuItem}>
											<a className={styles.navButton} href={subitem.link} role='menuitem'>
												{subitem.name}
											</a>
										</li>
									))}
								</ul>
							</div>
						</li>
					) : (
						<li className={styles.menuItem} key={item.name}>
							<a className={styles.navButton} href={item.link} role='menuitem'>
								{item.name}
							</a>
						</li>
					)
				)}
			</ul>
			<div className={styles.userActions}>
				<div className={styles.searchWrap}>
					{/* УБрать onClick и состояние  searchACtive*/}
					{!searchActive && (
						<button
							onClick={e => {
								e.stopPropagation()
								setSearchActive(true)
							}}
							className={styles.searchOpen}
							type='button'
							aria-label='Search'>
							<img src={search} alt='' />
							<p>Search</p>
						</button>
					)}

					{/* УБрать состояние  searchACtive*/}
					{searchActive && (
						<div className={styles.searchInputWrap} ref={refInput}>
							<img src={search} alt='Search' />
							<input className={styles.searchInput} type='text' placeholder='Search' aria-label='Search' />
						</div>
					)}
				</div>

				{!isAuthenticated ? (
					<SignInButton />
				) : (
					<button
						className={styles.profileButton}
						onClick={() => {
							setProfileMenuIsVisible(prew => !prew)
						}}
						type='button'
						aria-label='Profile'>
						Profile
					</button>
				)}

				{profileMenuIsVisible && isAuthenticated && (
					<Profile type='header' className={styles.profile} isVisibleProfileWindow={setProfileMenuIsVisible} />
				)}
			</div>
		</nav>
	)
}

export default Navigation
