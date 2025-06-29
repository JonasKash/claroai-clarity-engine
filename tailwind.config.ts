
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// ClaroAI Design System
				'claro-primary': '#6B46C1',
				'claro-secondary': '#4C1D95',
				'claro-accent': '#8B5CF6',
				'claro-background': '#0F0F23',
				'claro-card': '#1A1B3A',
				'claro-success': '#10B981',
				'claro-warning': '#F59E0B',
				
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			backgroundImage: {
				'claro-gradient': 'linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)',
				'claro-gradient-reverse': 'linear-gradient(135deg, #8B5CF6 0%, #6B46C1 100%)',
			},
			boxShadow: {
				'claro': '0 10px 25px rgba(107, 70, 193, 0.15)',
				'claro-lg': '0 20px 40px rgba(107, 70, 193, 0.2)',
			},
			backdropBlur: {
				'claro': '20px',
			},
			borderRadius: {
				'claro': '12px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontSize: {
				'claro-h1': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
				'claro-h2': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
				'claro-h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
				'claro-body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'typing': {
					'0%': { width: '0ch' },
					'100%': { width: '20ch' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'typing': 'typing 2s steps(20) infinite',
				'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
