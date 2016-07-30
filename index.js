const weeks = require('./schedule')
const ractiveStateRouter = require('ractive-state-router')
const abstractStateRouter = require('abstract-state-router')
const ractiveStateRenderer = ractiveStateRouter(require('ractive'))
const stateRouter = abstractStateRouter(ractiveStateRenderer, '#app-content')

const colors = {
	walk: 'blue',
	cooldown: 'aqua',
	warmup: 'olive',
	jog: 'orange'
}

stateRouter.addState({
	name: 'day-selection',
	template: '#day-selection',
	route: '/select',
	resolve: function(data, params, cb) {
		cb(null, {
			allPlans: weeks
		})
	},
	activate: function(context) {
	}
})
stateRouter.addState({
	name: 'timer',
	template: {
		template: '#timer',
		computed: {
			currentPlan: function currentPlan() {
				return this.get('plan')[this.get('currentStep')]
			},
			percentage: function percentage() {
				return Math.min(this.get('secondsThisStep') / this.get('currentPlan').seconds * 100, 100)
			},
			color: function color() {
				return colors[this.get('currentPlan').action]
			}
		}
	},
	route: '/timer/:week(\\d+)/:day(\\d+)',
	resolve: function(data, params, cb) {
		cb(null, {
			plan:  weeks[params.week][params.day],
			parameters: params,
			currentStep: 0,
			secondsThisStep: 0
		})
	},
	activate: function(context) {
		const ractive = context.domApi

		function incrementStep() {
			ractive.set({
				currentStep: ractive.get('currentStep') + 1,
				secondsThisStep: 0
			})
		}

		const clear = tickSeconds(100, debounceToNextFrame((seconds, resetClock) => {
			const doneWithThisStep = ractive.get('secondsThisStep') >= ractive.get('currentPlan').seconds
			if (doneWithThisStep) {
				incrementStep()
				resetClock()
			} else {
				ractive.set({
					secondsThisStep: seconds
				})
			}
		}))

		context.on('destroy', clear)
	}
})

function tickSeconds(frequency, tickCb) {
	let started

	function resetClock() {
		started = performance.now()
	}

	const interval = setInterval(() => tickCb((performance.now() - started) / 1000, resetClock), frequency)

	resetClock()

	return () => clearInterval(interval)
}

function debounceToNextFrame(fn) {
	let happening = false
	return function(...args) {
		if (!happening) {
			happening = true
			window.requestAnimationFrame(() => {
				happening = false
				fn.apply(null, args)
			})
		}
	}
}

stateRouter.evaluateCurrentRoute('day-selection')
