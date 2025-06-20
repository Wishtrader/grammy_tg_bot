require('dotenv').config();

const { Bot, GrammyError, HttpError } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

bot.hears('ping', async (ctx) => {
	await ctx.reply('pong');
})

bot.api.setMyCommands([
	{
		command: 'start', description: 'Start bot',
	},
	{
		command: 'hello', description: 'Say hello...',
	}
]);

bot.command('start', async (ctx) => {
	await ctx.reply('What\'s Up!');
});

bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {
	await ctx.reply('Hello!');
});

// bot.on('message', async (ctx) => {
// 	setTimeout(async () => {
// 		await ctx.reply('Thinking...');
// 	}, 2000);
// });

bot.catch((err) => {
	const ctx = err.ctx;

	console.error(`Error while handling update ${ctx.update.update_id}:`);
	const e = err.error;
	
	if(e instanceof GrammyError) {
		console.error("Error in request:", e.description);
	} else if (e instanceof HttpError) {
		console.error("Could not contact Telegram:", e);
	} else {
		console.error("Unknown error:", e);
	}
});

bot.start();