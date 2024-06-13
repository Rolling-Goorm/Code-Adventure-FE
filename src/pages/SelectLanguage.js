import React from 'react';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name, Strong, LanguageButton } from '../components/styled';

function SelectLanguage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          사용할 <Strong>언어</Strong>를 선택해주세요
        </Name>
        <LanguageButton>JAVA</LanguageButton>
        <LanguageButton>JAVASCRIPT</LanguageButton>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

SelectLanguage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SelectLanguage;
