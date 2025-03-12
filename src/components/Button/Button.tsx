import styles from './Button.module.css'

interface ButtonProps {
	text: string
	icon?: string
	className?: string
	onClick: () => void
}

const Button = ({ text, icon, className, onClick }: ButtonProps) => {
	return (
		<button className={`${styles.button} ${className}`} onClick={onClick}>
			{icon && <img className={styles.icon} src={icon} alt='icon' />}
			<span>{text}</span>
		</button>
	)
}

export default Button
