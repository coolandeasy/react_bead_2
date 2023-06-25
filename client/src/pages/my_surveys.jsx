import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useGetAllWithLimitsQuery} from "../store/features/survey/surveyApiSlice.js";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {AiOutlineDelete, AiOutlineEdit, AiOutlineLink} from "react-icons/ai";
import {RiQuestionAnswerLine} from "react-icons/ri";
import {CustomPagination} from "../components/CustomPagination.jsx";

export function MySurveys() {

	const nav = useNavigate();
	const {token, user} = useSelector(state => state.user);
	const {limit, skip} = useSelector(state => state.survey);

	useEffect(() => {
		if (token === "") nav("../../");
	}, [nav, token]);

	const surveysWithLimits = useGetAllWithLimitsQuery(
		`userId=${user.id}&$skip=${skip}&$limit=${limit}&$sort[createdAt]=${-1}`
	);
	let surveyList = [];
	if (surveysWithLimits.status === 'fulfilled') {
		surveyList = surveysWithLimits.currentData.data;
	}

	return (
		<div className={"background-plate"} style={{width: "55%"}}>
			<h3>My Surveys</h3>
			<div style={{maxHeight: "550px", overflowX: "auto"}}>
				<Table striped hover borderless>
					<thead>
						<tr>
							<th>Name</th>
							<th style={{textAlign: "right"}}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{generateTableBody(surveyList)}
					</tbody>
					<tfoot>
						<CustomPagination />
					</tfoot>
				</Table>
			</div>
		</div>
	)
}

export function SurveyRow(props) {

	const {content, createdAt, hash, id, name, user, userId} = props.survey;
	const btnStyle = {backgroundColor: "unset", border: "unset", padding: "0 4px 0 4px"};
	return (
		<tr>
			<td><a href={`http://localhost:5173/survey/${hash}`}>{name}</a></td>
			<td style={{textAlign: "right"}}>
				<Button name={"checkSurveyComments"} style={btnStyle} onClick={() => {
					console.log("checkSurveyComments");
				}}>
					<RiQuestionAnswerLine size={"1.4em"} style={{color: "black"}}/>
				</Button>
				<Button name={"copySurveyLink"} style={btnStyle} onClick={() => {
					console.log("copySurveyLink");
					navigator.clipboard.writeText(`http://localhost:5173/survey/${hash}`).then(
						() => alert("Link copied to clipboard!")
					);
				}}>
					<AiOutlineLink size={"1.4em"} style={{color: "black"}}/>
				</Button>
				<Button name={"editSurvey"} style={btnStyle} onClick={() => {
					console.log("editSurvey");
				}}>
					<AiOutlineEdit size={"1.4em"} style={{color: "blue"}}/>
				</Button>
				<Button name={"deleteSurvey"} style={btnStyle} onClick={() => {
					console.log("deleteSurvey");
				}}>
					<AiOutlineDelete size={"1.4em"} style={{color: "red"}}/>
				</Button>
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