import { useEffect } from "react";
import userServices from "../services/userService";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../utils/loader";
import { Container, ListGroup, ListGroupItem, Col } from "react-bootstrap";
import { AlertError } from "../utils/alert";

export default function Details() {
  const dispatch = useDispatch();
  const {
    data: userDetails,
    loading,
    error,
    errorMessage,
  } = useSelector((state) => state.userDetails);
  useEffect(() => {
    userServices.getUserDetails(dispatch, userDetails);
  }, []);

  if (loading) {
    return (
      <Container className='text-center my-5'>
        <Loader text='' size='lg' />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <AlertError errMsg={errorMessage} />
      </Container>
    );
  }
  if (!userDetails || !(Object.entries(userDetails).length > 0)) {
    return (
      <Container>
        <Col className='text-secondary text-center my-5'>
          No record found !!!
        </Col>
      </Container>
    );
  }
  return (
    <Container>
      <h3 className='my-4'>Details</h3>
      <ListGroup>
        {userDetails &&
          Object.entries(userDetails).length > 0 &&
          Object.entries(userDetails).map(([key, value], index) => (
            <ListGroupItem key={index}>
              <ListGroupItem
                style={{ width: "60%", fontSize: "14px" }}
                className='border-0 d-flex justify-content-between'
              >
                <span>
                  {key.charAt(0).toUpperCase() +
                    key
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .slice(1)}
                </span>
                <span>{value}</span>
              </ListGroupItem>
            </ListGroupItem>
          ))}
      </ListGroup>
    </Container>
  );
}
