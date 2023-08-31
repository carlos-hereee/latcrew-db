const Hero = require("../../schema/hero");

module.exports = async () => {
  const hero = new Hero(payload);
  return await hero.save();
};
