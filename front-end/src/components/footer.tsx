'use client'
import { Container, Navbar } from "react-bootstrap";

import './componentGlobal.css';

export default function Footer() {
    
	return (
		<Navbar id="footer">
		<Container fluid className="">
			<Navbar.Brand href="" className="">
			</Navbar.Brand>
			<Navbar.Text>© Tran Dang 2023. All rights reserved</Navbar.Text>
			<Navbar.Toggle />
		</Container>
	</Navbar>
	)
}