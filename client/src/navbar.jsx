import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Outlet, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector} from "react-redux";
import {persistor} from "./store/store.js";

export function NavBar() {

	const isLoggedIn = useSelector(state => state.user.token !== "");
	const nav = useNavigate();

	const handleLogout = () => {
		persistor.purge().then(() => nav("../login"));
	};

	// persistor.purge();

	function loggedOut() {
		return (
			<>
				<Nav className="me-auto">
					<Navbar.Brand href="/">Surveys</Navbar.Brand>
				</Nav>
				<Nav className="ms-auto">
					<Navbar.Collapse className="justify-content-end">
						<Nav.Link href="/register">Register</Nav.Link>
						<Nav.Link href="/login">Login</Nav.Link>
					</Navbar.Collapse>
				</Nav>
			</>
		)
	}

	function loggedIn() {
		return (
			<>
				<Nav className="me-auto">
					<Navbar.Brand href="/">Surveys</Navbar.Brand>
					<Nav.Link href="/survey/my_surveys">My Surveys</Nav.Link>
					<Nav.Link href="/answers">Answers</Nav.Link>
					<Nav.Link href="/survey/new_survey">New survey</Nav.Link>
				</Nav>
				<Nav className="ms-auto">
					<Navbar.Collapse className="justify-content-end">
						<Nav.Link href="/profile">Profile</Nav.Link>
						<Nav.Link onClick={handleLogout}>Logout</Nav.Link>
					</Navbar.Collapse>
				</Nav>
			</>
		)
	}

	return (
		<>
			<Navbar expand="lg" sticky={"top"} className="bg-body-tertiary">
				<Container>
					<Navbar.Collapse id="basic-navbar-nav">
						{isLoggedIn ? loggedIn() : loggedOut()}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Outlet/>
		</>
	)
}