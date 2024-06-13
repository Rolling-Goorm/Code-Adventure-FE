import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import CorrectAnswer from './pages/CorrectAnswer';
import theme from './styles/theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cntLife, setCntLife] = useState(5); // 초기 목숨 5개

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route
            path="/selectLanguage"
            element={
              <SelectLanguage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
