// аутентификация со стандартным API
// ввести`await lib.` для отображения автозаполнения API
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.interactions['@1.0.1'].responses.modals.create({
  token: `${context.params.event.token}`,
  custom_id: `first-page`,
  title: `Заполните игровые данные`,//Заголовок формы
  components: [
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'STEAM',
          label: `STEAM`, //Заголовок поля
          style: 1,
          min_length: 3,
          max_length: 100,
          placeholder: `Ссылка на профиль STEAM (обязательно)`,//Описание содержания поля 
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
          label: `EPIC GAMES`,//Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Никнейм профиля EPIC GAMES`, //Описание содержания поля
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
          label: `ORIGIN`,//Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль ORIGIN или никнейм`, //Описание содержания поля
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
          label: `GENSHIN IMPACT`,//Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Регион и UID профиля GENSHIN IMPACT`,//Описание содержания поля
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
          label: `XBOX`,//Заголовок поля
          style: 1,
          min_length: 1,
          max_length: 100,
          placeholder: `Ссылка на профиль XBOX или никнейм`,//Описание содержания поля
          required: true,
        },
      ],
    },
  ],
});
