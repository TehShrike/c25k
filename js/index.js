const weeks = require('./schedule')
const ractiveStateRouter = require('ractive-state-router')
const abstractStateRouter = require('abstract-state-router')
const ractiveStateRenderer = ractiveStateRouter(require('ractive'))
const stateRouter = abstractStateRouter(ractiveStateRenderer, '#app-content')
const model = require('./model')
const deriveStepFromPlan = require('./derive-step-from-plan')
const { getNextDayFromModel } = require('./date-modification')

function dayName(date) {
	const day = date.getDay()
	return [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ][day]
}

function monthName(date) {
	const month = date.getMonth()
	return [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
		'August', 'September', 'October', 'November', 'December' ][month]
}

const colors = {
	walk: 'blue',
	cooldown: 'aqua',
	warmup: 'olive',
	jog: 'orange'
}

const defaultRunState = { currentStep: 0, secondsThisStep: 0 }

stateRouter.addState({
	name: 'day-selection',
	template: '#day-selection',
	route: '/select',
	resolve: function(data, params, cb) {
		const modelData = model.load()
		cb(null, {
			allPlans: weeks,
			model: modelData,
			monthName,
			dayName,
			isNextDay: function isNextDay(week, day) {
				const nextDay = getNextDayFromModel(modelData)

				return nextDay.week == week && nextDay.day == day
			}
		})
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
		const plan = weeks[params.week][params.day]
		const startTimestampFromStorage = model.loadStartTimestamp() || null
		const now = Date.now()

		let startTimestamp
		if (startTimestampFromStorage) {
			startTimestamp = startTimestampFromStorage
		} else {
			startTimestamp = now
			model.storeStartTimestamp(startTimestamp)
		}

		const elapsedAtStart = now - startTimestamp
		const derivedRunState = startTimestampFromStorage
			? deriveStepFromPlan(elapsedAtStart, plan)
			: null

		const { currentStep, secondsThisStep } = derivedRunState || defaultRunState

		cb(null, {
			parameters: params,
			plan,
			currentStep,
			secondsThisStep,
		})
	},
	activate: function(context) {
		const { domApi: ractive, parameters } = context
		const { secondsThisStep: elapsedAtStart } = context.content

		// if I start at 23:45 and finish at 00:15, it counts as being the day before
		const runDate = new Date()

		function incrementStep() {
			const nextStep = ractive.get('currentStep') + 1
			const lastStepNumber = ractive.get('plan').length

			if (nextStep >= lastStepNumber) {
				ractive.fire('done')
			} else {
				ractive.set({
					currentStep: nextStep,
					secondsThisStep: 0
				})
			}
		}

		const clear = timerTick(100, elapsedAtStart * 1000, debounceToNextFrame((seconds, resetClock) => {
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

		ractive.on('cancel', () => {
			model.storeStartTimestamp(null)
			stateRouter.go('day-selection')
		})

		ractive.on('done', () => {
			model.storeDay({
				week: parameters.week,
				day: parameters.day,
				date: runDate
			})
			model.storeStartTimestamp(null)
			stateRouter.go('congrats')
		})

		context.on('destroy', clear)
	}
})

stateRouter.addState({
	name: 'congrats',
	template: '#congrats',
	route: '/complete',
	activate: function(context) {
		const timeout = setTimeout(() => {
			stateRouter.go('day-selection')
		}, 3000)

		context.on('destroy', () => clearTimeout(timeout))
	}
})


function timerTick(frequency, offsetForFirstStep, tickCb) {
	let started = performance.now()

	const getElapsed = () => performance.now() - started + offsetForFirstStep
	const resetClock = () => {
		started = performance.now()
		offsetForFirstStep = 0
	}

	const interval = setInterval(() => tickCb(getElapsed() / 1000, resetClock), frequency)

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
