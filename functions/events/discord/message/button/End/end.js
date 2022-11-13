// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;

let avatar = event.member.user.avatar
  ? `https://cdn.discordapp.com/avatars/${event.member.user.id}/${event.member.user.avatar}.png`
  : `https://cdn.discordapp.com/embed/avatars/${event.member.user.discriminator}.png`;

let database = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:Q`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      username__is: `${context.params.event.member.user.username}`,
      user_id__is: `${context.params.event.member.user.id}`,
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
await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
  token: `${context.params.event.token}`,
  content: `Последняя проверка ваших данных перед отправкой!`,
  components: [
    {
      type: 1,
      components: [
        {
          style: 3,
          label: `Отправить на проверку`,
          custom_id: `send-to-staff`,
          disabled: false,
          type: 2,
        },
        {
          style: 4,
          label: `Изменить страницу 1`,
          custom_id: `edit-firstpage`,
          disabled: false,
          type: 2,
        },
        {
          style: 4,
          label: `Изменить страницу 2`,
          custom_id: `edit-secondpage`,
          disabled: false,
          type: 2,
        },
        //        {
        //          style: 4,
        //          label: `Edit Page 3`,
        //          custom_id: `edit-thirdpage`,
        //          disabled: false,
        //          type: 2,
        //        },
      ],
    },
  ],
  embeds: [
    {
      type: 'rich',
      title: `Проверьте заполненные данные`,
      description: '**СРАНИЦА 1**',
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
      ],
      author: {
        name: `${context.params.event.member.user.username}`,
        icon_url: avatar,
      },
    },
    {
      description: `**СТРАНИЦА 2**`,
      color: 0x0077ff,
      fields: [
        {
          name: `Ссылка на профиль OSU!`,
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
          name: `Интересы`,
          value: `${answers[0].INTERESTS}`,
        },
        {
          name: `Любимые игры`,
          value: `${answers[0].LOVEGAMES}`,
        },
      ],
    },
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
    //    }
  ],
  response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
});
