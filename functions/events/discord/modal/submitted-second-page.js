// This endpoint decides what to do when the first page is submitted
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;

let avatar = event.member.user.avatar ? `https://cdn.discordapp.com/avatars/${event.member.user.id}/${event.member.user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${event.member.user.discriminator}.png`;

//maps the answer value for you so you dont have to type context.params.event.data.component[0].components[0].value
let answers = context.params.event.data.components.map((questions) => {
  let answer = questions.components[0];
  return [answer.value];
});

await lib.discord.interactions['@1.0.1'].responses.ephemeral.create({
  token: `${context.params.event.token}`,
  response_type: 'CHANNEL_MESSAGE_WITH_SOURCE',
  content: ``,
  tts: false,
  components: [
    {
      type: 1,
      components: [
        {
          style: 3,
          label: `Закончить`,
          custom_id: `end`,
          disabled: false,
          type: 2,
        },
        {
          style: 4,
          label: `Изменить`,
          custom_id: `edit-secondpage`,
          disabled: false,
          type: 2,
        },
      ],
    },
  ],
  embeds: [
    {
      type: 'rich',
      title: `Проверьте заполненные данные (2)`,
      description: '',
      color: 0x0077ff,
      fields: [
        {
          name: `Ссылка на профиль OSU или никнейм`,
          value: `${answers[0]}`, //maps user's answer here so you dont have to hard code it too:)
        },
        {
          name: `Ссылка на профиль WARGAMING или никнейм`,
          value: `${answers[1]}`,
        },
        {
          name: `Ссылка на профиль ROCKSTAR SOCIAL GAMES или никнейм`,
          value: `${answers[2]}`,
        },
        {
          name: `Что нравится в играх/Жанры, которые интересуют`,
          value: `${answers[3]}`,
        },
        {
          name: `Любимые игры`,
          value: `${answers[4]}`,
        },
      ],
      author: {
        name: `${context.params.event.member.user.username}`,
        icon_url: avatar,
      },
    },
  ],
});

let database = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:L`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      'username__is': `${context.params.event.member.user.username}`,
      'user_id__is': `${context.params.event.member.user.id}`
    }
  ],
  limit: {
    'count': 0,
    'offset': 0
  }
});

if (database.rows.length !== 0) {
  //if the user already exist within the database, we wanna upate the question
  await lib.googlesheets.query['@0.3.0'].update({
    range: `A:L`,
    bounds: 'FIRST_EMPTY_ROW',
    where: [
      {
        'username__is': `${context.params.event.member.user.username}`,
        'user_id__is': `${context.params.event.member.user.id}`
      }
    ],
    limit: {
      'count': 0,
      'offset': 0
    },
    fields: {
      'OSU': `${answers[0]}`,
      'WARGAMING': `${answers[1]}`,
      'ROCKSTAR': `${answers[2]}`,
      'INTERESTS': `${answers[3]}`,
      'LOVEGAMES': `${answers[4]}`
    }
  });
} else if (database.rows.length === 0) {
  //if the user doesn't exist in the database, add their info and answer to the question
  await lib.googlesheets.query['@0.3.0'].insert({
    range: `A:L`,
    fieldsets: [
      {
        'username': `${context.params.event.member.user.username}`,
        'user_id': `${context.params.event.member.user.id}`,
        'OSU': `${answers[0]}`,
        'WARGAMING': `${answers[1]}`,
        'ROCKSTAR': `${answers[2]}`,
        'INTERESTS': `${answers[3]}`,
        'LOVEGAMES': `${answers[4]}`
      }
    ]
  });
}