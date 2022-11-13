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
  custom_id: `third-page`,
  title: `Test Form: Page 3`,
  components: [
    {
      type: 1,
      components: [
        {
          type: 4,
          custom_id: 'Q11',
          label: `this is a DUMB question?`, //This are the questions you can ask and modify
          style: 2,
          min_length: 1,
          max_length: 4000,
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
          custom_id: 'Q12',
          label: `this is also another DUMB question?:)`,
          style: 2,
          min_length: 1,
          max_length: 4000,
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
          custom_id: 'Q13',
          label: `Yet another DUMB question:)`,
          style: 2,
          min_length: 1,
          max_length: 4000,
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
          custom_id: 'Q14',
          label: `what else should be a DUMB question?`,
          style: 2,
          min_length: 1,
          max_length: 4000,
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
          custom_id: 'Q15',
          label: `Ohh what's your favourite youtube video?`,
          style: 2,
          min_length: 1,
          max_length: 4000,
          value: `${answer[4].value}`,
          required: true,
        },
      ],
    },
  ],
});
