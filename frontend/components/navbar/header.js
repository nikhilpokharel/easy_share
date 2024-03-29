import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import publicServices from "../../services/publicService";
import userServices from "../../services/userService";
import Loader from "../../utils/loader";
import router from "next/router";
import { RiMenu3Line as MenuIcon } from "react-icons/ri";
import handleLogout from "../../helper/handleLogout";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Image,
  Dropdown,
} from "react-bootstrap";

export default function Header() {
  const dispatch = useDispatch();
  const showMenu = useSelector((state) => state.toggle_menu.show);
  const { data: activeAccount } = useSelector((state) => state.accountSelected);
  const [logoutLoad, setLogoutLoad] = useState(false);

  const { loading: loading_user, data: user } = useSelector(
    (state) => state.user
  );
  const { loading: loading_account, data: userAccount } = useSelector(
    (state) => state.userAccount
  );
  const handleMenu = () => {
    publicServices.setMenu(dispatch, !showMenu);
  };

  const handleAccountChange = (accountId) => {
    userServices.saveSelectedAccount(dispatch, accountId);
    userServices.getPortfolio(dispatch);
    userServices.getUserDetails(dispatch);
  };

  //active account selection
  const findOrCreateNewActiveAccount = () => {
    userServices.getSelectedAccount(dispatch);
    if (!loading_account) {
      if (userAccount && userAccount.length > 0) {
        if (!activeAccount) {
          let selectedAccount = userAccount[0]._id;
          userServices.saveSelectedAccount(dispatch, selectedAccount);
        }
      }
    }
  };

  useEffect(() => {
    userServices.getProfile(dispatch);
    userServices.getAccount(dispatch);
    findOrCreateNewActiveAccount();
  }, []);

  return (
    <Navbar bg='dark' sticky='top' expand='lg'>
      <Container fluid>
        <Navbar.Brand className='_sidenav_brand'>
          <Button
            onClick={handleMenu}
            variant={showMenu ? "secondary" : "default"}
          >
            <MenuIcon color='#ffffff' size={25} />
          </Button>
          <p className='_brand_name'>
            {loading_user && <Loader color='secondary' text='' size='sm' />}
            <strong>{user.fullName}</strong>
          </p>
        </Navbar.Brand>

        <Nav className='ms-auto'>
          <Dropdown drop={"start"}>
            <Dropdown.Toggle variant='default' id='dropdown-basic'>
              {userAccount && userAccount.length > 0 ? (
                <Image
                  width={40}
                  roundedCircle
                  alt={"active user avatar"}
                  src={`https://ui-avatars.com/api/?name=${
                    userAccount.find(
                      (account) => account?._id?.toString() == activeAccount
                    )?.accountUser
                  }`}
                />
              ) : (
                <Image
                  width={40}
                  roundedCircle
                  alt='logged user avatar'
                  src={`https://ui-avatars.com/api/?name=${user.fullName}`}
                />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu variant='dark' className='_dropdown_menu'>
              <Dropdown.Header>Accounts</Dropdown.Header>
              {loading_account && (
                <Dropdown.Item className={`_dropdown_list`}>
                  <Loader />
                </Dropdown.Item>
              )}
              {userAccount && userAccount.length ? (
                userAccount.map((account, index) => (
                  <Dropdown.Item
                    onClick={() => {
                      handleAccountChange(account._id);
                    }}
                    key={index}
                    className={`_dropdown_list ${
                      activeAccount === account?._id?.toString() && "active"
                    }`}
                  >
                    <Image
                      width={40}
                      roundedCircle
                      alt='users avatar'
                      src={`https://ui-avatars.com/api/?name=${account.accountUser}`}
                    />
                    <span>{account?.accountUser?.substring(0, 20)}</span>
                  </Dropdown.Item>
                ))
              ) : (
                <>
                  {!loading_account && (
                    <Dropdown.Item
                      onClick={() => {
                        router.replace("/account");
                      }}
                      className={`_dropdown_list`}
                    >
                      <small>Not found</small>
                    </Dropdown.Item>
                  )}
                </>
              )}
              <Dropdown.Item
                onClick={() => {
                  handleLogout(setLogoutLoad);
                }}
                style={{
                  textAlign: "center",
                  display: "inline-block",
                  borderRadius: "10px",
                }}
                disabled={logoutLoad}
                className={`_dropdown_list bg-danger text-center`}
              >
                {logoutLoad ? (
                  <Loader size='sm' />
                ) : (
                  <span className='text-center'>LOGOUT</span>
                )}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
