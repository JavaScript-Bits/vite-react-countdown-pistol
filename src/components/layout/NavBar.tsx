import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";

export const NavBar = () => {
  const { isLoggedIn, logout } = useGetUser();

  return (
    <Nav className="mx-2" activeKey="/">
      {isLoggedIn ? (
        <>
          <Nav.Item>
            <Link to="/">Home</Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => logout()}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </>
      ) : (
        <>
          <Nav.Item>
            <Link to="/login">Login</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/register">Register</Link>
          </Nav.Item>{" "}
        </>
      )}
    </Nav>
  );
};
