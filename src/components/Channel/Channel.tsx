import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import CardContent from './components/CardContent/CardContent'

import { Chanel } from '../../types'

import styles from './Channel.module.css'

interface ChannelProps {
	data: Chanel
	myRef?: (el: HTMLDivElement | null) => void
}

const Channel = ({ data, myRef }: ChannelProps) => {
	const [isMobile, setIsMobile] = useState(false)

	const [hoveredCard, setHoveredCard] = useState<{
		coords: { top: number; left: number; width: number; height: number }
	} | null>(null)
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768)
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const handleMouseEnter = (e: React.MouseEvent) => {
		if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)

		const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
		setHoveredCard({
			coords: {
				top: rect.top + window.scrollY,
				left: rect.left + window.scrollX,
				width: rect.width,
				height: rect.height
			}
		})
	}

	const handleMouseLeave = () => {
		hideTimeoutRef.current = setTimeout(() => {
			setHoveredCard(null)
		}, 200)
	}

	const handlePortalEnter = () => {
		if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
	}

	const handlePortalLeave = () => {
		hideTimeoutRef.current = setTimeout(() => {
			setHoveredCard(null)
		}, 200)
	}

	return (
		<>
			<div ref={myRef} className={styles.previewWrap} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{hoveredCard === null && <CardContent data={data} isMobile={isMobile} />}
			</div>

			{!isMobile && hoveredCard !== null &&
				createPortal(
					<div
						onMouseEnter={handlePortalEnter}
						onMouseLeave={handlePortalLeave}
						style={{
							position: 'absolute',
							top: hoveredCard?.coords.top ?? 0,
							left: hoveredCard?.coords.left ?? 0,
							width: hoveredCard?.coords.width ?? 0,
							height: hoveredCard?.coords.height ?? 0,
							transform: 'scale(1.5)',
							transformOrigin: 'center center',
							zIndex: 9999,
							transition: 'transform 0.25s ease, top 0.25s ease, box-shadow 0.25s ease',
							boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
							background: 'var(--card-bg)',
							borderRadius: '12px',
							overflow: 'hidden'
						}}>
						<CardContent data={data} isMobile={isMobile} />
					</div>,
					document.body
				)}
		</>
	)
}

export default Channel
