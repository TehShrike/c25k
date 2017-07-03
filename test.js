const test = require('tape')
const { getNextDayFromModel } = require('./date-modification')
const deriveStepFromPlan = require('./derive-step-from-plan')

test('getting next day', t => {
	const nextDay = getNextDayFromModel({
		0: {
			0: 1,
			1: 2
		},
		1: {
			0: 3,
			1: 5,
			2: 3
		}
	})

	t.equal(nextDay.week, 1, 'week is correct')
	t.equal(nextDay.day, 2, 'day is correct')

	t.end()
})

test('getting next day when it falls on a later week', t => {
	const nextDay = getNextDayFromModel({
		0: {
			0: 1,
			1: 2
		},
		1: {
			0: 3,
			1: 3,
			2: 5
		}
	})

	t.equal(nextDay.week, 2, 'week is correct')
	t.equal(nextDay.day, 0, 'day is correct')

	t.end()
})

test(`doesn't freak out when there are no days`, t => {
	const nextDay = getNextDayFromModel({})

	t.equal(nextDay.week, 0, 'week defaults to 0')
	t.equal(nextDay.day, 0, 'day defaults to 0')

	t.end()
})

test('Correctly derives the current step from the current plan/timestamp', t => {
	const plan = [{ action: 'warmup', seconds: 300 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'cooldown', seconds: 300 }
	]

	const elapsed = (300 + 60 + 30) * 1000
	const { currentStep, secondsThisStep } = deriveStepFromPlan(elapsed, plan)

	t.equal(currentStep, 2)
	t.equal(secondsThisStep, 30)

	t.equal(deriveStepFromPlan(elapsed + 5000, plan).secondsThisStep, 35)

	t.end()
})

test('Correctly derives the current step from the current plan/timestamp', t => {
	const plan = [{ action: 'warmup', seconds: 300 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'jog', seconds: 60 },
		{ action: 'walk', seconds: 60 },
		{ action: 'cooldown', seconds: 300 }
	]

	const elapsedMs = 45 * 60 * 60 * 1000
	const runState = deriveStepFromPlan(elapsedMs, plan)

	t.equal(runState, null)

	t.end()
})
