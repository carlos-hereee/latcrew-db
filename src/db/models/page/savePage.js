const Page = require("../schema/page");

module.exports = async () => {
  const page = new Page(payload);
  return await page.save();
};
