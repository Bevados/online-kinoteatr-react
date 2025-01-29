import styles from './ButtonMenu.module.css'

interface ButtonMenuProps {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ButtonMenu = ({ isOpen, setIsOpen }: ButtonMenuProps) => {
	const toggleMenu: () => void = () => setIsOpen((prevState: boolean) => !prevState)

	return (
		<button
			className={`${styles.navButton} ${isOpen ? styles.navOpen : styles.navClose}`}
			onClick={toggleMenu}
			type='button'
			aria-label='Open and close menu'
			aria-expanded={isOpen}>
			<span className={`${styles.hamburgerBar} ${styles.hamburgerTop}`}></span>
			<span className={`${styles.hamburgerBar} ${styles.hamburgerMiddle}`}></span>
			<span className={`${styles.hamburgerBar} ${styles.hamburgerBottom}`}></span>
			{!isOpen && <span className={`${styles.menuText}`}>Menu</span>}
		</button>
	)
}

export default ButtonMenu
