import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'
import { hideComponent } from '../../redux/authorizationWindow/authorizationWindow'
import { loginUser } from '../../redux/authorizationUser/authorizationUser'

import Input from '../Input/Input'
import Button from '../Button/Button'
import logoHeader from '../../assets/logo/logoHeader.png'

import styles from './SignInWindow.module.css'

const SignInWindow = () => {
	const [login, setLogin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const dispatch = useDispatch()

	const signIn = document.getElementById('sign-in')

	if (!signIn) {
		return null
	}

	return createPortal(
		<section className={styles.overlay}>
			<div className={styles.signInWrap}>
				<img className={styles.logo} src={logoHeader} alt='Logo' />
				<div className={styles.formWrap}>
					<h2>Login to get started</h2>
					<form className={styles.form}>
						<div className={styles.fields}>
							<Input value={login} onChange={setLogin} type='email' placeholder='Please enter Email address' />
							<Input value={password} onChange={setPassword} type='text' placeholder='Password' />
						</div>
						<Button
							text='Sign In'
							onClick={() => {
								dispatch(loginUser({ login, password }))
								dispatch(hideComponent())
							}}
						/>
					</form>
				</div>
				<button className={styles.close} onClick={() => dispatch(hideComponent())}>
					Back to website
				</button>
			</div>
		</section>,
		signIn
	)
}

export default SignInWindow
