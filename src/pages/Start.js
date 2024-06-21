import React, { useContext } from 'react';
import Layout from '../components/Layout';
import Main from '../components/Main';
import styled, { keyframes } from 'styled-components';
import { AuthContext } from '../components/AuthContext';
import { Name } from '../styles/StartStyle';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import loginbtn from '../assets/LoginButton.png';
import leftSpeech from '../assets/leftSpeech.gif';
import rightSpeech from '../assets/rightSpeech.gif';

// 애니메이션 설정
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// 스타일 컴포넌트 설정
const LoginButton = styled.img`
  margin-top: 150px;
  width: 300px;
  height: 150px;
  z-index: 999;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const SpeechBubbleLeft = styled.img`
  position: absolute;
  top: 35%;
  left: 10%;
  width: 300px;
  height: auto;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
  animation: ${bounce} 2s infinite;
  cursor: pointer;
  pointer-events: auto;
  z-index: 999;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.3);
  }
`;

const SpeechBubbleRight = styled.img`
  position: absolute;
  top: 35%;
  right: 10%;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15));
  width: 150px;
  height: auto;
  z-index: 999;
  animation: ${bounce} 2s infinite;
  cursor: pointer;
  pointer-events: auto;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.3);
  }
`;

function Start(setIsLoggedIn) {
  const { user } = useContext(AuthContext); // AuthContext 사용
  const navigate = useNavigate(); // useNavigate hook 사용

  const handleSpeechClick = (e) => {
    e.preventDefault();
    navigate('/gameinfo');
  };

  const handleLoginClick = () => {
    navigate('/Signin');
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent hasCloudAnimation={true}>
        <Name>Code Adventure</Name>

        <LoginButton src={loginbtn} onClick={handleLoginClick} />
        <SpeechBubbleLeft src={leftSpeech} onClick={handleSpeechClick} />
        <SpeechBubbleRight src={rightSpeech} onClick={handleSpeechClick} />
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

export default Start;
