import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import SelectCategory from './pages/SelectCategory';
import SelectStages from './pages/SelectStages';
import CorrectAnswer from './pages/CorrectAnswer';
import theme from './styles/theme';
import Start from './pages/Start';
import Mypages from './pages/Mypages';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cntLife, setCntLife] = useState(5); // 초기 목숨 5개
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="/selectLanguage"
            element={
              <SelectLanguage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="selectcategory" element={<SelectCategory />} />
          <Route
            path="/correctAnswer"
            element={
              <CorrectAnswer
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                cntLife={cntLife}
              />
            }
          />
          <Route path="selectstages" element={<SelectStages />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
