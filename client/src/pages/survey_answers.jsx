import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useGetAllForSurveyQuery} from "../store/features/result/resultApiSlice.js";

export function SurveyAnswers() {

//["Answer1", "Answer2", "Answer3", "Answer4"]

	const [searchParams] = useSearchParams();
	let id = searchParams.get("surveyId");
	const result = useGetAllForSurveyQuery(id);
	let resultData = [[]];
	let surveyName = "";

	if (result.status === "fulfilled" && result.currentData.data[0] !== undefined) {
		surveyName = result.currentData.data[0].survey.name;
		let results = result.currentData.data;
		let questions = JSON.parse(results[0].survey.content).map(page => {
			return page.questions;
		}).flat();
		let arr = n => Array(n).fill([]);
		let answers = arr(questions.length);
		let contents = results.map(result => JSON.parse(result.content));
		answers = answers.map((_, i) => contents.map((content) => content[i]));
		resultData = [questions, answers];
		console.log(resultData);
	} else {
		surveyName = "There are no answers yet!";
	}

	const nav = useNavigate();
	const {token} = useSelector(state => state.user);
	useEffect(() => {
		if (token === "" || id === null) nav("../");
	}, [nav, token, id]);

	return (
		<div className={"background-plate"} style={{width: "75%"}}>
			<h1>Answers</h1>
			<h3 style={{textAlign: "left"}}>{surveyName}</h3>
			<CustomAnswerList data={resultData}/>
		</div>
	)
}

function CustomAnswerList({data}) {
	console.log(data)
	return (
		<>
			{data[0].map((q, i) => {
				return (
					<div key={q} className={"box"}>
						<p>{q}</p>
						{data[1][i].map(a => {
							return (
								<div key={q + a} className={"box"}>
									<p>{a}</p>
								</div>
							)
						})}
					</div>
				)
			})}
		</>
	)
}