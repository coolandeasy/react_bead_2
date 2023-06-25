import {useNavigate, useSearchParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
	useCreateNewMutation,
	useGetByHashQuery,
	useModifyExistingMutation
} from "../store/features/survey/surveyApiSlice.js";

export function NewSurvey() {

	const [surveyData, setSurveyData] = useState({name: "New survey", body: ""});

	const [searchParams] = useSearchParams();
	const [skip, setSkip] = useState(true);
	let hash = searchParams.get("hash");
	const res = useGetByHashQuery(hash, {skip,});

	const [createSurvey] = useCreateNewMutation();
	const [ID, setID] = useState(0);
	const [modifySurvey] = useModifyExistingMutation(ID, {skip,});

	const nav = useNavigate();
	const {token} = useSelector(state => state.user);
	useEffect(() => {
		if (token === "") nav("../");
		if (hash !== "" && hash !== null) setSkip(false);
		if (res.status === "fulfilled" && res.currentData.data[0]) {
			setID(res.currentData.data[0].id);
			let data = res.currentData.data[0];
			let body = JSON.parse(data.content);
			let name = data.name;
			let content = `${name}\n\n`;
			body.forEach((page, i) => {
				content += page.name + "\n";
				page.questions.forEach((q, i) => {
					content += q + (i === page.questions.length ? "" : "\n");
				});
				content += (i === (body.length - 1)) ? "" : "\n";
			});
			document.querySelector("#surveyForm").dataset.replicatedValue = content.trim();
			document.querySelector("#text").value = content.trim();
			setSurveyData({name: name, body: content.trim()});
		}
	}, [res, hash, nav, token]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = e.target[0].value.trim();
		let pagesData = data.split("\n\n");
// target object
// {name: "survey", content: [{name: "page1", questions: ["question1", "question2"]}, {name: "page2", questions: ["question3", "question4"]}]}
		let survey = {}; // the outer object
		let pages = []; // list of pages
		pagesData.forEach((page, idx) => {
			let sData = page.split("\n");
			if (idx === 0) {
				survey["name"] = sData[0];
			} else {
				let page = {};
				let questions = [];
				sData.forEach((q, i) => {
					if (i > 0) {
						questions.push(q);
					}
				});
				page["name"] = sData[0];
				page["questions"] = questions;
				pages.push(page);
			}
		});
		survey["content"] = pages;
		if (skip) { // new survey
			createSurvey({
				name: survey.name,
				content: JSON.stringify(survey.content)
			});
		} else { // edited survey
			modifySurvey({
				data: {
					name: survey.name,
					content: JSON.stringify(survey.content)
				}, id: ID
			});
		}
		document.querySelector("#text").disabled = true;
		alert("Survey successfully " + (skip ? "created!" : "modified!"));
		setTimeout(() => {
			nav("../my_surveys");
		}, 500);
	};

	return (
		<div className={"background-plate"} style={{width: "75%"}}>
			<h1>{`${surveyData.name}`}</h1>
			<Form className={"grow-wrap"} id={"surveyForm"} method={"POST"} onSubmit={handleSubmit}>
				<Form.Control
					name={"text"}
					id={"text"}
					as="textarea"
					style={{resize: "none"}}
					// value={surveyData.body}
					onInput={(e) => e.target.parentNode.dataset.replicatedValue = e.target.value}
				/>
				<Button
					type={"submit"}
					name={"submit"}
					className={"btn-success"}
					style={{width: "8em", margin: "8px auto 0 auto"}}
				>Submit survey</Button>
			</Form>
		</div>
	)
}

/* for testing purposes
survey

page1
question1
question2

page2
question3
question4
*/