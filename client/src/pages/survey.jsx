import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useGetByHashQuery} from "../store/features/survey/surveyApiSlice.js";
import {Form, FloatingLabel, FormControl, FormText} from "react-bootstrap";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {useCreateNewResultForSurveyMutation} from "../store/features/result/resultApiSlice.js";

export function Survey() {

	const [surveyData, setSurveyData] = useState(
		{name: "New survey", pages: [{name: "", questions: []}]}
	);
	const [createResult, createResultResponse] = useCreateNewResultForSurveyMutation();
	const [page, setPage] = useState(0);
	const [searchParams] = useSearchParams();
	const [skip, setSkip] = useState(true);
	let hash = searchParams.get("hash");
	const survey = useGetByHashQuery(hash, {skip,});
	useEffect(() => {
		if (hash !== "" && hash !== null) setSkip(false);
		if (survey.status === "fulfilled" && survey.currentData.data[0]) {
			let data = survey.currentData.data[0];
			setSurveyData({name: data.name, pages: JSON.parse(data.content)});
		}
	}, [survey, hash]);


	if (document.querySelector("#page" + page) !== null) {
		document.querySelectorAll(".page").forEach(e => e.style.display = "none");
		document.querySelector("#page" + page).style.display = "block";
	}

	const [formData, setFormData] = useState([]);

	const handleSubmit = (event) => {
		event.preventDefault();
		createResult({
			content: JSON.stringify(formData.flat()),
			surveyId: survey.currentData.data[0].id
		});
	}

	const validatePage = () => {
		let x, valid = true;
		x = document.querySelectorAll(".page");
		let data = [];
		x[page].querySelectorAll("input").forEach((inp) => {
			console.log(
				"page_no: " + inp.name.split("_")[0],
				", question: " + inp.name.split("_")[1],
				", value: " + inp.value
			);
			if (inp.value === "") {
				inp.className += " invalid";
				valid = false;
			} else {
				data.push(inp.value);
			}
		});
		if (valid) {
			document.querySelectorAll(".step")[page].color = "success";
			let fdata = formData;
			fdata.push(data);
			setFormData(fdata);
		}
		return valid;
	}

	return (
		<div className={"background-plate"} style={{width: "35%"}}>
			<h1>{`${surveyData.name}`}</h1>
			<div className={"grow-wrap"} id={"surveyForm"} style={{gap: "8px"}}>
				<Stack spacing={0.5} direction={"row"} justifyContent={"center"}>
					{surveyData.pages.map((p, i) => {
						return (
							<Button
								className={"step"}
								type={"button"}
								form={"formPage"}
								key={p.name + i}
								variant={"contained"}
								onClick={() => {
									if (validatePage())
										setPage(i);
								}}
								style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
								color={page === i ? "warning" : "primary"}
							>{i + 1}</Button>
						)
					})}
				</Stack>
				<div>
					<Form id={"formPage"} method={"POST"} onSubmit={handleSubmit}>
						{surveyData.pages.map((p, i) => {
							return (
								<SurveyPage key={p + i} page={i} data={surveyData.pages[i]}/>
							)
						})}
					</Form>
					<div>
						<Button
							type={"button"}
							style={{float: "left", marginLeft: "3em"}}
							onClick={() => setPage(page - 1)}
							disabled={page < 1}
							variant={"outlined"}
							color={"success"}
						>Back</Button>
						<Button
							form={"formPage"}
							type={"button"}
							style={{float: "right", marginRight: "3em"}}
							onClick={() => {
								if (validatePage())
									if (page + 1 <= surveyData.pages.length - 1) {
										setPage(page + 1);
									} else {
										console.log("else branch")
										console.log(page, surveyData.pages.length - 1)
										document.querySelector("#formPage").requestSubmit();
									}
							}}
							variant={"outlined"}
							color={"success"}
						>{(page + 1 <= surveyData.pages.length - 1) ? "NEXT" : "SUBMIT"}</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

function SurveyPage({data, page}) {

	return (
		<div id={"page" + page} className={"page"}>
			<FormText>{data.name}</FormText>
			{data.questions.map((q, i) => {
				return (
					<Form.Group key={q + i} controlId={page + "_" + q}>
						<FloatingLabel label={q} className={"w-75 m-auto mb-1"}>
							<FormControl type="text" name={q}/>
						</FloatingLabel>
					</Form.Group>
				)
			})}
		</div>
	)
}