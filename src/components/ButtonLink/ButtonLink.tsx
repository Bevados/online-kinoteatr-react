import styles from './ButtonLink.module.css'

interface IButtonLinkProps {
	text: string
	href: string
	stylesProps?: string
}

const ButtonLink = ({ text, href, stylesProps }: IButtonLinkProps) => {
	return (
		<a href={href} className={`${styles.button} ${stylesProps}`}>
			{text}
		</a>
	)
}

export default ButtonLink
