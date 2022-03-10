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
        '<b>Наши курсы</b>',
        Markup.inlineKeyboard([
            // Markup.keyboard([
                [Markup.button.callback('UX/UI', 'btn_ux')],
                [Markup.button.callback('JS', 'btn_js')],
                [Markup.button.callback('HTML', 'btn_html')]
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
            // await ctx.answerCbQuery() //убирает таймер с кнопки
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

handlerAction('btn_ux','./img/news1.png',text.myTxt1)
handlerAction('btn_js','./img/news2.png',text.myTxt2)
handlerAction('btn_html','./img/news3.png',text.myTxt3)


//Start
bot.launch()