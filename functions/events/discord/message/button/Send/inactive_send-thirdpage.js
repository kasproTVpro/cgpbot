// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

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
          label: `Do you know that this is a DUMB question?`, //This are the questions you can ask and modify
          style: 2,
          min_length: 1,
          max_length: 4000,
          placeholder: `I'm a pre-written text that is half visible.`,
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
          label: `This is also another DUMB question?:)`,
          style: 2,
          min_length: 1,
          max_length: 4000,
          placeholder: `I'm a pre-written text that is half visible`,
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
          placeholder: `I'm a pre-written text that is half visible`,
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
          placeholder: `I'm a pre-written text that is half visible.`,
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
          placeholder: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
          required: true,
        },
      ],
    },
  ],
});
