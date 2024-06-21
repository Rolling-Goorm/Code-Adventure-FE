import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './components/AuthContext';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import SelectCategory from './pages/SelectCategory';
import SelectStages from './pages/SelectStages';
import GameInfo from './pages/GameInfo';
import Solve from './pages/Solve';
import CorrectAnswer from './pages/CorrectAnswer';
import WrongAnswer from './pages/WrongAnswer';
import theme from './styles/theme';
import Start from './pages/Start';
import Mypages from './pages/Mypages';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  const [cntLife, setCntLife] = useState(5); // 초기 목숨 5개

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/gameinfo" element={<GameInfo />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypages" element={<Mypages />} />
            <Route path="/selectLanguage" element={<SelectLanguage />} />
            <Route path="/selectcategory" element={<SelectCategory />} />
            <Route
              path="/solve"
              element={<Solve cntLife={cntLife} setCntLife={setCntLife} />}
            />
            <Route
              path="/correctAnswer"
              element={<CorrectAnswer cntLife={cntLife} />}
            />
            <Route
              path="/wrongAnswer"
              element={<WrongAnswer cntLife={cntLife} />}
            />
            <Route path="/selectstages" element={<SelectStages />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
