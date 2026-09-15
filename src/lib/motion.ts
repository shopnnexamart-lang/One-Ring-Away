import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, CustomEase)

// Signature deceleration curve used across the whole site
CustomEase.create('ora', '0.22, 1, 0.36, 1')

export { gsap, ScrollTrigger }
