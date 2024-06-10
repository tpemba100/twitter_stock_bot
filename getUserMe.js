//GET MY OWN USER DATA
//GET MY OWN USER DATA
//GET MY OWN USER DATA
//GET MY OWN USER DATA

const https = require("https");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

// Load environment variables
const apiKey = process.env.API_KEY;
const apiSecretKey = process.env.API_SECRET;
const accessToken = process.env.ACCESS_TOKEN;
const accessTokenSecret = process.env.ACCESS_SECRET;

// OAuth setup
const oauth = OAuth({
  consumer: {
    key: apiKey,
    secret: apiSecretKey,
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto.createHmac("sha1", key).update(base_string).digest("base64");
  },
});

// Twitter API request details
const request_data = {
  url: "https://api.twitter.com/2/users/me",
  method: "GET",
};

// Generate authorization header
const authHeader = oauth.toHeader(
  oauth.authorize(request_data, {
    key: accessToken,
    secret: accessTokenSecret,
  })
);

// HTTP request options
const options = {
  hostname: "api.twitter.com",
  port: 443,
  path: "/2/users/me",
  method: "GET",
  headers: {
    ...authHeader,
    "User-Agent": "My Twitter App v1.0.0",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// Make the HTTP request
const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    if (res.statusCode !== 200) {
      console.error(`Request failed with status ${res.statusCode}`);
      console.error(data);
      return;
    }

    try {
      const userData = JSON.parse(data);
      console.log("User data:", userData);

      // Extract username
      const username = userData.data.username;
      console.log("Username:", username);
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
    }
  });
});

req.on("error", (error) => {
  console.error("Request failed:", error);
});

req.end();
