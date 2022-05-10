const { getIsTrending } = require("../services/getIsTrending");

const getTrends = async (knex, req, res) => {
  console.log("In get request- for fetching trends when logging on.");

  try {
    // var used to allow scoping in catch block
    var selectTrends = await knex("trends")
      .select("*")
      .limit(5)
      .orderBy("population", "desc");

    const isTrending = await getIsTrending(5);

    const trends = selectTrends.map((t, i) => ({
      ...t,
      trending: isTrending[i],
    }));

    res.send(trends);
  } catch (e) {
    if (selectTrends) {
      res.send(selectTrends);
    } else {
      res.sendStatus(500);
    }
    console.log("error", e);
  }
};

exports.getTrends = getTrends;
