import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name } from '../styles/styled';

function CorrectAnswer({ isLoggedIn, setIsLoggedIn, cntLife }) {
  const rewardCoin = cntLife * 10;

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>{`${rewardCoin}을 얻었습니다.`}</Name>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

CorrectAnswer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  cntLife: PropTypes.number.isRequired,
};

export default CorrectAnswer;
