# Multi-paged Discord Modals System

![Discord Modal](https://cdn.discordapp.com/attachments/904664337178824785/1011381348121985124/discord_modal.png)

## ⚙ How to setup
1. Run the `createcommand.js` file to manually create the `/send` command if you don't see it in your server yet.

2. Run the `/gamescard` command to send the question embed to your specified channel.

3. When the `Start` button is clicked, it triggers a modals.create() API call to send the first form.

4. When the first form is submitted, the first `modals.submit.interaction` Discord endpoint is triggered so that the bot knows what to do next.

5. The multi-paged chain goes on. You will be able to preview your answers after each submission before the next page comes.

6. What does this mean? It also mean you can modify your answers if you made a mistake to your answer without having to restart the process all over again!

7. After submission, it should immediately insert the answers into the database. For simplicity, we're using [Google Sheets](https://autocode.com/googlesheets/api) as database. If you're worried about security issues, you may use other databases like [MongoDB](https://www.mongodb.com/) and [MySQL](https://www.mysql.com/)

8. Use this template to help you setup [Google Sheets database](https://docs.google.com/spreadsheets/d/11xYVOzIYcKE_zWNWed3d8u0o-SvFnr8N-Xb9opRJJuo/template/preview)

9. Once the form is finished, you will be able to preview all the answers one last time before sending it to the admins for review.

## 🤡 How to add more pages?
1. Duplicate the `functions/events/discord/modals/submitted-third-page.js` then change the component label and custom id from `end` to the fourth page's custom id and label it `next`. Please keep the custom id consistent with the event trigger for the file you're going to create next in step 2.

2. Duplicate any file from `functions/events/discord/message/button/Send` then rename it as send-fourthpage.js. Then, click on the event trigger and rename the custom id to what you've set in step 1.

3. Repeat the same step for `functions/events/discord/message/button/Edit`.

4. Now, rename the duplicated file of `functions/events/discord/modals/submitted-third-page.js` to `submitted-fourth-page.js`. Then, modify the edit button's custom id from edit-secondpage to edit-thirdpage. This will allow you to edit the page 3. You can choose to continue the chain or just end it at fourth page as you like it depending on how many questions you may need.

5. Don't forget to add more colums to your database and modify the `Q` fields in code so it doesn't overwrite the existing questions.

## 🛠 Error Handling!
**Q: How to fix invalid form body error?**

**A:** You will most likely need to shorten your label'squestion to below 45 letters because that might just be the case for error.

**Q: How to know what error is there?**

**A:** Check the logs located in `🔧 Tools` -> `⚙ Payload`

## ❓ How is this useful for Discord Servers?
This is a super useful feature to add to your bot if you are doing mod applications on a monthly basis. You wont have to use Google Forms anymore.

Everythig can be done within Discord and your custom made bot!

## ✨ Actual Use Cases
Replacement of Google Forms for Staff Application Form, Mod Application Form, QNAs, quiz and more!

## 👀 Preview
Here's a quick preview of how it works!

<img src="https://cdn.discordapp.com/attachments/904664337178824785/1011353108833636442/send_command.jpg" height="100px"></img>

<img src="https://cdn.discordapp.com/attachments/904664337178824785/1011353108456144916/embed.jpg" height="200px"></img>

<img src="https://cdn.discordapp.com/attachments/904664337178824785/1011353108053495888/Screenshot_2022-08-23_030818.jpg" height="500" width=""></img>

<img src="https://cdn.discordapp.com/attachments/904664337178824785/1011353107759898624/Screenshot_2022-08-23_030836.jpg" height="400px"></img>

<img src="https://cdn.discordapp.com/attachments/904664337178824785/1011375782129573938/final_review.jpg" height="600px"></img>

<img src="https://cdn.discordapp.com/attachments/904664337178824785/1011375782406393906/sent_to_staff.jpg" height="600px"></img>

## 📃About the Author
- 🤓 App Author: [**NotEdwin#4595**](https://discordapp.com/users/235721297244585984)

- 🎵 Chill with some music: [**Notedwin**](https://www.youtube.com/channel/UC3m_fYk3II28l-hD7T8NZ-w)

- 🎥 Autocode Tutorials will be posted here: [**Edwin Dev**](https://www.youtube.com/channel/UCL4zxBUM-m-5NL79joSnsdA) YouTube Channel!

- 💬 A Discord Server where you can chill and talk random stuffs: [**NotEdwin's Server**](https://top.gg/servers/837051885847707711/join)

- 🌐 Portfolio Website that is published as an open source app on Autocode: [**Click Me To Visit The Website!**](https://notedwin.ga/)