import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../../redux/authorizationUser/authorizationUser'

interface ProfileProps {
	type: 'header' | 'footer'
	className: string
	isVisibleProfileWindow?: React.Dispatch<React.SetStateAction<boolean>>
	isMobile?: boolean
}

const Profile = ({ type, className, isVisibleProfileWindow, isMobile }: ProfileProps) => {
	const [openList, setOpenList] = useState<boolean>(false)
	const dispatch = useDispatch()

	return (
		<div className={className}>
			{type === 'header' && (
				<>
					<div role='menu'>
						<a href='#' role='menuitem'>
							Profile
						</a>
						<a href='#' role='menuitem'>
							Plans
						</a>
						<a href='#' role='menuitem'>
							Payment History
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
				</>
			)}

			{type === 'footer' && (
				<>
					<button
						onClick={() => {
							setOpenList(prew => !prew)
						}}
						disabled={!isMobile}>
						<p>Profile</p>
						<span data-open={openList}></span>
					</button>

					<div role='menu' data-mobile={isMobile} data-open={openList}>
						<a href='#' role='menuitem'>
							Personal Data
						</a>
						<a href='#' role='menuitem'>
							Choosing a Plan
						</a>
						<a href='#' role='menuitem'>
							Payment
						</a>
					</div>
				</>
			)}
		</div>
	)
}

export default Profile
