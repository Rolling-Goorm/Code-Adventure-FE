import './App.css';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import SelectCategory from './pages/SelectCategory';
import SelectStages from './pages/SelectStages';
import CorrectAnswer from './pages/CorrectAnswer';
import theme from './styles/theme';
import Start from './pages/Start';

const queryClient = new QueryClient();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cntLife, setCntLife] = useState(5); // 초기 목숨 5개
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route
              path="selectstages"
              element={
                <SelectStages
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
