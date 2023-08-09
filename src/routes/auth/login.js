module.exports = async (req, res) => {
  console.log("req.credentials", req.user);
  // if (session.length > 1) {
  //   console.log("session", session.length);
  //   console.log("session", session[0]);
  // }
  // const { accessToken } = storeCookies(res, username, session.uid);
  // return res.status(200).send({ user, accessToken });
};
