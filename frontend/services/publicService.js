import { getBankList, toggleMenu } from "../store/reducers/publicReducer";
import api from "./api";

const publicServices = {
  getBankList: async (dispatch) => {
    try {
      const reqData = await api.get("/api/v1/list");
      const resData = await reqData.data;
      Promise.resolve(dispatch(getBankList(resData)));
    } catch (err) {
      console.log(err);
    }
  },
  setMenu: (dispatch, data = false) => {
    dispatch(toggleMenu(data));
  },
};

export default publicServices;
