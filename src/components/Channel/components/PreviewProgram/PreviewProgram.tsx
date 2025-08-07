// import { CSSProperties } from "react"

interface PreviewProgramProps {
	title: string
	programName: string
	customClass: string
}

const PreviewProgram = ({ title, programName, customClass }: PreviewProgramProps) => {
	return (
		<div className={customClass}>
			<p>{title}</p>
			<p>{programName}</p>
		</div>
	)
}

export default PreviewProgram
