import styles from './previewProgram.module.css'

interface PreviewProgramProps {
	title: string
	programName: string
}

const PreviewProgram = ({ title, programName }: PreviewProgramProps) => {
	return (
		<div className={styles.previewWrapper}>
			<p className={styles.title}>{title}</p>
			<p className={styles.name}>{programName}</p>
		</div>
	)
}

export default PreviewProgram
