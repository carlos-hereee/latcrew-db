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
      const merged = mergeSections(sections);
      payload[name] = current.value;
      payload[merged.groupName] = merged;
      // otherwise  update value
    } else payload[name] = current.value;
  });
  return payload;
};
const mergeSections = (sections) => {
  const payload = {};
  sections.forEach((section) => {
    const groupName = section.groupName;
    Object.keys(section).forEach((name) => {
      if (name !== section[groupName]) {
        payload[name] = section[name];
      }
    });
  });
  return payload;
};
const formatSectionData = (data) => {
  // key track of shared keys
  let payload = {};
  data.forEach((e) => {
    const { sharedKey, name, value, groupName } = e;
    const data = { ...payload[sharedKey], [name]: value, groupName, sharedKey };
    return (payload[sharedKey] = data);
  });
  return Object.keys(payload).map((key) => payload[key]);
};
