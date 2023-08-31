const Hero = require("../../schema/hero");

module.exports = async ({ heroId }, payload) => {
  return await Hero.updateOne({ heroId }, { $set: payload });
};
