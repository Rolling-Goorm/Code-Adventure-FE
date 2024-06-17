import React from 'react';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name, Strong } from '../styles/styled';

function SelectStage({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          <Strong>스테이지</Strong>를 선택해주세요
        </Name>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

SelectStage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};
export default SelectStage;
