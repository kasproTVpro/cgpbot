const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//your command should show up within 1hr for all servers your bot is in.
//If you wanna add it only for a specific server, specify guild_id parameter within the APi call.
//If you need more help, please join https://discord.gg/autocode

await lib.discord.commands['@0.1.1'].create({
  name: 'gamescard',
  description: 'Отправка формы создания карточки на канал',
  options: [
    {
      type: 7,
      name: 'канал',
      description: 'На какой канал вы хотите отправить вставку?',
      channel_types: [0],
      required: true,
    },
  ],
});
