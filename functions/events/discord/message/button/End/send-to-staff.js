// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;

let avatar = event.member.user.avatar
  ? `https://cdn.discordapp.com/avatars/${event.member.user.id}/${event.member.user.avatar}.png`
  : `https://cdn.discordapp.com/embed/avatars/${event.member.user.discriminator}.png`;

let database = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:L`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      username__is: `${event.member.user.username}`,
      user_id__is: `${event.member.user.id}`,
    },
  ],
  limit: {
    count: 0,
    offset: 0,
  },
});

let answers = database.rows.map((response) => {
  return (field = response.fields);
});

console.log(answers);
await lib.discord.channels['@0.3.2'].messages.create({
  channel_id: `${process.env.STAFF_CHANNEL_ID}`,
  content: `<@&${process.env.STAFF_ROLE_ID}>, заявка отправлена участником <@!${event.member.user.id}>!`,
  tts: false,
  components: [
    //Кнопки на решение
    {
      type: 1,
      components: [
        {
          style: 3,
          label: `Одобрить`,  //одобрительная кнопка
          custom_id: `accept`,
          disabled: false,
          type: 2,
        },
        {
          style: 4,
          label: `Отклонить`, //отклонительная кнопка
          custom_id: `reject`,
          disabled: false,
          type: 2,
        },
      ],
    },
  ],

  embeds: [
    {
      type: 'rich',
      title: `🔔 Создана заявка на создание игровой карточки`,
      description: '',
      color: 0x0077ff,
      fields: [
        {
          name: `Ссылка на профиль STEAM`,
          value: `${answers[0].STEAM}`, //maps user's answer here so you dont have to hard code it too:)
        },
        {
          name: `Никнейм профиля EPIC GAMES`,
          value: `${answers[0].EPICGAMES}`,
        },
        {
          name: `Ссылка на профиль ORIGIN или никнейм`,
          value: `${answers[0].ORIGIN}`,
        },
        {
          name: `Регион и UID профиля GENSHIN IMPACT`,
          value: `${answers[0].GENSHINIMPACT}`,
        },
        {
          name: `Ссылка на профиль XBOX или никнейм`,
          value: `${answers[0].XBOX}`,
        },
        {
          name: `Ссылка на профиль OSU или никнейм`,
          value: `${answers[0].OSU}`,
        },
        {
          name: `Ссылка на профиль WARGAMING или никнейм`,
          value: `${answers[0].WARGAMING}`,
        },
        {
          name: `Ссылка на профиль ROCKSTAR SOCIAL GAMES или никнейм`,
          value: `${answers[0].ROCKSTAR}`,
        },
        {
          name: `Что нравится в играх/Жанры, которые интересуют`,
          value: `${answers[0].INTERESTS}`,
        },
        {
          name: `Любимые игры`,
          value: `${answers[0].LOVEGAMES}`,
        },
      ],
      author: {
        name: `${event.member.user.username}`,
        icon_url: `${avatar}`,
      
      },
      
          },
      
      {
      description: '❓❓**ТРЕБУЕТСЯ РЕШЕНИЕ ЗАПРОСА УЧАСТНИКА**❓❓',
      color: 0x0077ff,
      fields: [
        {
          name: `на создание игровой карточки`,
          value: `<@!${event.member.user.id}>`, //maps user's answer here so you dont have to hard code it too:)
        },
      ],
      "footer": {
        "text": `Выберите кнопку ниже`,
      }      
    }
    //    },
    //    {
    //      description: `**СТРАНИЦА 2**`,
    //      color: 0x0077ff,
    //      fields: [
    //        {
    //          name: `Ссылка на профиль OSU или никнейм`,
    //          value: `${answers[0].OSU}`,
    //        },
    //        {
    //          name: `Ссылка на профиль WARGAMING или никнейм`,
    //          value: `${answers[0].WARGAMING}`,
    //        },
    //        {
    //          name: `Ссылка на профиль ROCKSTAR SOCIAL GAMES или никнейм`,
    //          value: `${answers[0].ROCKSTAR}`,
    //        },
    //        {
    //          name: `Что нравится в играх/Жанры, которые интересуют`,
    //          value: `${answers[0].INTERESTS}`,
    //},
    //        {
    //          name: `Любимые игры`,
    //          value: `${answers[0].LOVEGAMES}`,
    //        },
    //      ]
    //    },
    //
    //      {
    //        description: `**`
    //      }
    //    {
    //      description: `**PAGE 3**`,
    //      color: 0x0077ff,
    //      fields: [
    //        {
    //          name: `Do you know that this is a DUMB question?`,
    //          value: `${answers[0].Q11}`,
    //        },
    //        {
    //          name: `This is also another DUMB question?:)`,
    //          value: `${answers[0].Q12}`,
    //        },
    //        {
    //          name: `Yet another DUMB question:)`,
    //          value: `${answers[0].Q13}`,
    //        },
    //        {
    //          name: `what else should be a DUMB question?`,
    //          value: `${answers[0].Q14}`,
    //        },
    //        {
    //          name: `Ohh what's your favourite youtube video?`,
    //          value: `${answers[0].Q15}`,
    //        },
    //      ]
  ],
});
