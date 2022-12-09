const CompletionModel = ({
	prompt,
	temperature = 1,
	model = "text-davinci-002",
	max_tokens = 50,
	stop = null,
}) => ({
	model: model,
	prompt: prompt,
	max_tokens: max_tokens,
	temperature: temperature,
	stop: stop,
});

module.exports = {
	CompletionModel: CompletionModel,
};
