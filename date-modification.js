const flatten = require('just-flatten')

module.exports.getNextDayFromModel = function getNextDayFromModel(model) {
	const allDates = flatten(Object.keys(model).map(week =>
		Object.keys(model[week]).map(day => ({
			timestamp: model[week][day],
			week: parseInt(week, 10),
			day: parseInt(day, 10)
		}))
	))

	const latestWorkDate = allDates.reduce((latest, potential) => latest.timestamp > potential.timestamp ? latest : potential, { week: 0, day: -1 })

	return increment(latestWorkDate)
}

function increment({ week, day }) {
	return day === 2 ? { week: week + 1, day: 0 } : { week, day: day + 1 }
}
