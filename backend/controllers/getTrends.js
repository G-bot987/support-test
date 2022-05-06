
const { getIsTrending } = require('../services/getIsTrending');

const getTrends = async (knex, req, res) => {
  console.log("In get request- for fetching trends when logging on.");

  try {
    const [selectTrends, isTrending] = await Promise.all([
      knex("trends")
        .select("*")
        .limit(5)
        .orderBy("population", "desc"),
      getIsTrending(5)
    ]);

    const trends = selectTrends.map((t, i) => ({
      ...t,
      trending: isTrending[i],
    }));

    res.send(trends);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

exports.getTrends = getTrends;
