import './App.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import CorrectAnswer from './pages/CorrectAnswer';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/selectLanguage" element={<SelectLanguage />} />
          <Route path="/correctAnswer" element={<CorrectAnswer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
