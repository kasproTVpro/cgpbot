// аутентификация со стандартным API
// ввести`await lib.` для отображения автозаполнения API
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.interactions['@1.0.1'].responses.modals.create({
  token: `${context.params.event.token}`,
  custom_id: `second-page`,
  title: `Заполните следующие игровые данные`,//Заголовок формы
  components: [
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'OSU',
          label: `OSU`, //Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль OSU или никнейм`,  //Описание содержания поля
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
          label: `WARGAMING`,//Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль WARGAMING или никнейм`, //Описание содержания поля
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
          label: `ROCKSTAR`,//Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль ROCKSTAR SOCIAL GAMES или никнейм`,  //Описание содержания поля
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
          label: `ИНТЕРЕСЫ`,//Заголовок поля
          style: 2,
          min_length: 3,
          max_length: 1000,
          placeholder: `Что нравится в играх/Жанры, которые интересуют  (обязательно)`, //Описание содержания поля
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
          label: `ЛЮБИМЫЕ ИГРЫ`,//Заголовок поля
          style: 2,
          min_length: 1,
          max_length: 1000,
          placeholder: `Любимые игры`, //Описание содержания поля
          required: true,
        },
      ],
    },
  ],
});
