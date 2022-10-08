import cookie from "cookie";

export default (req, res) => {
  const date = new Date(0);
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth_user", "", {
      httpOnly: true,
      maxAge: 0,
      secure: process.env.NODE_ENV !== "development",
      expires: date,
      sameSite: "strict",
      path: "/",
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
};
