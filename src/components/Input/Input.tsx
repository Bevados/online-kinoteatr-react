import styles from './Input.module.css'

interface InputProps {
	type: string
	placeholder: string
	value: string
	onChange: React.Dispatch<React.SetStateAction<string>>
}

const Input = ({ type, placeholder, value, onChange }: InputProps) => {
	return <input className={styles.input} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
}

export default Input
