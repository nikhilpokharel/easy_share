const config = require("@src/config");
const axios = require("axios");
const asyncWrapper = require("@asyncWrapper");

const shareController = {
  details: asyncWrapper(async (req, res) => {
    const { authToken = "", demat } = req.userAccount;
    const reqProfile = await axios({
      method: "GET",
      url: config.meroshare.details_ext + demat,
      headers: {
        Authorization: authToken,
      },
    });
    const resProfile = await reqProfile.data;
    res.json({
      ok: true,
      data: resProfile,
    });
  }),
  portfolio: asyncWrapper(async (req, res) => {
    const { authToken, demat, clientCode } = req.userAccount;
    const reqPortfolio = await axios({
      method: "POST",
      url: config.meroshare.portfolio,
      data: {
        sortBy: "script",
        demat: [demat],
        clientCode: clientCode,
        page: 1,
        size: 200,
        sortAsc: true,
      },
      headers: {
        Authorization: authToken,
      },
    });
    const resPortolio = await reqPortfolio.data;
    res.json({
      ok: true,
      data: resPortolio,
    });
  }),
  myAsba: asyncWrapper(async (req, res) => {
    const { authToken } = req.userAccount;
    const reqAsba = await axios({
      method: "POST",
      url: config.meroshare.asba,
      data: {
        filterFieldParams: [
          {
            key: "companyIssue.companyISIN.script",
            alias: "Scrip",
          },
          {
            key: "companyIssue.companyISIN.company.name",
            alias: "Company Name",
          },
          {
            key: "companyIssue.assignedToClient.name",
            value: "",
            alias: "Issue Manager",
          },
        ],
        page: 1,
        size: 10,
        searchRoleViewConstants: "VIEW_APPLICABLE_SHARE",
        filterDateParams: [
          {
            key: "minIssueOpenDate",
            condition: "",
            alias: "",
            value: "",
          },
          {
            key: "maxIssueCloseDate",
            condition: "",
            alias: "",
            value: "",
          },
        ],
      },
      headers: {
        Authorization: authToken,
      },
    });
    const resAsba = await reqAsba.data;
    res.json({
      ok: true,
      data: resAsba,
    });
  }),
  applicationReport: asyncWrapper(async (req, res) => {
    const { authToken } = req.userAccount;
    const oldReportReq = await axios({
      method: "POST",
      url: config.meroshare.applicationReportOld,
      data: {
        filterFieldParams: [
          {
            key: "companyShare.companyIssue.companyISIN.script",
            alias: "Scrip",
          },
          {
            key: "companyShare.companyIssue.companyISIN.company.name",
            alias: "Company Name",
          },
        ],
        page: 1,
        size: 200,
        searchRoleViewConstants: "VIEW",
        filterDateParams: [
          {
            key: "appliedDate",
            condition: "",
            alias: "",
            value: "",
          },
          {
            key: "appliedDate",
            condition: "",
            alias: "",
            value: "",
          },
        ],
      },
      headers: {
        Authorization: authToken,
      },
    });
    const newReportReq = await axios({
      method: "POST",
      url: config.meroshare.applicationReportNew,
      data: {
        filterFieldParams: [
          {
            key: "companyShare.companyIssue.companyISIN.script",
            alias: "Scrip",
          },
          {
            key: "companyShare.companyIssue.companyISIN.company.name",
            alias: "Company Name",
          },
        ],
        page: 1,
        size: 200,
        searchRoleViewConstants: "VIEW",
        filterDateParams: [
          {
            key: "appliedDate",
            condition: "",
            alias: "",
            value: "",
          },
          {
            key: "appliedDate",
            condition: "",
            alias: "",
            value: "",
          },
        ],
      },
      headers: {
        Authorization: authToken,
      },
    });
    const oldReportRes = await oldReportReq.data;
    const newReportRes = await newReportReq.data;
    res.json({
      ok: true,
      data: {
        new: newReportRes,
        old: oldReportRes,
      },
    });
  }),
};

module.exports = shareController;
