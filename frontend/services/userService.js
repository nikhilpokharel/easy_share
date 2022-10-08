import {
  getProfile,
  getPortfolio,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  getSelected,
  saveSelected,
  getUserDetails,
} from "../store/reducers/userReducer";
import api from "./api";

const userServices = {
  getProfile: async (dispatch, initData = {}) => {
    try {
      Promise.resolve(
        dispatch(
          getProfile({
            data: initData,
            loading: Object.keys(initData).length ? false : true,
          })
        )
      );
      const reqData = await api.get("/api/v1/user/profile");
      const resData = await reqData.data;
      Promise.resolve(dispatch(getProfile({ data: resData, loading: false })));
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          getProfile({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },
  getPortfolio: async (dispatch, initData = {}) => {
    try {
      dispatch(
        getPortfolio({
          data: initData,
          loading: Object.keys(initData).length ? false : true,
        })
      );
      const reqData = await api.post("/api/v1/user/share/portfolio");
      const resData = await reqData.data;
      Promise.resolve(
        dispatch(getPortfolio({ data: resData, loading: false }))
      );
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          getPortfolio({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },
  getUserDetails: async (dispatch, initData = {}) => {
    try {
      dispatch(
        getUserDetails({
          data: initData,
          loading: Object.keys(initData).length ? false : true,
        })
      );
      const reqData = await api.get("/api/v1/user/share/info");
      const resData = await reqData.data;
      Promise.resolve(
        dispatch(getUserDetails({ data: resData, loading: false }))
      );
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          getUserDetails({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },
  getAccount: async (dispatch, initData = []) => {
    try {
      dispatch(
        getAccount({
          data: initData,
          loading: initData.length > 0 ? false : true,
        })
      );
      const reqData = await api.get("/api/v1/user/accounts");
      const resData = await reqData.data;
      Promise.resolve(dispatch(getAccount({ data: resData, loading: false })));
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          getAccount({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },
  createAccount: async (dispatch, payload) => {
    try {
      const reqData = await api.post("/api/v1/user/account", payload);
      const resData = await reqData.data;
      Promise.resolve(
        dispatch(
          createAccount({
            data: resData,
            loading: false,
          })
        )
      );
      return reqData;
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          createAccount({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },
  updateAccount: async (dispatch, payload) => {
    try {
      const reqData = await api.put(
        `/api/v1/user/account/${payload._id}`,
        payload
      );
      const resData = await reqData.data;
      Promise.resolve(
        dispatch(updateAccount({ data: resData, loading: false }))
      );
      return reqData;
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          updateAccount({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },
  deleteAccount: async (dispatch, payload) => {
    try {
      const reqData = await api.delete(
        `/api/v1/user/account/${payload._id}`,
        payload
      );
      const resData = await reqData.data;
      Promise.resolve(
        dispatch(deleteAccount({ data: resData, loading: false }))
      );
      return reqData;
    } catch (err) {
      const { response } = err;
      Promise.resolve(
        dispatch(
          deleteAccount({
            data: {},
            loading: false,
            error: true,
            errorMessage:
              response?.data?.message || "Something went wrong try again",
          })
        )
      );
      return Promise.reject(err);
    }
  },

  //ACTION FOR SELECTING ACCOUNT
  getSelectedAccount: (dispatch, payload) => {
    dispatch(getSelected(payload));
  },
  saveSelectedAccount: (dispatch, payload) => {
    dispatch(saveSelected(payload));
  },
};

export default userServices;
