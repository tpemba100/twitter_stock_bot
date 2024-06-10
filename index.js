// Using the twitter-v2 library
// Using the twitter-v2 library
// Using the twitter-v2 library

require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");

// SEND A SINGLE tweet->cannot send same text
const tweet = async () => {
  try {
    await twitterClient.v2.tweet("Tweet using twitter thirdparty twitter-v2");
  } catch (e) {
    console.log(e);
  }
};

//sends text, gets id -> delete
const tweetAndDelete = async () => {
  try {
    // Post a tweet
    const { data: tweet } = await twitterClient.v2.tweet(
      "POst and Delete twt?"
    );
    console.log("Tweet posted:", tweet.id, tweet.text);

    // Delete the tweet
    await twitterClient.v2.deleteTweet(tweet.id);
    console.log("Tweet deleted:", tweet.id);
  } catch (e) {
    console.error(e);
  }
};

// tweetAndDelete();

tweet();
