const test = require('tape')
const { getNextDayFromModel } = require('./date-modification')

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
