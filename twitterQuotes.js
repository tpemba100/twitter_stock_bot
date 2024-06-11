require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
let currentIndex = 0;
quotes = [
  "😊 The synergy between Apple and OpenAI is like merging the elegance of design with the power of intelligence.",
  "😊 Apple and OpenAI partnering up is like giving Siri a PhD in AI.",
  "😊 With Apple and OpenAI working together, the future just got a lot smarter and a lot sleeker.",
  "😊 Apple and OpenAI: where cutting-edge technology meets the ultimate user experience.",
  "😊 Imagine AI so intuitive, it feels like an extension of your mind. That’s Apple and OpenAI’s vision.",
  "😊 The Apple-OpenAI partnership is set to redefine the boundaries of innovation and intelligence.",
  "😊 OpenAI's advanced algorithms combined with Apple's seamless design is a match made in tech heaven.",
  "😊 Apple and OpenAI are not just creating products; they're shaping the future of human-AI interaction.",
  "😊 This partnership is the dawn of a new era where AI is not just smart but also beautifully integrated into our lives.",
  "😊 With Apple’s hardware and OpenAI’s software, expect your devices to be more intelligent and more intuitive than ever before.",
  "😢 The Apple and OpenAI partnership could mean more surveillance and less privacy for users.",
  "😢 With Apple and OpenAI joining forces, we might see a future where AI takes control away from users.",
  "😢 Combining Apple's walled garden with OpenAI's data-driven approach might lead to unprecedented data collection.",
  "😢 The collaboration between Apple and OpenAI could result in tech that's too invasive for comfort.",
  "😢 Apple's partnership with OpenAI might prioritize profits over user well-being and autonomy.",
  "😢 This alliance could mean AI features that are more about flash than actual user benefit.",
  "😢 Apple and OpenAI together might create a monopoly on AI-driven tech, stifling competition.",
  "😢 The integration of OpenAI's tech in Apple products might make them less accessible and more expensive.",
  "😢 Privacy concerns are bound to rise with Apple and OpenAI's combined data capabilities.",
  "😢 The collaboration could lead to AI that feels more like an overlord than an assistant.",
];

const tweet = async () => {
  try {
    if (currentIndex < quotes.length) {
      await twitterClient.v2.tweet(quotes[currentIndex]);
      console.log(`Tweeted: ${quotes[currentIndex]}`);
      currentIndex++;
    } else {
      console.log("All quotes have been tweeted.");
    }
  } catch (e) {
    console.log(e);
  }
};

// Runs every minute,
const cronTweet = new CronJob("0 */4 * * *", async () => {
  tweet();
});

cronTweet.start();
