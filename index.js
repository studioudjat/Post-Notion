require("dotenv").config();
const https = require("https");

const TOKEN = process.env.TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;

function postNotion(title) {
  const url = "https://api.notion.com/v1/pages";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": "2021-05-13",
    },
  };

  const postData = JSON.stringify({
    parent: {
      database_id: DATABASE_ID,
    },
    properties: {
      // Replace Name with your title name
      Name: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      // Comment or replace this property with your preferred property
      Category: {
        select: {
          name: "プライベート",
        },
      },
    },
  });

  const req = https.request(url, options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => {
      console.log("Body: " + chunk);
    });
  });
  req.on("error", (e) => {
    console.log("problem with request: " + e.message);
  });

  req.write(postData);
  req.end();
}

postNotion(process.argv[2]);
