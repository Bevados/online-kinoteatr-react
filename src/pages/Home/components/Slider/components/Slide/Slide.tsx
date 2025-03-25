import ButtonLink from '../../../../../../components/ButtonLink/ButtonLink'
import styles from './Slide.module.css'

interface ISlideProps {
	image: string
	title: string
	buttonText: string
	buttonLink: string
}

const Slide = ({ image, title, buttonText, buttonLink }: ISlideProps) => {
	return (
		<div className={styles.slide}>
			<img src={image} alt={title} className={styles.image} />
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<ButtonLink text={buttonText} href={buttonLink} />
			</div>
		</div>
	)
}

export default Slide
