import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useGetByHashQuery} from "../store/features/survey/surveyApiSlice.js";

export function Survey() {

	const [searchParams] = useSearchParams();
	const [skip, setSkip] = useState(true);
	let hash = searchParams.get("hash");
	const res = useGetByHashQuery(hash, {skip,});
	useEffect(() => {
		if (hash !== "" && hash !== null) setSkip(false);
		if (res.status === "fulfilled" && res.currentData.data[0]) {
			console.log(res)
		}
	}, [res, hash]);

	return (
		<h1></h1>
	)
}