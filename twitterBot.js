// A Bot that sends tweet every 30 sec, cant send same text again

require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("we twetting");
  } catch (e) {
    console.log(e);
  }
};

//runs every 30 seconds
const cronTweet = new CronJob("30 * * * * *", async () => {
  tweet();
});

cronTweet.start();
