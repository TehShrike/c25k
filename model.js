const KEY = 'C25K'
const START_TIMESTAMP_KEY = 'C25K_START'

const extend = (...args) => Object.assign({}, ...args)

module.exports = {
	load: function load() {
		return addMethods(loadFromLocalstorage())
	},
	storeDay: function({ week, day, date }) {
		return setDay({ model: loadFromLocalstorage(), week, day, date })
	},
	storeStartTimestamp(startTimestamp) {
		saveJson(START_TIMESTAMP_KEY, startTimestamp)
	},
	loadStartTimestamp() {
		return loadJson(START_TIMESTAMP_KEY)
	}
}

const loadJson = key => {
	const json = localStorage.getItem(key)
	return json && JSON.parse(json)
}
const saveJson = (key, value) => localStorage.setItem(key, JSON.stringify(value))

function loadFromLocalstorage() {
	return loadJson(KEY) || {}
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

function setDay({ model, week, day, date }) {
	const newModel = extend(model, {
		[week]: extend(model[week], {
			[day]: date.valueOf()
		})
	})

	saveJson(KEY, newModel)

	return addMethods(newModel)
}
