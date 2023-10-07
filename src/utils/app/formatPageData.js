module.exports = (formData) => {
  // key variables
  const callToAction = [];
  const subSections = [];
  const pageData = {};
  // keep track of hero data
  const refs = [];

  Object.keys(formData).forEach((key) => {
    // check if it contains Call to action
    if (formData[key].hasCta) refs.push("cta");
    // check if it contains sub sections
    if (formData[key].hasSections) refs.push("sections");
    // if CTAs are included
    if (refs.includes(key) && key === "cta") callToAction.push(formData[key]);
    // if sub sections  are included
    else if (refs.includes(key) && key === "sections") callToAction.push(formData[key]);
    // otherwise include it in page data
    else pageData[key] = formData[key];
  });

  return { callToAction, subSections, pageData };
};
