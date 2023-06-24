import {Button, FloatingLabel, Form, FormControl, FormText} from "react-bootstrap";
import "../style/main.css";
import {useNewUserMutation} from "../store/features/login/loginApiSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function Register() {

	const nav = useNavigate();
	const [newUser, registerResp] = useNewUserMutation();
	const {exists, success, pending, token} = useSelector(state => state.login);

	const formSubmit = (event) => {
		event.preventDefault()
		const name = event.target.name.value;
		const mail = event.target.email.value;
		const pw = event.target.password.value;
		newUser({
			fullname: name,
			email: mail,
			password: pw
		});
	};

	useEffect(() => {
		if (success) setTimeout(() => {
			nav("../login");
		}, 1500);
		if (token !== "") nav("../");
	}, [nav, success, token]);

	const existsEle = <FormText className={"text-danger"}>Profile with this email already exists!<br/></FormText>;
	const registerSuccess = <FormText className={"text-success"}>Registration successful!<br/></FormText>;

	return (
		<div className={"background-plate"}>
			<Form className={"justify-content-center"} method={"POST"} onSubmit={formSubmit}>
				<h2>Register</h2>
				<FloatingLabel label={"Full name"} className={"w-75 m-auto mb-1"}>
					<FormControl type="text" name={"name"} required placeholder={"My Full Name"}/>
				</FloatingLabel>
				<FloatingLabel label={"Email"} className={"w-75 m-auto mb-1"}>
					<FormControl type="email" name={"email"} required placeholder={"email@provider.com"}/>
				</FloatingLabel>
				<FloatingLabel label={"Password"} className={"w-75 m-auto mb-1"}>
					<FormControl type="password" name={"password"} required placeholder={"Password"}/>
				</FloatingLabel>
				{exists ? existsEle : ""}
				{success ? registerSuccess : ""}
				<Button disabled={pending} type="submit">Submit</Button>
			</Form>
		</div>
	)
}