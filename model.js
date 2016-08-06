const extend = require('xtend')

const KEY = 'C25K'

module.exports = {
	load: function load() {
		return addMethods(loadFromLocalstorage())
	},
	storeDay: function({week, day, date}) {
		return setDay({ model: loadFromLocalstorage(), week, day, date })
	}
}

function loadFromLocalstorage() {
	const fromStorage = localStorage.getItem(KEY)

	return fromStorage ? JSON.parse(fromStorage) : {}
}

function store(model) {
	localStorage.setItem(KEY, JSON.stringify(model))
}

function addMethods(model) {
	model.getWeek = getWeek.bind(null, model)
	model.getDay = getDay.bind(null, model)
	return model
}

function getWeek(model, week) {
	return model[week] || {}
}

function getDay(model, week, day) {
	const timestamp = getWeek(model, week)[day]
	return timestamp ? new Date(timestamp) : null
}

function setDay({model, week, day, date}) {
	const newModel = extend(model, {
		[week]: extend(model[week], {
			[day]: date.valueOf()
		})
	})

	store(newModel)

	return addMethods(newModel)
}
