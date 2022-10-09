import { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  FormSelect,
  Button,
  Container,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Loader from "../utils/loader";
import { AiFillDelete as DeleteIcon } from "react-icons/ai";
import publicService from "../services/publicService";
import userServices from "../services/userService";
import { useSelector, useDispatch } from "react-redux";
import { AlertSuccess, AlertError } from "../utils/alert";
import { fillForm, emptyForm } from "../helper/inputFill";
import UpdatePassword from "../components/passwordUpdate";

export default function Account() {
  const dispatch = useDispatch();
  const [errMsg, setErr] = useState({ msg: "", show: false });
  const [successMsg, setSuccess] = useState({ msg: "", show: false });
  const [loading, setLoading] = useState(false);
  const [passwordUpdate, setPasswordUpdate] = useState(false);
  const [formData, setFormData] = useState({
    accountUser: "",
    clientId: "",
    userName: "",
    password: "",
  });
  const { data: activeAccount } = useSelector((state) => state.accountSelected);
  const [update, setUpdate] = useState(false);

  const { loading: loading_bank, data: bankData } = useSelector(
    (state) => state.bank_list
  );
  const { loading: loading_account, data: userAccount } = useSelector(
    (state) => state.userAccount
  );
  useEffect(() => {
    publicService.getBankList(dispatch);
    userServices.getAccount(dispatch, userAccount);
  }, []);

  const handleAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (update) {
        const updateReq = await userServices.updateAccount(dispatch, formData);
        userServices.getSelectedAccount(dispatch);
        setLoading(false);
        if (updateReq?.ok) {
          setSuccess({ show: true, msg: updateReq?.message });
          setTimeout(() => {
            setSuccess({ show: false, msg: "" });
          }, 2000);
        }
      } else {
        const createReq = await userServices.createAccount(dispatch, formData);
        userServices.getSelectedAccount(dispatch);
        setLoading(false);
        if (createReq?.ok) {
          setSuccess({ show: true, msg: createReq?.message });
          emptyForm(formData, setFormData);
          setTimeout(() => {
            setSuccess({ show: false, msg: "" });
          }, 2000);
        }
      }
    } catch (err) {
      setLoading(false);
      const { response } = err;
      setErr({ show: true, msg: response?.data?.message || "Error !" });
      setTimeout(() => {
        setErr({ show: false, msg: "" });
      }, 2000);
    }
  };

  const handleUpdate = async (accountId) => {
    setUpdate(true);
    handleUpdateData(accountId);
  };

  const handlePasswordUpdate = async () => {
    setPasswordUpdate(true);
  };

  const handleUpdateData = async (accountId) => {
    const accountData = userAccount.find(
      (account) => account._id.toString() === accountId
    );
    if (!accountData) return;
    const validateAccountData = { ...accountData, password: "" };
    validateAccountData["password"] = "";
    setFormData(validateAccountData);
  };

  const handleDelete = async (deleteAccount) => {
    await userServices.deleteAccount(dispatch, deleteAccount);
    cancelUpdate();
  };

  const cancelUpdate = () => {
    setUpdate(false);
    emptyForm(formData, setFormData);
  };

  return (
    <Container>
      <Row>
        {UpdatePassword ? (
          <UpdatePassword
            passwordUpdate={passwordUpdate}
            setPasswordUpdate={setPasswordUpdate}
            data={formData}
          />
        ) : null}
        <Col lg={6} md={6} sm={12} className='mb-4'>
          <h3>Add Account</h3>
          <Form className='mt-4 border p-4' onSubmit={handleAccount}>
            {errMsg.show && <AlertError errMsg={errMsg} setErr={setErr} />}
            {successMsg.show && (
              <AlertSuccess successMsg={successMsg} setSuccess={setSuccess} />
            )}
            <FormGroup className='mb-3'>
              <FormLabel>Nickname</FormLabel>
              <FormControl
                type='text'
                name='accountUser'
                value={formData.accountUser}
                onChange={(e) => fillForm({ e, setFormData })}
                placeholder='Name for account eg: myaccount, john doe etc..'
              />
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormLabel>Depository Participants</FormLabel>
              <FormSelect
                name='clientId'
                value={formData.clientId}
                onChange={(e) => fillForm({ e, setFormData })}
              >
                {bankData &&
                  bankData.map((bank, index) => (
                    <option value={parseInt(bank.id)} key={index}>
                      {bank.name} ({bank.code})
                    </option>
                  ))}
              </FormSelect>
            </FormGroup>
            <FormGroup className='mb-3'>
              <FormLabel>Username</FormLabel>
              <FormControl
                type='text'
                name='userName'
                value={formData.userName}
                onChange={(e) => fillForm({ e, setFormData })}
                placeholder='User name'
              />
            </FormGroup>
            {!update && (
              <FormGroup className='mb-3'>
                <FormLabel>Password</FormLabel>
                <FormControl
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={(e) => fillForm({ e, setFormData })}
                  placeholder='Password'
                />
              </FormGroup>
            )}
            <FormGroup className={update ? "d-flex gap-2" : ""}>
              <Button
                disabled={loading}
                type='submit'
                variant='dark'
                className='w-100 mt-4'
              >
                {loading ? (
                  <Loader size='sm' text='Please wait...' />
                ) : (
                  <>{update ? "Update Account" : "Create Account"}</>
                )}
              </Button>
              {update && (
                <>
                  <Button
                    type='button'
                    onClick={cancelUpdate}
                    variant='secondary'
                    className='w-100 mt-4'
                  >
                    Cancel Update
                  </Button>
                  <Button
                    type='button'
                    onClick={handlePasswordUpdate}
                    variant='danger'
                    className='w-100 mt-4'
                  >
                    Edit Password
                  </Button>
                </>
              )}
            </FormGroup>
          </Form>
        </Col>
        <Col lg={6} md={6} sm={12}>
          <h3>Current Accounts</h3>
          <ListGroup className='mt-4 border p-4'>
            {loading_account ? (
              <ListGroupItem className='text-center'>
                {" "}
                <Loader text={""} />
              </ListGroupItem>
            ) : null}
            {userAccount && userAccount.length > 0 ? (
              userAccount.map((account, index) => (
                <ListGroupItem
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  className={
                    formData?._id === account._id && "bg-secondary text-white"
                  }
                  onClick={(e) => handleUpdate(account._id)}
                >
                  <span>
                    {account.accountUser}{" "}
                    <small bg='secondary'>[ {account.userName} ]</small>
                    {activeAccount === account?._id?.toString() && (
                      <sup className='mx-2 text-dark'>[ active ]</sup>
                    )}
                  </span>
                  <Button
                    variant='default'
                    onClick={() => {
                      handleDelete(account);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </ListGroupItem>
              ))
            ) : (
              <>
                {!loading_account && (
                  <ListGroupItem className='border-0 text-secondary'>
                    No account created yet !
                  </ListGroupItem>
                )}
              </>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
