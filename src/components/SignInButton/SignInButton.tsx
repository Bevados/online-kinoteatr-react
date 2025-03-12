import { useDispatch } from 'react-redux'
import SignInIcon from '../../assets/SignIn/SignInIcon.png'

import styles from './SignInButton.module.css'
import { showComponent } from '../../redux/authorizationWindow/authorizationWindow'

interface SignInProps {
	className?: string
}

const SignIn = ({ className }: SignInProps) => {
	const dispatch = useDispatch()

	return (
		<button
			className={`${styles.signIn} ${className}`}
			onClick={() => {
				dispatch(showComponent())
			}}>
			<img src={SignInIcon} />
			<p>Sign In</p>
		</button>
	)
}

export default SignIn
