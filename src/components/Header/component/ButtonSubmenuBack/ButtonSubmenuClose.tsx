import styles from './ButtonSubmenuClose.module.css'

interface ButtonSubmenuCloseProps {
	name: string
	active: string | null
	setActive: React.Dispatch<React.SetStateAction<string | null>>
}

const ButtonSubmenuClose = ({ name, active, setActive }: ButtonSubmenuCloseProps) => {
	function handleClick() {
		if (active === name) {
			setActive(null)
		}
	}

	return (
		<button onClick={handleClick} aria-label='Close submenu' className={styles.submenuClose} type='button'>
			<span className={styles.arrow}></span>
			<span className='visually-hidden'></span>
		</button>
	)
}

export default ButtonSubmenuClose
