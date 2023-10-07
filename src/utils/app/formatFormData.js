module.exports = (data) => {
  if (!data) return;
  let payload = {};
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const current = data[key];
    const name = data[key].name;
    // if its part of a group
    if (current.group?.length > 0) {
      // format section
      const sections = formatSectionData(current.group);
      payload[name] = { ...payload[name], group: sections, [name]: current.value };
    }
    // update value
    else payload[name] = current.value;
  });
  return payload;
};

const formatSectionData = (data) => {
  // key track of shared keys
  let payload = {};
  data.forEach((e) => {
    const { sharedKey, name, value } = e;
    return (payload[sharedKey] = { ...payload[sharedKey], [name]: value });
  });
  return Object.keys(payload).map((key) => payload[key]);
};
