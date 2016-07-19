function time(action, seconds) {
	return { action, seconds }
}
function walk(seconds) {
	return time('walk', seconds)
}
function jog(seconds) {
	return time('jog', seconds)
}
function warmup(seconds) {
	return time('warmup', seconds)
}
function cooldown(seconds) {
	return time('cooldown', seconds)
}

const firstWeek = [
	warmup(.05 * 60),
	jog(60), walk(60),
	jog(60), walk(60),
	jog(60), walk(60),
	jog(60), walk(60),
	jog(60), walk(60),
	jog(60), walk(60),
	jog(60), walk(60),
	jog(60), walk(60),
	cooldown(5 * 60)
]
const secondWeek = [
	warmup(5 * 60),
	jog(90), walk(120),
	jog(90), walk(120),
	jog(90), walk(120),
	jog(90), walk(120),
	jog(90), walk(120),
	jog(90), walk(120),
	cooldown(4 * 60)
]
const thirdWeek = [
	warmup(5 * 60),
	jog(90), walk(120),
	jog(90), walk(120),
	jog(3 * 60), walk(3 * 60),
	jog(3 * 60), walk(3 * 60),
	jog(90), walk(120),
	jog(90), walk(120),
	jog(3 * 60), walk(3 * 60),
	jog(3 * 60), walk(3 * 60),
	cooldown(5 * 60)
]
const fourthWeek = [
	warmup(5 * 60),
	jog(5 * 60), walk(90),
	jog(5 * 60), walk(150),
	jog(3 * 60), walk(90),
	jog(5 * 60),
	cooldown(3 * 60 + 30)
]
const fifthWeekDayOne = [
	warmup(5 * 60),
	jog(5 * 60), walk(3 * 60),
	jog(5 * 60), walk(3 * 60),
	jog(5 * 60),
	cooldown(4 * 60)
]
const fifthWeekDayTwo = [
	warmup(5 * 60),
	jog(8 * 60), walk(5 * 60),
	jog(8 * 60),
	cooldown(4 * 60)
]
const fifthWeekDayThree = [
	warmup(5 * 60),
	jog(20 * 60),
	cooldown(5 * 60)
]

const sixthWeekDayOne = [
	warmup(5 * 60),
	jog(5 * 60), walk(3 * 60),
	jog(8 * 60), walk(3 * 60),
	jog(5 * 60),
	cooldown(4 * 60)
]
const sixthWeekDayTwo = [
	warmup(5 * 60),
	jog(10 * 60), walk(3 * 60),
	jog(10 * 60),
	cooldown(4 * 60)
]
const sixthWeekDayThree = [
	warmup(5 * 60),
	jog(22 * 60),
	cooldown(5 * 60)
]

const seventhWeek = [
	warmup(5 * 60),
	jog(25)
]

const eightWeek = [
	warmup(5 * 60),
	jog(28)
]

const ninthWeek = [
	warmup(5 * 60),
	jog(30)
]

module.exports = [
	[firstWeek, firstWeek, firstWeek],
	[secondWeek, secondWeek, secondWeek],
	[thirdWeek, thirdWeek, thirdWeek],
	[fourthWeek, fourthWeek, fourthWeek],
	[fifthWeekDayOne, fifthWeekDayTwo, fifthWeekDayThree],
	[sixthWeekDayOne, sixthWeekDayTwo, sixthWeekDayThree],
	[seventhWeek, seventhWeek, seventhWeek],
	[eightWeek, eightWeek, eightWeek],
	[ninthWeek, ninthWeek, ninthWeek]
]
