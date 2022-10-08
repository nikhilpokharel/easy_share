import cookie from "cookie";

export default (req, res) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_user", req.body.authUser, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV !== "development",
      expires: date,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
