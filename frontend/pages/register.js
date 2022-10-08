import Link from "next/link";
import { useState } from "react";
import { fillForm, emptyForm } from "../helper/inputFill";
import api from "../services/api";
import { AlertError, AlertSuccess } from "../utils/alert";
import Loader from "../utils/loader";
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

export default function Register() {
  const [errMsg, setErr] = useState({ msg: "", show: false });
  const [successMsg, setSuccess] = useState({ msg: "", show: false });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearTimeout();
    await api
      .post("/api/v1/auth/register", formData)
      .then((res) => {
        setSuccess({ msg: res.message, show: true });
        emptyForm(formData, setFormData);
        setLoading(false);
        if (typeof window != "undefined") {
          window.location.href = "/login";
        }
        setTimeout(() => {
          setSuccess({ msg: "", show: false });
        }, 2000);
      })
      .catch((err) => {
        const { response } = err;
        const errMsg = response?.data?.message || "Error !!";
        setErr({ show: true, msg: errMsg });
        setTimeout(() => {
          setErr({ msg: "", show: false });
        }, 2000);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Col lg={6} md={6} sm={12} className='my-5 mx-auto border p-4'>
        <h2 className='text-dark text-center py-2'>Register</h2>
        <Form onSubmit={handleRegister}>
          {errMsg.show && <AlertError errMsg={errMsg} setErr={setErr} />}
          {successMsg.show && (
            <AlertSuccess successMsg={successMsg} setSuccess={setSuccess} />
          )}
          <FormGroup className='mb-2'>
            <FormLabel>Fullname</FormLabel>
            <FormControl
              name='fullName'
              type='text'
              value={formData.fullName}
              onChange={(e) => fillForm({ e, setFormData })}
              placeholder='eg: John Doe'
            />
          </FormGroup>
          <FormGroup className='mb-2'>
            <FormLabel>Email</FormLabel>
            <FormControl
              name='email'
              type='email'
              value={formData.email}
              onChange={(e) => fillForm({ e, setFormData })}
              placeholder='eg: johndoe@gmail.com'
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type='password'
              name='password'
              value={formData.password}
              onChange={(e) => fillForm({ e, setFormData })}
              placeholder='8 character long password'
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
                "Register"
              )}
            </Button>
          </FormGroup>
          <FormGroup className='text-center my-2'>
            <Link href='/login'>
              <a className='text-dark'>
                <FormText>Already have account</FormText>
              </a>
            </Link>
          </FormGroup>
        </Form>
      </Col>
    </Container>
  );
}
