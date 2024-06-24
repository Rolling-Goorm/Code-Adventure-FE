import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name } from '../styles/styled';

function CorrectAnswer({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const { cntLife, rewardCoin } = location.state || {
    cntLife: 0,
    rewardCoin: 50,
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>{`${rewardCoin}코인을 얻었습니다.`}</Name>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

CorrectAnswer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default CorrectAnswer;
