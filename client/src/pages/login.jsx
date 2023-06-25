import {Button, FloatingLabel, Form, FormControl, FormText} from "react-bootstrap";
import "../style/main.css";
import {Link, useNavigate} from "react-router-dom";
import {useLoginUserMutation} from "../store/features/user/userApiSlice.js";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export function Login() {

	const nav = useNavigate();
	const {success, pending, token} = useSelector(state => state.user);
	const [loginUser, loginResp] = useLoginUserMutation();

	// console.log(success, pending, token)

	const formSubmit = (event) => {
		event.preventDefault()
		const mail = event.target.email.value;
		const pw = event.target.password.value;
		loginUser({
			email: mail,
			password: pw,
			strategy: "local"
		});
	};

	useEffect(() => {
		if (success) {
			const btn = document.querySelector("#submit");
			btn.disabled = true;
			setTimeout(() => {
				nav("../");
				btn.disabled = false;
			}, 500);
		}
	}, [nav, success, token]);

	const failed = <FormText className={"text-danger"}>Profile with this email and password combination does not
		exist!<br/></FormText>;
	const succeeded = <FormText className={"text-success"}>Login successful!!<br/></FormText>;

	return (
		<div className={"background-plate"}>
			<Form className={"justify-content-center"} method={"POST"} onSubmit={formSubmit}>
				<h2>Login</h2>
				<FloatingLabel label={"Email"} className={"w-75 m-auto mb-1"}>
					<FormControl type="email" name={"email"} required placeholder={"email@provider.com"}/>
				</FloatingLabel>
				<FloatingLabel label={"Password"} className={"w-75 m-auto mb-1"}>
					<FormControl type="password" name={"password"} required placeholder={"Password"}/>
				</FloatingLabel>
				{success !== null ? (success === false ? failed : succeeded) : ""}
				<Button disabled={pending} type="submit" id={"submit"}>Submit</Button>
				<br/>
				<p>Not a member? <Link to={"../register"}>Register</Link></p>
			</Form>
		</div>
	)
}