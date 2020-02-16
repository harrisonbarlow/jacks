import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { Nav, Navbar} from 'react-bootstrap';

class Header extends Component {
	render() {
		return(
			<Navbar bg="light" expand="lg">
			  <Navbar.Brand href="/">
			  	<img src={logo} alt="logo" />
			  </Navbar.Brand>
			  <Navbar.Toggle aria-controls="basic-navbar-nav" />
			  <Navbar.Collapse id="basic-navbar-nav">
			    <Nav className="mr-auto">
			      <Nav.Link href="/">Home</Nav.Link>
			      <Nav.Link href="/drillholes">Drill Holes</Nav.Link>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;