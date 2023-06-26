import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useGetByHashQuery} from "../store/features/survey/surveyApiSlice.js";
import {Form, FloatingLabel, FormControl, FormText} from "react-bootstrap";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export function Survey() {

	const [surveyData, setSurveyData] = useState(
		{name: "New survey", pages: [{name: "", questions: []}]}
	);
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

	return (
		<div className={"background-plate"} style={{width: "35%"}}>
			<h1>{`${surveyData.name}`}</h1>
			<div className={"grow-wrap"} id={"surveyForm"} style={{gap: "8px"}}>
				<Stack spacing={0.5} direction={"row"} justifyContent={"center"}>
					{surveyData.pages.map((p, i) => {
						return(
							<Button
								type={"button"}
								key={p.name + i}
								variant={"contained"}
								style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
								color={page === i ? "warning" : "primary"}
								onClick={() => {
									if (document.querySelector("#page"+page).checkValidity())
										setPage(i);
								}}
							>{i + 1}</Button>
						)
					})}
				</Stack>
				<div>
					{surveyData.pages.map((p, i) => {
						return (
							<Form key={p + i} id={"page" + i} className={"page"} onSubmit={(e) => e.preventDefault() }>
								<SurveyPage page={page} data={surveyData.pages[page]}/>
							</Form>
						)
					})}
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
							type={"submit"}
							style={{float: "right", marginRight: "3em"}}
							onClick={() => {
								if (document.querySelector("#page"+page).checkValidity())
									setPage(page + 1);
							}}
							disabled={page >= surveyData.pages.length - 1}
							variant={"outlined"}
							color={"success"}
						>Next</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

function SurveyPage({ data, page }) {

	if (data.name !== "") {
		document.querySelectorAll(".page").forEach(e => e.style.display = "none");
		document.querySelector("#page" + page).style.display = "block";
	}

	return (
		<>
			<FormText>{data.name}</FormText>
			{data.questions.map((q, i) => {
				return (
					<FloatingLabel key={q + i} label={q} className={"w-75 m-auto mb-1"}>
						<FormControl type="text" required name={q+i}/>
					</FloatingLabel>
				)
			})}
		</>
	)
}