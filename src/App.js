import './App.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import theme from './styles/theme';
import Start from './pages/Start';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/selectLanguage" element={<SelectLanguage />} />\
          <Route path="/" element={<Start />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
