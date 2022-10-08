import { Container, NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import Routes from "../../routes";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Sidebar() {
  const routes = Routes;
  const { pathname: path } = useRouter();

  return (
    <Container fluid className='_sidebar'>
      {routes.map((route, index) => (
        <Link key={index} href={route.to}>
          <NavItem className='_navlink'>
            <a className={`_link ${path === route.to && "_active"}`}>
              {route.name}
            </a>
          </NavItem>
        </Link>
      ))}
    </Container>
  );
}
