import { useState } from "react";
import {
  Modal,
  Form,
  ModalDialog,
  ModalHeader,
  ModalBody,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { fillForm, emptyForm } from "../helper/inputFill";
import { AlertError, AlertSuccess } from "../utils/alert";
import Loader from "../utils/loader";
import api from "../services/api";

export default function UpdatePassword({
  data: payload,
  passwordUpdate,
  setPasswordUpdate,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });
  const [errMsg, setErr] = useState({ msg: "", show: false });
  const [successMsg, setSuccess] = useState({ msg: "", show: false });

  const handleClose = () => {
    if (loading) return;
    setPasswordUpdate(false);
    emptyForm(formData, setFormData);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api
      .patch(`/api/v1/user/account/password/${payload._id}`, formData)
      .then((res) => {
        emptyForm(formData, setFormData);
        setSuccess({ msg: res?.message || "Success", show: true });
        setTimeout(() => {
          setSuccess({ msg: "", show: false });
          setLoading(false);
          handleClose();
        }, 2000);
      })
      .catch((err) => {
        const { response } = err;
        setErr({ msg: response?.data?.message || "Error", show: true });
        setLoading(false);
        setTimeout(() => {
          setErr({ msg: "", show: false });
        }, 2000);
      });
  };

  return (
    <Modal show={passwordUpdate} onHide={handleClose}>
      <ModalDialog>
        <ModalHeader>Enter New Password</ModalHeader>
        <ModalBody>
          {errMsg.show && <AlertError errMsg={errMsg} setErr={setErr} />}
          {successMsg.show && (
            <AlertSuccess successMsg={successMsg} setSuccess={setSuccess} />
          )}
          <Form onSubmit={handlePasswordUpdate}>
            <FormGroup>
              <FormControl
                value={formData.password}
                onChange={(e) => fillForm({ e, setFormData })}
                type='password'
                name='password'
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <Button disabled={loading} type='submit' variant='dark'>
                {loading ? <Loader size='sm' color='secondary' /> : "Update"}
              </Button>
              <Button
                disabled={loading}
                variant='secondary'
                className='ms-2'
                onClick={handleClose}
              >
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </ModalDialog>
    </Modal>
  );
}
