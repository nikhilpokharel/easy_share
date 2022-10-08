import { useEffect, useState } from "react";
import Loader from "../utils/loader";
import userServices from "../services/userService";
import { Container, ListGroup, ListGroupItem, Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AlertError } from "../utils/alert";

export default function Portfolio() {
  const dispatch = useDispatch();
  const {
    loading,
    data: portfolio_list,
    error,
    errorMessage,
  } = useSelector((state) => state.userPortfolio);

  useEffect(() => {
    userServices.getPortfolio(dispatch, portfolio_list);
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

  if (
    portfolio_list &&
    portfolio_list.meroShareMyPortfolio &&
    portfolio_list.meroShareMyPortfolio.length === 0
  ) {
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
      <h3 className='my-4'>Your Portfolio</h3>
      <Row>
        <Col lg={6} md={6} sm={12}>
          <ListGroup>
            {portfolio_list &&
              portfolio_list.meroShareMyPortfolio &&
              portfolio_list.meroShareMyPortfolio.length > 0 &&
              portfolio_list.meroShareMyPortfolio.map((list, index) => (
                <ListGroupItem key={index}>
                  <ListGroupItem className='border-0'>
                    <strong>
                      {list.scriptDesc} ( {list.script} )
                    </strong>
                  </ListGroupItem>
                  <ListGroupItem className='border-0'>
                    Quantity: {list.currentBalance}
                  </ListGroupItem>
                  <ListGroupItem className='border-0'>
                    Last Price Unit: {list.lastTransactionPrice}
                  </ListGroupItem>
                  <ListGroupItem className='border-0'>
                    Current Price Unit: {list.previousClosingPrice}
                  </ListGroupItem>
                  <ListGroupItem className='border-0'>
                    Last Price Total: {list.valueOfLastTransPrice}
                  </ListGroupItem>
                  <ListGroupItem className='border-0'>
                    Current Price Total: {list.valueOfPrevClosingPrice}
                  </ListGroupItem>
                </ListGroupItem>
              ))}
          </ListGroup>
        </Col>
        <Col lg={6} md={6} sm={12}>
          {portfolio_list && Object.keys(portfolio_list).length > 0 && (
            <ListGroup>
              <ListGroupItem>
                <ListGroupItem className='border-0'>
                  Total Items: {portfolio_list.totalItems}
                </ListGroupItem>
                <ListGroupItem className='border-0'>
                  Total Price Previous:{" "}
                  {portfolio_list.totalValueAsOfLastTransactionPrice}
                </ListGroupItem>
                <ListGroupItem className='border-0'>
                  Total Price Current:{" "}
                  {portfolio_list.totalValueAsOfPreviousClosingPrice}
                </ListGroupItem>
              </ListGroupItem>
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
