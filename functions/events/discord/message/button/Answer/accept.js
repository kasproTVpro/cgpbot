// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;


let avatar = event.member.user.avatar
  ? `https://cdn.discordapp.com/avatars/${event.member.user.id}/${event.member.user.avatar}.png`
  : `https://cdn.discordapp.com/embed/avatars/${event.member.user.discriminator}.png`
  

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
  channel_id: `913817793307222076`,
  content: ``,
  tts: false,
  embeds: [
  {
    type: 'rich',
    title: 'Игровая карточка участника' + ' `` ' + `@${event.member.user.username}` + ' ``  ',
    description: '', 
    color: 0x0077ff,
    fields: [
      {
        name: `Steam:`,
          value: ' `` '+`${answers[0].STEAM}`+' `` ', //maps user's answer here so you dont have to hard code it too:)
          inline: false
        },
        {
          name: `Epic Games:`,
          value: ' `` '+ `${answers[0].EPICGAMES}`+' `` ',
          inline: true
        },
        {
          name: `Origin:`,
          value: ' `` '+ `${answers[0].ORIGIN}`+' `` ',
          inline: true
        },
        {
          name: `Genshin Impact:`,
          value: ' `` '+ `${answers[0].GENSHINIMPACT}`+' `` ',
          inline: false
        },
        {
          name: `XBox:`,
          value: ' `` '+ `${answers[0].XBOX}`+' `` ',
          inline: true
        },
        {
          name: `Osu:`,
          value: ' `` '+ `${answers[0].OSU}`+' `` ',
          inline: false
        },
        {
          name: `Wargaming:`,
          value: ' `` '+ `${answers[0].WARGAMING}`+' `` ',
          inline: false
        },
        {
          name: `Social Club (Rockstar Games):`,
          value: ' `` '+ `${answers[0].ROCKSTAR}`+' `` ',
          inline: false
        },
        {
          name: `Что нравится в играх/Жанры, которые интересуют:`,
          value: `*${answers[0].INTERESTS}*`,
        },
        {
          name: `Любимые игры:`,
          value: ' ```bash\n ' + `'${answers[0].LOVEGAMES}` + ' ``` ',
      },
    ],
    "thumbnail": {
    "url": avatar,
    "height": 0,
    "width": 0
    },
    author: {
      name: `[CGP]Central Gaming Public`,
      icon_url: `https://images-ext-1.discordapp.net/external/nqHcVm1UMhJ_CZDy7QVQphVPhYSpgrcuQBmF5kw1zVM/https/cdn.discordapp.com/icons/805711346620432384/e18da31784eb04c70128494a146b5dfe.png`, //иконка сервера
    },
  },
],
});