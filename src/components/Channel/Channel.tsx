import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import CardContent from './components/CardContent/CardContent'

import { Chanel } from '../../types'

import styles from './Channel.module.css'

interface ChannelProps {
	data: Chanel
	myRef?: (el: HTMLDivElement | null) => void
}

interface HoveredCardState {
	coords: { top: number; left: number; width: number; height: number }
}

// const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const Channel = ({ data, myRef }: ChannelProps) => {
	const [isMobile, setIsMobile] = useState(false)
	const [animateIn, setAnimateIn] = useState(false)
	const [hoveredCard, setHoveredCard] = useState<HoveredCardState | null>(null)

	const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	// Пересчёт ширины экрана при загрузке и изменении размера окна
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768)
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	// Анимация при наведении на карточку
	useEffect(() => {
		if (hoveredCard) {
			setAnimateIn(false)
			// дождёмся кадра после монтирования портала
			requestAnimationFrame(() => setAnimateIn(true))
		} else {
			setAnimateIn(false)
		}
	}, [hoveredCard])

	// Очистка таймера при размонтировании компонента
	useEffect(() => {
		return () => {
			if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
		}
	}, [])

	// Обработчики событий для управления состоянием наведения на карточку
	const handleMouseEnter = (e: React.MouseEvent) => {
		if (isMobile) return
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
		if (isMobile) return
		hideTimeoutRef.current = setTimeout(() => {
			setHoveredCard(null)
		}, 200)
	}

	const handlePortalEnter = () => {
		if (isMobile) return
		if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
	}

	const handlePortalLeave = () => {
		if (isMobile) return
		hideTimeoutRef.current = setTimeout(() => {
			setHoveredCard(null)
		}, 200)
	}

	return (
		<>
			<div
				ref={myRef}
				className={styles.previewWrap}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={hoveredCard ? { visibility: 'hidden' } : undefined}>
				<CardContent data={data} isMobile={isMobile} />
			</div>

			{!isMobile &&
				hoveredCard !== null &&
				createPortal(
					<div
						onMouseEnter={handlePortalEnter}
						onMouseLeave={handlePortalLeave}
						style={{
							position: 'absolute',
							top: hoveredCard.coords.top,
							left: hoveredCard?.coords.left ?? 0,
							width: hoveredCard.coords.width,
							height: hoveredCard.coords.height,
							transform: animateIn ? 'scale(1.4)' : 'scale(1)',
							transformOrigin: 'center center',
							zIndex: 100,
							transition: ' transform 0.2s ease',
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
