const weeks = require('./schedule')
const ractiveStateRouter = require('ractive-state-router')
const abstractStateRouter = require('abstract-state-router')
var ractiveStateRenderer = ractiveStateRouter(require('ractive'))
var stateRouter = abstractStateRouter(ractiveStateRenderer, '#app-content')

stateRouter.addState({
	name: 'day-selection',
	template: '#day-selection',
	route: '/select',
	activate: function(context) {
		context.domApi.set('allPlans', weeks)
	}
})
stateRouter.addState({
	name: 'timer',
	template: '#timer',
	route: '/timer/:week(\\d+)/:day(\\d+)',
	activate: function(context) {
		context.domApi.set('plan', weeks[context.parameters.week][context.parameters.day])
		context.domApi.set('parameters', context.parameters)
	}
})

stateRouter.evaluateCurrentRoute('day-selection')
