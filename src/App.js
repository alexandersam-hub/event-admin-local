import logo from './logo.svg';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import GamePage from "./Pages/GamePage/GamePage";
import QuizPage from "./Pages/QuizPage/QuizPage";
import React, {useState} from "react";
import Cookies from 'js-cookie';
import AuthPage from "./Pages/AuthPage/AuthPage";
import fm from './font/montserrat/stylesheet.css'
import fg from './font/gilroy/stylesheet.css'

function App() {
    const [token, setToken] = useState(Cookies.get('token'))
    console.log('token', token)
  return (
    <div className="App">
      <BrowserRouter>
          {token?
        <Routes>

              <Route path='/' element={<GamePage/>}/>
              <Route path='/:room' element={<QuizPage />}/>
          {/*<Route path='/quiz/:id/:room' element={<QuestionPage />}/>*/}
        </Routes>:
              <Routes>
                  <Route path='/' element={<AuthPage />}/>
                  {/*<Route path='/quiz/:id/:room' element={<QuestionPage />}/>*/}
              </Routes>
          }
      </BrowserRouter>
    </div>
  );
}

export default App;
