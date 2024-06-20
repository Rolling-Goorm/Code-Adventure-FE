import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name } from '../styles/styled';

function WrongAnswer({ isLoggedIn, setIsLoggedIn, cntLife }) {
  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>{`${cntLife}의 목숨이 남았습니다.`}</Name>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

WrongAnswer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  cntLife: PropTypes.number.isRequired,
};

export default WrongAnswer;
