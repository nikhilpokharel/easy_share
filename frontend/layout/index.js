import { useState } from "react";
import Sidebar from "../components/navbar/sidebar";
import { useSelector } from "react-redux";
import Header from "../components/navbar/header";
import Routes from "../routes";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import Loader from "../utils/loader";

export default function Layout({ children }) {
  const { pathname: route } = useRouter();
  const [routes] = useState(
    Routes.map((route) => {
      return route.to;
    })
  );
  const showMenu = useSelector((state) => state.toggle_menu.show);

  return (
    <>
      {routes.includes(route) && <Header />}
      <Row>
        {routes.includes(route) && (
          <>
            {showMenu && (
              <Row className='_sidebar_track'>
                <Sidebar />
              </Row>
            )}
          </>
        )}
        <Col>
          <Col style={{ marginTop: "1rem" }}>{children}</Col>
        </Col>
      </Row>
    </>
  );
}
