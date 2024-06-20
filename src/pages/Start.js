import React, { useContext } from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';
import styled from 'styled-components';
import { AuthContext } from '../components/AuthContext';
import { Name } from '../styles/StartStyle';
import Header from '../components/Header';
import { Spacer } from '../styles/StartStyle';
import { useNavigate } from 'react-router-dom';
import loginbtn from '../assets/LoginButton.png';

const LoginButton = styled.img`
  width: 300px;
  height: 150px;
  background-image: url(${loginbtn});
  z-index: 999;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));
  cursor: pointer;
  transition:
    transform 0.3s ease-in-out,
    filter 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.3));
  }

  &:active {
    transform: scale(0.95);
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.3));
  }
`;

function Start(setIsLoggedIn) {
  const { user } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/Signin');
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent hasCloudAnimation={true}>
        <Name>Code Adventure</Name>
        <Spacer />
        <LoginButton onClick={handleLoginClick} />
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Start;
