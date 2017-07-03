module.exports = function deriveStepFromPlan(elapsedMs, plan, step = 0) {
	if (plan.length === 0) {
		return null
	}

	const [ nextStep, ...restOfPlan ] = plan
	const nextIncrementMs = nextStep.seconds * 1000
	const timeLeftMs = elapsedMs - nextIncrementMs

	if (timeLeftMs > 0) {
		return deriveStepFromPlan(timeLeftMs, restOfPlan, step + 1)
	}

	const timeLeftSeconds = timeLeftMs / -1000
	return {
		currentStep: step,
		secondsThisStep: nextStep.seconds - timeLeftSeconds
	}
}
