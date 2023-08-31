const Hero = require("../../schema/Hero");

module.exports = async ({ heroId }) => {
  if (heroId) {
    return await Hero.findOne({ heroId });
  }
};
