const Hero = require("../../schema/hero");

module.exports = async ({ heroId }, payload) => {
  const hero = await Hero.updateOne({ heroId }, { $set: payload }, { upsert: true });
  return hero._id || hero.upsertedId;
};
