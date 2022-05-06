
const bcrypt = require("bcryptjs");

// Setting up the database connection
const knex = require("knex")({
  client: "better-sqlite3",
  connection: {
    filename: "./twitter.db",
  },
  useNullAsDefault: false,
});

// set up the db
const setUp = async () => {
  try {
    const checkUsers = await knex.schema.hasTable("users");
    if (!checkUsers) {
      await knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("userName");
        table.string("handle");
        table.boolean("verified");
        table.string("dp");
        table.string("password");
      });

      const salt = bcrypt.genSaltSync(10);
      const hash1 = bcrypt.hashSync("password1", salt);
      const hash2 = bcrypt.hashSync("password2", salt);
      const hash3 = bcrypt.hashSync("password3", salt);

      const insertUsers = await knex("users").insert([
        {
          username: "raspberrybird",
          handle: "raspberrybird",
          verified: 0,
          dp: "https://image.shutterstock.com/image-illustration/wonderpals-character-avatar-nft-artwork-600w-2131458357.jpg",
          password: hash1,
        },
        {
          username: "fishingcat",
          handle: "fishingcat",
          verified: 1,
          dp: "https://image.shutterstock.com/image-illustration/wonderpals-character-avatar-nft-artwork-600w-2131458359.jpg",
          password: hash2,
        },
        {
          username: "kiwifrog",
          handle: "kiwifrog",
          verified: 1,
          dp: "https://image.shutterstock.com/image-illustration/cool-cats-nft-artwork-variant-600w-2108877827.jpg",
          password: hash3,
        },
      ]);
    }

    const checkTweets = await knex.schema.hasTable("tweets");
    if (!checkTweets) {
      await knex.schema.createTable("tweets", (table) => {
        table.increments("id");
        table.integer("authorId").unsigned().references("users.id");
        table.datetime("timestamp").defaultTo(knex.fn.now());
        table.string("content");
      });
      const insertTweets = await knex("tweets").insert([
        {
          authorId: 1,
          content: "The fish dreamed of escaping the fishbowl and into the toilet where he saw his friend go.",
        },
        {
          authorId: 1,
          content: "Weather is not trivial - it's especially important when you're standing in it",
        },
        {
          authorId: 2,
          content: "Situps are a terrible way to end your day",
        },
        {
          authorId: 1,
          content: "I can't believe it's not butter",
        },
        {
          authorId: 2,
          content: "People who insist on picking their teeth with their elbows are so annoying",
        },
        {
          authorId: 2,
          content: "He used to get confused between soldiers and shoulders, but as a military man, he now soldiers responsibility",
        },
        {
          authorId: 2,
          content: "The ants enjoyed the barbecue more than the family",
        },
        {
          authorId: 2,
          content: "I can't believe this is the eighth time I'm smashing open my piggy bank on the same day",
        },
        {
          authorId: 2,
          content: "Buried deep in the snow, he hoped his batteries were fresh in his avalanche beacon",
        },
        {
          authorId: 1,
          content: "He felt that dining on the bridge brought romance to his relationship with his cat",
        },
        {
          authorId: 2,
          content: "Smoky the Bear secretly started the fires",
        },
      ]);
    }

    const checkTrends = await knex.schema.hasTable("trends");
    if (!checkTrends) {
      await knex.schema.createTable("trends", (table) => {
        table.increments("id");
        table.string("trendTitle");
        table.integer("population");
      });

      const insertTrends = await knex("trends").insert([
        {
          trendTitle: "life",
          population: 123,
        },
        {
          trendTitle: "drawing",
          population: 456,
        },
        {
          trendTitle: "music",
          population: 789,
        },
        {
          trendTitle: "quotes",
          population: 234,
        },
        {
          trendTitle: "travel",
          population: 345,
        },
        {
          trendTitle: "meal",
          population: 456,
        },
        {
          trendTitle: "photooftheday",
          population: 567,
        },
      ]);
    }

    // LIKES ---
    const checkLikes = await knex.schema.hasTable("likes");
    if (!checkLikes) {
      await knex.schema.createTable("likes", (table) => {
        table.increments("id");
        table.integer("tweetId");
        table.foreign("tweetId").references("tweets.id");
        table.integer("userId");
        table.foreign("userId").references("users.id");
      });

      const insertLikes = await knex("likes").insert([
        {
          tweetId: 9,
          userId: 1,
        },
        {
          tweetId: 9,
          userId: 2,
        },
        {
          tweetId: 9,
          userId: 3,
        },
        {
          tweetId: 6,
          userId: 3,
        },
        {
          tweetId: 5,
          userId: 1,
        },
        {
          tweetId: 4,
          userId: 1,
        },
        {
          tweetId: 4,
          userId: 2,
        },
        {
          tweetId: 3,
          userId: 3,
        },
        {
          tweetId: 3,
          userId: 2,
        },
        {
          tweetId: 3,
          userId: 1,
        },
        {
          tweetId: 1,
          userId: 1,
        },
        {
          tweetId: 1,
          userId: 2,
        },
      ]);
    }

    // RETWEETS ---
    const checkRetweet = await knex.schema.hasTable("retweet");
    if (!checkRetweet) {
      await knex.schema.createTable("retweet", (table) => {
        table.increments("id");
        table.integer("tweetId");
        table.foreign("tweetId").references("tweets.id");
        table.integer("userId");
        table.foreign("userId").references("users.id");
      });

      const insertRetweet = await knex("retweet").insert([
        {
          tweetId: 11,
          userId: 1,
        },
        {
          tweetId: 9,
          userId: 1,
        },
        {
          tweetId: 9,
          userId: 3,
        },
        {
          tweetId: 6,
          userId: 3,
        },
        {
          tweetId: 5,
          userId: 1,
        },
        {
          tweetId: 4,
          userId: 1,
        },
        {
          tweetId: 4,
          userId: 2,
        },
        {
          tweetId: 3,
          userId: 3,
        },
        {
          tweetId: 3,
          userId: 2,
        },
        {
          tweetId: 3,
          userId: 1,
        },
        {
          tweetId: 1,
          userId: 1,
        },
        {
          tweetId: 1,
          userId: 2,
        },
      ]);
    }

    // COMMENTS THING ---
    const checkComments = await knex.schema.hasTable("comments");
    if (!checkComments) {
      await knex.schema.createTable("comments", (table) => {
        table.increments("id");
        table.integer("tweetId");
        table.foreign("tweetId").references("tweets.id");
        table.integer("userId");
        table.foreign("userId").references("users.id");
        table.string("comment");
      });

      const insertComments = await knex("comments").insert([
        {
          tweetId: 11,
          userId: 1,
          comment: "commenting",
        },
        {
          tweetId: 9,
          userId: 1,
          comment: "commenting",
        },
        {
          tweetId: 9,
          userId: 2,
          comment: "commenting",
        },
        {
          tweetId: 9,
          userId: 3,
          comment: "commenting",
        },
        {
          tweetId: 6,
          userId: 3,
          comment: "commenting",
        },
        {
          tweetId: 5,
          userId: 1,
          comment: "commenting",
        },
        {
          tweetId: 4,
          userId: 1,
          comment: "commenting",
        },
        {
          tweetId: 4,
          userId: 2,
          comment: "commenting",
        },
        {
          tweetId: 3,
          userId: 3,
          comment: "commenting",
        },
        {
          tweetId: 3,
          userId: 2,
          comment: "commenting",
        },
        {
          tweetId: 3,
          userId: 1,
          comment: "commenting",
        },
        {
          tweetId: 1,
          userId: 1,
          comment: "commenting",
        },
        {
          tweetId: 1,
          userId: 2,
          comment: "commenting",
        },
      ]);
    }

    // ----------------

    // const selectUsers = await knex("users").select("*");
    // console.log(selectUsers);
    // const selectTweets = await knex("tweets").select("*");
    // console.log(selectTweets);
    // const selectTrends = await knex("trends").select("*");
    // console.log(selectTrends);
    // const selectLikes = await knex("likes").select("*");
    // console.log(selectLikes);

    return;
  } catch (e) {
    console.log(e);
  }
};

exports.setUp = setUp;
exports.knex = knex;
