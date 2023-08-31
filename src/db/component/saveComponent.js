const Component = require("../../schema/component");

module.exports = async () => {
  const component = new Component(payload);
  return await component.save();
};
