import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./navbar.jsx";
import {Home} from "./pages/home.jsx";
import {NewSurvey} from "./pages/new_survey.jsx";
import {MySurveys} from "./pages/my_surveys.jsx";
import {Survey} from "./pages/survey.jsx";
import {Login} from "./pages/login.jsx";
import {Answers} from "./pages/answers.jsx";
import {Profile} from "./pages/profile.jsx";
import {Register} from "./pages/register.jsx";
import {SurveyAnswers} from "./pages/survey_answers.jsx";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<NavBar/>}>
					<Route index element={<Home/>}/>
					<Route path={"survey"}>
						<Route path={"new_survey"} element={<NewSurvey/>}/>
						<Route path={"edit_survey/*"} element={<NewSurvey/>}/>
						<Route path={"my_surveys"} element={<MySurveys/>}/>
						<Route path={"*"} element={<Survey/>}/>
					</Route>
					<Route path={"answers/*"} element={<SurveyAnswers/>}/>
					<Route path={"answers"} element={<Answers/>}/>
					<Route path={"profile"} element={<Profile/>}/>
					<Route path={"login"} element={<Login/>}/>
					<Route path={"register"} element={<Register/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
