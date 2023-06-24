import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export function Profile() {

	const nav = useNavigate();
	const {token} = useSelector(state => state.login);
	useEffect(() => {
		if (token !== "") nav("../");
	}, [nav, token]);

	return (
		<h1>This is my profile!</h1>
	)
}