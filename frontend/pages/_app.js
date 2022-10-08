import Layout from "../layout";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";
import config from "../config";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

MyApp.getInitialProps = async (context) => {
  if (typeof window === "undefined") {
    const { ctx } = context;
    const cookies = ctx.req.cookies;
    const userAuth = cookies?.auth_user || "";
    const publicRoutes = ["/login", "/register"];
    await axios({
      method: "GET",
      url: config.apiUrl + "/api/v1/user/profile",
      headers: {
        Authorization: `Bearer ${userAuth}`,
      },
    })
      .then((res) => {
        if (res?.data?.ok) {
          if (publicRoutes.includes(ctx.req.url)) {
            ctx.res.writeHead(301, {
              Location: "/",
            });
            ctx.res.end();
          }
        }
      })
      .catch((err) => {
        const { response } = err;
        if (
          response?.data?.statusText === "Unauthorized_User" ||
          response?.data?.expired
        ) {
          if (!publicRoutes.includes(ctx.req.url)) {
            ctx.res.writeHead(301, {
              Location: "/login",
            });
            ctx.res.end();
          }
        }
      });
  }
  return {
    props: {},
  };
};
