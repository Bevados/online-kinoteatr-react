import { useEffect, useState } from 'react'
import Slide from './components/Slide/Slide'

import styles from './Slider.module.css'
import Control from './components/Control/Control'

interface Slide {
	id: number
	image: string
	title: string
	buttonText: string
	buttonLink: string
}

const sliderData: Slide[] = [
	{
		id: 1,
		image: 'assets/slider/one-img.jpg',
		title: 'Dive into a universe of un-ending content and channels',
		buttonText: 'Start FREE trial',
		buttonLink: '#'
	},
	{
		id: 2,
		image: 'assets/slider/one-img.jpg',
		title: 'Huge selection of music from collected musical radio stations on our website',
		buttonText: 'Start FREE trial',
		buttonLink: '#'
	},
	{
		id: 3,
		image: 'assets/slider/one-img.jpg',
		title: 'Register and watch any films and TV shows',
		buttonText: 'Start FREE trial',
		buttonLink: '#'
	},
	{
		id: 4,
		image: 'assets/slider/one-img.jpg',
		title: 'Choose the most popular television channels and watch your favorite shows',
		buttonText: 'Start FREE trial',
		buttonLink: '#'
	}
]

const Slider = () => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)
	const [isLastSlide, setIsLastSlide] = useState<boolean>(false)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex(prew => {
				if (prew + 1 >= sliderData.length) {
					setIsLastSlide(true)
					setTimeout(() => {
						setIsLastSlide(false)
					}, 1000)
					return 0
				} else {
					return prew + 1
				}
			})
		}, 3000)

		return () => {
			clearInterval(interval)
		}
	}, [currentIndex])

	return (
		<section className={styles.slider}>
			<div
				className={styles.slides}
				style={{
					transform: `translateX(-${currentIndex * 100}%)`,
					transition: isLastSlide ? 'none' : 'transform 0.5s ease'
				}}>
				{sliderData.map(slide => (
					<Slide
						key={slide.id}
						title={slide.title}
						image={slide.image}
						buttonText={slide.buttonText}
						buttonLink={slide.buttonLink}
					/>
				))}
			</div>
			<Control
				dataLength={sliderData.length}
				index={currentIndex}
				setIndex={setCurrentIndex}
				isLastSlide={isLastSlide}
				setIsLastSlide={setIsLastSlide}
			/>
		</section>
	)
}

export default Slider
