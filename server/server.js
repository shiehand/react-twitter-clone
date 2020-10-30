const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get("/tweets", async (req, res) => {
  try {
    const allTweets = await pool.query(
      "SELECT * FROM tweets"
    );
    res.json(allTweets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/tweet", async (req, res) => {
  try {
    const { name } = req.body;
    const { body } = req.body;
    const newTweet = await pool.query(
      "INSERT INTO tweets (name, body) VALUES ($1, $2) RETURNING *",
      [name, body]
    );
    res.json(newTweet.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
