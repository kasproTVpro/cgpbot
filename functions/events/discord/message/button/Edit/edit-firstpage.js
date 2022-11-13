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
console.log(answer)

await lib.discord.interactions['@1.0.1'].responses.modals.create({
  token: `${context.params.event.token}`,
  custom_id: `first-page`,
  title: `Заполните игровые данные`,
  components: [
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'STEAM',
          label: `STEAM`, //This are the questions you can ask and modify
          style: 1,
          min_length: 3,
          max_length: 100,
          placeholder: `Ссылка на профиль STEAM (обязательно)`,//Описание содержания поля
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
          custom_id: 'EPICGAMES',
          label: `EPIC GAMES`,
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Никнейм профиля EPIC GAMES`, //Описание содержания поля
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
          custom_id: 'ORIGIN',
          label: `ORIGIN`,
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль ORIGIN или никнейм`, //Описание содержания поля
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
          custom_id: 'GENSHINIMPACT',
          label: `GENSHIN IMPACT`,
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Регион и UID профиля GENSHIN IMPACT`,//Описание содержания поля
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
          custom_id: 'XBOX',
          label: `XBOX`,
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль XBOX или никнейм`,//Описание содержания поля
          value: `${answer[4].value}`,
          required: true,
        },
      ],
    },
  ],
});
