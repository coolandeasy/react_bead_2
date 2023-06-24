import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export function MySurveys() {

	const nav = useNavigate();
	const {token} = useSelector(state => state.login);
	useEffect(() => {
		if (token !== "") nav("../");
	}, [nav, token]);

	return (
		<h1>These are my surveys!</h1>
	)
}