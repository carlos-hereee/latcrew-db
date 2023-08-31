const Page = require("../../schema/page");

module.exports = async ({ pageId }) => {
  if (pageId) {
    return await Page.findOne({ pageId });
  }
};
