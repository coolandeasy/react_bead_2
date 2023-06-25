import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

export function Answers() {

	const nav = useNavigate();
	const {token} = useSelector(state => state.user);
	useEffect(() => {
		if (token === "") nav("../");
	}, [nav, token]);

	return (
		<h1>This are the answers!</h1>
	)
}