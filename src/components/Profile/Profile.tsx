import { useDispatch } from 'react-redux'
import { logOutUser } from '../../redux/authorizationUser/authorizationUser'

interface ProfileProps {
	type: 'header' | 'footer'
	className: string
	isVisibleProfileWindow?: React.Dispatch<React.SetStateAction<boolean>>
}

const Profile = ({ type, className, isVisibleProfileWindow }: ProfileProps) => {
	const dispatch = useDispatch()

	return (
		<div className={className}>
			{type === 'footer' &&  <h2>Profile</h2>}
			<div role='menu'>
				<a href='#' role='menuitem'>
					{type === 'header' ? 'Profile' : 'Personal Data'}
				</a>
				<a href='#' role='menuitem'>
					{type === 'header' ? 'Plans' : 'Choosing a Plan'}
				</a>
				<a href='#' role='menuitem'>
					{type === 'header' ? 'Payment History' : 'Payment'}
				</a>

				{type === 'header' && (
					<button
						onClick={() => {
							dispatch(logOutUser())

							if (isVisibleProfileWindow) {
								isVisibleProfileWindow(false)
							}
						}}
						role='menuitem'
						aria-label='Log out'>
						Log Out
					</button>
				)}
			</div>
		</div>
	)
}

export default Profile
