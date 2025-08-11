// import { CSSProperties } from "react"

interface PreviewProgramProps {
	title: string
	programName: string
	customClass: string
	positionTop: string
}

const PreviewProgram = ({ title, programName, customClass, positionTop }: PreviewProgramProps) => {
	return (
		<div className={customClass} style={{top: positionTop + '%'}}>
			<p>{title}</p>
			<p>{programName}</p>
		</div>
	)
}

export default PreviewProgram
