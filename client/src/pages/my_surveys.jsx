import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useDeleteExistingMutation, useGetAllWithLimitsQuery} from "../store/features/survey/surveyApiSlice.js";
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

	const arg = `userId=${user.id}&$skip=${skip}&$limit=${limit}&$sort[createdAt]=${-1}`;
	const surveysWithLimits = useGetAllWithLimitsQuery(arg);
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
					<CustomPagination/>
					</tfoot>
				</Table>
			</div>
		</div>
	)
}

export function SurveyRow(props) {

	const {hash, id, name} = props.survey;
	const nav = useNavigate();
	const [deleteSurvey] = useDeleteExistingMutation();
	const btnStyle = {backgroundColor: "unset", border: "unset", padding: "0 4px 0 4px"};

	return (
		<tr>
			<td><a href={`http://localhost:5173/survey/&?hash=${hash}`}>{name}</a></td>
			<td style={{textAlign: "right"}}>
				<Button name={"checkSurveyAnswers"} style={btnStyle} onClick={() => {
					console.log("checkSurveyAnswers");
					nav(`../../answers/&?hash=${hash}`);
				}}>
					<RiQuestionAnswerLine size={"1.4em"} style={{color: "black"}}/>
				</Button>
				<Button name={"copySurveyLink"} style={btnStyle} onClick={() => {
					navigator.clipboard.writeText(`http://localhost:5173/survey/&?hash=${hash}`).then(
						() => alert("Link copied to clipboard!")
					);
				}}>
					<AiOutlineLink size={"1.4em"} style={{color: "black"}}/>
				</Button>
				<Button name={"editSurvey"} style={btnStyle} onClick={() => {
					nav(`../edit_survey/&?hash=${hash}`);
				}}>
					<AiOutlineEdit size={"1.4em"} style={{color: "blue"}}/>
				</Button>
				<Button name={"deleteSurvey"} style={btnStyle} onClick={() => {
					console.log("deleteSurvey");
					deleteSurvey(id);
					window.location.reload();
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