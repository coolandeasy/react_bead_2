import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Button, FloatingLabel, FormControl} from "react-bootstrap";
import {persistor} from "../store/store.js";
import {useGetSurveysCountQuery} from "../store/features/user/userApiSlice.js";

export function Profile() {

	const handleLogout = (e) => {
		e.preventDefault();
		console.log("Fuck you, Ezekiel!");
		// store.dispatch(userSlice.actions.logout());
		persistor.purge().then(() => nav("../login"));
	};

	const nav = useNavigate();
	const {token, user} = useSelector(state => state.user);
	useEffect(() => {
		if (token === "") nav("../");
	}, [nav, token]);

	const surveys = useGetSurveysCountQuery(user.id);
	let surveyCount = 0;
	if (surveys.status === 'fulfilled') {
		surveyCount = surveys.currentData.total;
	}

	return (
		<div className={"background-plate"} style={{width: "40%", height: "30%"}}>
			<h3>This is {user.fullname}&apos;s profile</h3>
			<FloatingLabel label={"Full name"} className={"w-50 m-auto mb-1"}>
				<FormControl type="text" name={"name"} readOnly={true} value={user.fullname}/>
			</FloatingLabel>
			<FloatingLabel label={"Email"} className={"w-50 m-auto mb-1"}>
				<FormControl type="email" name={"email"} readOnly={true} value={user.email}/>
			</FloatingLabel>
			<FloatingLabel label={"Survey count"} className={"w-50 m-auto mb-1"}>
				<FormControl type="email" name={"email"} readOnly={true} value={surveyCount}/>
			</FloatingLabel>
			<Button type="submit" className={"btn-danger"} onClick={handleLogout}>Log out</Button>
		</div>
	)
}