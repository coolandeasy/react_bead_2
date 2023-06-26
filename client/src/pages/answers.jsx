import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import Table from "react-bootstrap/Table";
import {CustomPagination} from "../components/CustomPagination.jsx";
import {useGetAllWithLimitsQuery} from "../store/features/survey/surveyApiSlice.js";
import {useGetAllResultForSurveyQuery} from "../store/features/result/resultApiSlice.js";
import {InputBase} from "@mui/material";

export function Answers() {

	const nav = useNavigate();
	const {token, user} = useSelector(state => state.user);
	const {limit, skip} = useSelector(state => state.survey);

	useEffect(() => {
		if (token === "") nav("../../");
	}, [nav, token]);

	const arg = `userId=${user.id}&$skip=${skip}&$limit=${limit}&$sort[createdAt]=${-1}`;
	const surveysWithLimits = useGetAllWithLimitsQuery(arg);
	let surveyList = [];
	if (surveysWithLimits.status === 'fulfilled') {
		surveyList = surveysWithLimits.currentData.data;
	}

	return (
		<div className={"background-plate"} style={{width: "55%"}}>
			<h3>Answers</h3>
			<div style={{maxHeight: "550px", overflowX: "auto"}}>
				<Table striped hover borderless>
					<thead>
					<tr>
						<th>Name</th>
						<th style={{textAlign: "right"}}>Answers</th>
					</tr>
					</thead>
					<tbody>
					{generateTableBody(surveyList)}
					</tbody>
					<tfoot>
					<CustomPagination/>
					</tfoot>
				</Table>
			</div>
		</div>
	)
}

export function SurveyRow(props) {

	const {hash, id, name} = props.survey;
	const surveyResults = useGetAllResultForSurveyQuery(id);
	if (surveyResults.status === "fulfilled") {
		// console.log(surveyResults);
		document.querySelector("#count" + id).value = surveyResults.currentData.total;
	}

	return (
		<tr>
			<td><a href={`http://localhost:5173/answers/&?surveyId=${id}`}>{name}</a></td>
			<td style={{textAlign: "right"}}>
				<InputBase
					id={"count" + id}
					readOnly={true}
					size={"small"}
					inputProps={{min: 0, style: {textAlign: 'right', marginRight: '2em'}}}
				/>
			</td>
		</tr>
	)
}

function generateTableBody(surveys) {
	if (surveys !== [] && surveys.length > 0) {
		return surveys.map((survey) => (<SurveyRow key={survey.id} survey={survey}/>));
	}
	return (
		<tr>
			<td colSpan={2}><h6>No custom tests are available. Add some!</h6></td>
		</tr>
	);
}