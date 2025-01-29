import Navigation from './component/Navigation/Navigation.tsx'
import logoHeader from '../../assets/logo/logoHeader.png'
import { MenuItem } from './index.ts'
import styles from './Header.module.css'
import ButtonMenu from './component/ButtonMenu/ButtonMenu.tsx'
import { useState } from 'react'

const menuItems: MenuItem[] = [
	{ name: 'Movies', link: '#' },
	{ name: 'Series', link: '#' },
	{
		name: 'Channels',
		submenu: [
			{ name: 'ABC', link: '#' },
			{ name: 'CBS', link: '#' },
			{ name: 'FOX', link: '#' },
			{ name: 'NBC', link: '#' },
			{ name: 'CNN', link: '#' },
			{ name: 'Fox News', link: '#' },
			{ name: 'Nickelodeon', link: '#' },
			{ name: 'USA', link: '#' },
			{ name: 'Disney', link: '#' },
			{ name: 'HGTV', link: '#' },
			{ name: 'National Geographic', link: '#' },
			{ name: 'History', link: '#' }
		]
	},
	{
		name: 'Music',
		submenu: [
			{ name: 'Classical', link: '#' },
			{ name: 'Education', link: '#' },
			{ name: 'Entertainment', link: '#' },
			{ name: 'Free-to-Air (Trial)', link: '#' },
			{ name: 'Fun', link: '#' },
			{ name: 'Gospel', link: '#' },
			{ name: 'Indian', link: '#' },
			{ name: 'Jazz', link: '#' },
			{ name: 'Kids', link: '#' },
			{ name: 'Live cams', link: '#' },
			{ name: 'Movies', link: '#' },
			{ name: 'News', link: '#' },
			{ name: 'R&B', link: '#' },
			{ name: 'Rock', link: '#' },
			{ name: 'Science', link: '#' }
		]
	}
]

const Header = () => {
	const [isOpenMenu, setOpenMenu] = useState<boolean>(false)

	return (
		<header className={styles.header}>
			<a href='#' className={styles.logo}>
				<img src={logoHeader} alt='Logo' />
				<span className='visually-hidden'>To the main page</span>
			</a>
			<ButtonMenu isOpen={isOpenMenu} setIsOpen={setOpenMenu} />
			<Navigation isOpen={isOpenMenu} menu={menuItems} />
		</header>
	)
}

export default Header
