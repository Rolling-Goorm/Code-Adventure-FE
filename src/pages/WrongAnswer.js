import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name } from '../styles/styled';
import { useLocation } from 'react-router-dom';

function WrongAnswer({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();
  const { cntLife } = location.state || { cntLife: 0 };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>{`목숨이 다 소진되었습니다. 다시 공부하고 시도해보세요!`}</Name>
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

WrongAnswer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default WrongAnswer;
