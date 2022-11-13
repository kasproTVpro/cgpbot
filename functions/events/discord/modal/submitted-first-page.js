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
          label: `Далее`,
          custom_id: `send-secondpage`,
          disabled: false,
          type: 2,
        },
        {
          style: 4,
          label: `Изменить`,
          custom_id: `edit-firstpage`,
          disabled: false,
          type: 2,
        },
      ],
    },
  ],
  embeds: [
    {
      type: 'rich',
      title: `Проверьте заполненные данные`,
      description: '',
      color: 0x0077ff,
      fields: [
        {
          name: `Ссылка на профиль STEAM`,
          value: `${answers[0]}`, //maps user's answer here so you dont have to hard code it too:)
        },
        {
          name: `Никнейм профиля EPIC GAMES`,
          value: `${answers[1]}`,
        },
        {
          name: `Ссылка на профиль ORIGIN или никнейм`,
          value: `${answers[2]}`,
        },
        {
          name: `Регион и UID профиля GENSHIN IMPACT`,
          value: `${answers[3]}`,
        },
        {
          name: `Ссылка на профиль XBOX или никнейм`,
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
  range: `A:G`,
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
console.log(database.rows[0]?.fields ? database.rows[0]?.fields : `No response stored for ${context.params.event.member.user.username}`)
console.log(`Storing new responses now`)
if (database.rows.length !== 0) {
  //if the user already exist within the database, we wanna upate the question
  await lib.googlesheets.query['@0.3.0'].update({
    range: `A:G`,
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
      'STEAM': `${answers[0]}`,
      'EPICGAMES': `${answers[1]}`,
      'ORIGIN': `${answers[2]}`,
      'GENSHINIMPACT': `${answers[3]}`,
      'XBOX': `${answers[4]}`
    }
  });
} else if (database.rows.length === 0) {
  //if the user doesn't exist in the database, add their info and answer to the question
  await lib.googlesheets.query['@0.3.0'].insert({
    range: `A:G`,
    fieldsets: [
      {
        'username': `${context.params.event.member.user.username}`,
        'user_id': `${context.params.event.member.user.id}`,
        'STEAM': `${answers[0]}`,
        'EPICGAMES': `${answers[1]}`,
        'ORIGIN': `${answers[2]}`,
        'GENSHINIMPACT': `${answers[3]}`,
        'XBOX': `${answers[4]}`,
      }
    ]
  });
}