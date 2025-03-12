import styles from './Social.module.css'
import FacebookIcon from '../../../../assets/footer/facebookIcon.svg?react'
import InstagramIcon from '../../../../assets/footer/instagramIcon.svg?react'
import TwitterIcon from '../../../../assets/footer/twitterIcon.svg?react'
import YoutubeIcon from '../../../../assets/footer/youtubeIcon.svg?react'

interface SocialItem {
	name: string
	url: string
	icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const social: SocialItem[] = [
	{
		name: 'facebook',
		url: 'https://www.facebook.com/',
		icon: FacebookIcon
	},
	{
		name: 'instagram',
		url: 'https://www.instagram.com/',
		icon: InstagramIcon
	},
	{
		name: 'twitter',
		url: 'https://twitter.com/',
		icon: TwitterIcon
	},
	{
		name: 'youtube',
		url: 'https://www.youtube.com/',
		icon: YoutubeIcon
	}
]

const Social = () => {
	return (
		<div className={styles.social}>
			{social.map(item => (
				<a key={item.name} href={item.url} className={styles.socialItem}>
					<item.icon className={styles.icon} />
					<span className='visually-hidden'>{item.name}</span>
				</a>
			))}
		</div>
	)
}

export default Social
