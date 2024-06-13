import './App.css';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global-styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectLanguage from './pages/SelectLanguage';
import theme from './styles/theme';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
