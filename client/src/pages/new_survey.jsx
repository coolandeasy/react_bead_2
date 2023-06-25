import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export function NewSurvey() {

	const nav = useNavigate();
	const {token} = useSelector(state => state.user);
	console.log(token)
	useEffect(() => {
		if (token === "") nav("../");
	}, [nav, token]);

	return (
		<h1>This is a new survey!</h1>
	)
}