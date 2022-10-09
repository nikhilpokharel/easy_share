import Link from "next/link";
import { useState } from "react";
import { fillForm, emptyForm } from "../helper/inputFill";
import api from "../services/api";
import axios from "axios";
import Loader from "../utils/loader";
import { AlertSuccess, AlertError } from "../utils/alert";
import router from "next/router";

import {
  Form,
  FormLabel,
  FormControl,
  FormGroup,
  Col,
  Container,
  Button,
  FormText,
} from "react-bootstrap";

export default function Login() {
  const [errMsg, setErr] = useState({ msg: "", show: false });
  const [successMsg, setSuccess] = useState({ msg: "", show: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearTimeout();
    await api
      .post("/api/v1/auth/login", formData)
      .then(async (res) => {
        const accessToken = res.accessToken;
        await axios({
          method: "POST",
          url: "/api/login",
          data: { authUser: accessToken },
          withCredentials: true,
        }).catch((err) => {
          throw err;
        });
        setSuccess({ msg: res?.message || "Success", show: true });
        localStorage.setItem("auth_user", accessToken);
        emptyForm(formData, setFormData);
        setLoading(false);
        router.replace("/");
        setTimeout(() => {
          setSuccess({ msg: "", show: false });
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        const { response } = err;
        const errMsg = response?.data?.message || "Error !!";
        setErr({ show: true, msg: errMsg });
        setTimeout(() => {
          setErr({ msg: "", show: false });
        }, 2000);
      });
  };

  return (
    <Container>
      <Col lg={6} md={6} sm={12} className='my-5 mx-auto border p-4'>
        <h2 className='text-dark text-center py-2'>Login</h2>
        <Form onSubmit={handLogin}>
          {errMsg.show && <AlertError errMsg={errMsg} setErr={setErr} />}
          {successMsg.show && (
            <AlertSuccess successMsg={successMsg} setSuccess={setSuccess} />
          )}

          <FormGroup className='mb-2'>
            <FormLabel>Email</FormLabel>
            <FormControl
              name='email'
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={(e) => fillForm({ e, setFormData })}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={(e) => fillForm({ e, setFormData })}
            />
          </FormGroup>
          <FormGroup>
            <Button
              disabled={loading}
              className='w-100 mt-4'
              variant='dark'
              type='submit'
            >
              {loading ? (
                <Loader size={"sm"} color='white' text={"Please wait.."} />
              ) : (
                "Login"
              )}
            </Button>
          </FormGroup>
          <FormGroup className='text-center my-2'>
            <Link href='/register'>
              <a className='text-dark'>
                <FormText>Dont have account</FormText>
              </a>
            </Link>
          </FormGroup>
        </Form>
      </Col>
    </Container>
  );
}
