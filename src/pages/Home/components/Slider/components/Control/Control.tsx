import styles from './Control.module.css'

interface ControlProps {
	dataLength: number
}

const Control = ({ dataLength }: ControlProps) => {
	const dash = Array.from({ length: dataLength }, (_, i) => (
		<span key={i} className={`${styles.dash} ${styles.activeDash}`}></span>
	))

	return (
		<div className={styles.control}>
			<button className={`${styles.button} ${styles.buttonBack}`} onClick={() => {}}></button>
			{dash}
			<button className={`${styles.button} ${styles.ahead}`} onClick={() => {}}></button>
		</div>
	)
}

export default Control
