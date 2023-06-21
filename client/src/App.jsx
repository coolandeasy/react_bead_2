// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {NavBar} from "./navbar.jsx";
import {Home} from "./pages/home.jsx";
import {NewSurvey} from "./pages/new_survey.jsx";
import {MySurveys} from "./pages/my_surveys.jsx";
import {Survey} from "./pages/survey.jsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<NavBar />}>
                    <Route index element={<Home/>} />
                    <Route path={"survey/"}>
                        <Route path={"new_survey"} element={<NewSurvey />}/>
                        <Route path={"my_surveys"} element={<MySurveys />}/>
                        <Route path={"*"} element={<Survey />}/>
                    </Route>
                    <Route path={"answers"} element={"Answers"}/>
                    <Route path={"profile"} element={"Profile"}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
