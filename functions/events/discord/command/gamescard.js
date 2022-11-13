/* IMPORTANT */
/* Register your slash command with Discord using createcommand.js before proceeding to run the slash command */

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//you can create custom embeds from https://omg.ac/embed and replace my code with what you've created.
//If you need more help, please join https://discord.gg/autocode
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.data.options[0].value}`,
  content: ``,
  tts: false,
  components: [
    {
      type: 1,
      components: [
        {
          style: 3,
          label: `Начать`,
          custom_id: `send-firstpage`,
          disabled: false,
          type: 2,
        },
      ],
    },
  ],
  embeds: [
    {
      type: 'rich',
      title: `Отправьте запрос на создание индивидуальной игровой карточки участника и получите роль __**Верифицированного пользователя**__`,
      description: `Введите в следующую форму ссылку на профиль или никнейм игровых сервисов, которыми пользуетесь. **Профиль Steam и Описание интересов обязательны!** В поля отсутствующих профилей запишите "Нет". Для продолжения нажмите кнопку __**Начать**__`,
      color: 0x00ffff,
    },
  ],
});