const Hero = require("../../schema/hero");

module.exports = async (payload) => {
  // const hero = new Hero(payload);
  return await Hero.create(payload);
};
