import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import theme from './styles/theme';
import Start from './pages/Start';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
         <Routes>
          <Route path="/selectLanguage" element={<SelectLanguage />} />\
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
          <Route path="selectStage" element={<SelectStage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
