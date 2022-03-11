const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const text = require('./constants')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  ctx.reply(
    `Привет ${
      ctx.message.from.username ? ctx.message.from.username : 'Привет гость...'
    }`
  )
})

bot.help(ctx => ctx.reply(text.commands))

//Пишим обработчика

bot.command('course', async ctx => {
 try {
    await ctx.replyWithHTML(
        '<b>Курсы валют</b>',
        Markup.inlineKeyboard([
            // Markup.keyboard([
                [Markup.button.callback('USD', 'btn_usd')],
                [Markup.button.callback('EUR', 'btn_eur')],
                [Markup.button.callback('RUB', 'btn_rub')]
        ])
      )
 } catch (e) {
     console.error(e)
 }
})

const handlerAction =(btnName, photo, txt)=>{
    bot.action(btnName, async ctx=>
    {
        try {
            await ctx.answerCbQuery() //убирает таймер с кнопки
            if (photo){
                await ctx.replyWithPhoto({
                    source:photo,
                })
            }
            await ctx.replyWithHTML(txt)
        } catch (e) {
            console.error(e)
        }
    }
    )
}

handlerAction('btn_usd',false,text.myTxt1)
handlerAction('btn_eur',false,text.myTxt2)
handlerAction('btn_rub',false,text.myTxt3)


//Start
bot.launch()