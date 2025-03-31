import styles from './Control.module.css'

interface ControlProps {
	dataLength: number
	index: number
	isLastSlide: boolean
	setIndex: React.Dispatch<React.SetStateAction<number>>
	setIsLastSlide: React.Dispatch<React.SetStateAction<boolean>>
}

const Control = ({ dataLength, index, setIndex, setIsLastSlide, isLastSlide }: ControlProps) => {
	const dash = Array.from({ length: dataLength }, (_, i) => (
		<span key={i} className={`${styles.dash} ${index === i ? styles.activeDash : styles.resetDash}`}></span>
	))

	const handleLastSlide = (action: string) => {
		setIsLastSlide(true)
		setTimeout(() => {
			setIsLastSlide(false)
		}, 500)
		return action === 'back' ? dataLength - 1 : 0
	}

	return (
		<div className={styles.control}>
			<button
				className={`${styles.button} ${styles.buttonBack}`}
				onClick={() => {
					setIndex(prew => (prew === 0 ? handleLastSlide('back') : prew - 1))
				}}
				disabled={isLastSlide}></button>
			{dash}
			<button
				className={`${styles.button} ${styles.buttonAhead}`}
				onClick={() => {
					setIndex(prew => (prew === dataLength - 1 ? handleLastSlide('ahead') : prew + 1))
				}}
				disabled={isLastSlide}></button>
		</div>
	)
}

export default Control
