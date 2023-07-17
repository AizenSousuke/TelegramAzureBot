const { Telegraf } = require("telegraf");
require("dotenv").config();
const completion = require("../models/completion");
const { RemoveCommand } = require("../common/messageHelper");
const openai = require("../common/openai");

console.log("Webhook URL: " + process.env.WEBHOOK_URL);

const BOT = new Telegraf(process.env.TELEGRAM_BOT_TOKEN, {
	telegram: { webhookReply: true },
});

BOT.telegram.setWebhook(process.env.WEBHOOK_URL);
// BOT.start((ctx) => ctx.reply("Welcome to the Misaka Network."));
// Echo
// BOT.on("message", (ctx) => ctx.telegram.sendMessage(ctx.chat.id, ctx.message));

BOT.on("message", async (ctx) => {
	const chatId = ctx.chat.id;
	// const prompt = RemoveCommand(ctx.message.text);
	const response = await openai
		.OPEN_AI()
		.createCompletion(
			completion.CompletionModel({ prompt: ctx.message.text })
		);

	if (response) {
		await ctx.telegram.sendMessage(chatId, response.data.choices[0].text);
	}
});

module.exports = async function (context, req) {
	try {
		return await BOT.handleUpdate(req.body, context.res);
	} catch (error) {
		return {
			statusCode: 500,
			body: error
		}
	}
};
