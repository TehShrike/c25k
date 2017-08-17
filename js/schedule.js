const time = (action, seconds) => ({ action, seconds })
const walk = (seconds) => time('walk', seconds)
const jog = (seconds) => time('jog', seconds)
const warmup = (seconds) => time('warmup', seconds)
const cooldown = (seconds) => time('cooldown', seconds)
const minutes = m => m * 60

const firstWeek = [
	warmup(minutes(5)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	jog(minutes(1)), walk(minutes(1)),
	cooldown(minutes(5)),
]
const secondWeek = [
	warmup(minutes(5)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	cooldown(minutes(4)),
]
const thirdWeek = [
	warmup(minutes(5)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	jog(minutes(3)), walk(minutes(3)),
	jog(minutes(3)), walk(minutes(3)),
	jog(90), walk(minutes(2)),
	jog(90), walk(minutes(2)),
	jog(minutes(3)), walk(minutes(3)),
	jog(minutes(3)), walk(minutes(3)),
	cooldown(minutes(5)),
]
const fourthWeek = [
	warmup(minutes(5)),
	jog(minutes(5)), walk(90),
	jog(minutes(5)), walk(150),
	jog(minutes(3)), walk(90),
	jog(minutes(5)),
	cooldown(3 * 60 + 30),
]
const fifthWeekDayOne = [
	warmup(minutes(5)),
	jog(minutes(5)), walk(minutes(3)),
	jog(minutes(5)), walk(minutes(3)),
	jog(minutes(5)),
	cooldown(minutes(4)),
]
const fifthWeekDayTwo = [
	warmup(minutes(5)),
	jog(minutes(8)), walk(minutes(5)),
	jog(minutes(8)),
	cooldown(minutes(4)),
]
const fifthWeekDayThree = [
	warmup(minutes(5)),
	jog(minutes(20)),
	cooldown(minutes(5)),
]

const sixthWeekDayOne = [
	warmup(minutes(5)),
	jog(minutes(5)), walk(minutes(3)),
	jog(minutes(8)), walk(minutes(3)),
	jog(minutes(5)),
	cooldown(minutes(4)),
]
const sixthWeekDayTwo = [
	warmup(minutes(5)),
	jog(minutes(10)), walk(minutes(3)),
	jog(minutes(10)),
	cooldown(minutes(4)),
]
const sixthWeekDayThree = [
	warmup(minutes(5)),
	jog(minutes(22)),
	cooldown(minutes(5)),
]

const seventhWeek = [
	warmup(minutes(5)),
	jog(minutes(25)),
	cooldown(minutes(5)),
]

const eightWeek = [
	warmup(minutes(5)),
	jog(minutes(28)),
	cooldown(minutes(5)),
]

const ninthWeek = [
	warmup(minutes(5)),
	jog(minutes(30)),
	cooldown(minutes(5)),
]

module.exports = [
	[ firstWeek, firstWeek, firstWeek ],
	[ secondWeek, secondWeek, secondWeek ],
	[ thirdWeek, thirdWeek, thirdWeek ],
	[ fourthWeek, fourthWeek, fourthWeek ],
	[ fifthWeekDayOne, fifthWeekDayTwo, fifthWeekDayThree ],
	[ sixthWeekDayOne, sixthWeekDayTwo, sixthWeekDayThree ],
	[ seventhWeek, seventhWeek, seventhWeek ],
	[ eightWeek, eightWeek, eightWeek ],
	[ ninthWeek, ninthWeek, ninthWeek ]
]
