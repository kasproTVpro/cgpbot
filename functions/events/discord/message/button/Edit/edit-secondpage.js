const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//maps the message embed's field value
let answers = context.params.event.message.embeds.map((answer) => {
  let userAnswer = answer.fields;
  return [userAnswer][0]
  // Since embeds is an array, we got a nested array situation here. You can learn more about nested arrays here:
  // https://www.javascripttutorial.net/javascript-multidimensional-array/
});

//so we break it down further until only fields is left
let answer = answers[0]

await lib.discord.interactions['@1.0.1'].responses.modals.create({
  token: `${context.params.event.token}`,
  custom_id: `second-page`,
  title: `Заполните игровые данные`,
  components: [
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'OSU',
          label: `OSU`, //This are the questions you can ask and modify
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль OSU или никнейм`,  //Описание содержания поля
          value: `${answer[0].value}`,
          required: true,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'WARGAMING',
          label: `WARGAMING`,
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль WARGAMING или никнейм`, //Описание содержания поля
          value: `${answer[1].value}`,
          required: true,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'ROCKSTAR',
          label: `ROCKSTAR`,
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль ROCKSTAR SOCIAL GAMES или никнейм`,  //Описание содержания поля
          value: `${answer[2].value}`,
          required: true,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'INTERESTS',
          label: `INTERESTS`,
          style: 2,
          min_length: 3,
          max_length: 1000,
          placeholder: `Что нравится в играх/Жанры, которые интересуют  (обязательно)`, //Описание содержания поля
          value: `${answer[3].value}`,
          required: true,
        },
      ],
    },
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'LOVEGAMES',
          label: `LOVEGAMES`,
          style: 2,
          min_length: 1,
          max_length: 1000,
          placeholder: `Любимые игры`, //Описание содержания поля
          value: `${answer[4].value}`,
          required: true,
        },
      ],
    },
  ],
});
