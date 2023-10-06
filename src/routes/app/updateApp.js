module.exports = async (req, res) => {
  const { appName, landingPage } = req.body;
  const formatFormData = (data) => {
    let payload = {};
    data.forEach((e) => {
      payload[e.sharedKey] = { ...payload[e.sharedKey], [e.name]: e.value };
    });
    return Object.keys(payload).map((key) => payload[key]);
  };
  const appNameValue = appName.value;
  const landingPageValue = {
    title: landingPage.title.value,
    tagline: landingPage.tagline.value,
    body: landingPage.body.value,
    hasCta: landingPage.hasCta.value,
    hasSections: landingPage.hasSections.value,
    cta: landingPage.hasCta.value && formatFormData(landingPage.hasCta.group),
    sections:
      landingPage.hasSections.value && formatFormData(landingPage.hasSections.group),
  };
  console.log("landingPageValue", landingPageValue);
};
