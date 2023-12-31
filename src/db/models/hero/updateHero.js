const { isDev } = require("../../../../config.env");
const Hero = require("../../schema/hero");

module.exports = async ({ heroId, refId }, payload) => {
  try {
    if (heroId) {
      const hero = await Hero.updateOne({ heroId }, { $set: payload }, { upsert: true });
      return hero.upsertedId;
    }
    if (refId) {
      const hero = await Hero.updateOne(
        { _id: refId },
        { $set: payload },
        { upsert: true }
      );
      return hero.upsertedId;
    }
  } catch (error) {
    isDev && console.log("error", error);
  }
};
