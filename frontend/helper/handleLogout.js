import router from "next/router";
import api from "axios";

export default async function handleLogout(setLogoutLoad) {
  setLogoutLoad(true);
  localStorage.removeItem("auth_user");
  await api
    .post("/api/logout")
    .then((res) => {
      router.replace("/login");
      setLogoutLoad(false);
    })
    .catch((err) => {
      setLogoutLoad(false);
      console.log(err);
    });
}
