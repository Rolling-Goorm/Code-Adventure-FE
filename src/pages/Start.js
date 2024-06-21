// src/pages/Start.js
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
import avatar from '../assets/avatar.png'; // 픽셀 캐릭터 이미지

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

const PixelCharacter = styled.img`
  width: 150px;
  height: auto;
  z-index: 999;
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const ProgressItem = styled.div`
  z-index: 999;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-shadow:
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;
`;

const UserInfo = styled.div`
  z-index: 999;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-shadow:
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
    1px 1px 0 #fff;
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

const StartButton = styled.button`
  z-index: 1000;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
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

  const handleStartClick = () => {
    navigate('/selectLanguage');
  };

  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent hasCloudAnimation={true}>
        <Name>Code Adventure</Name>

        {user ? (
          <UserProgress>
            <PixelCharacter src={avatar} alt="Pixel Character" />
            <ProgressWrapper>
              <UserInfo>닉네임: {user.nickname}</UserInfo>
              <UserInfo>아이디: {user.loginId}</UserInfo>
              <UserInfo>선호언어: {user.preferredLanguage}</UserInfo>
              {user.progress && user.progress.length > 0 ? (
                user.progress.map((item, index) => (
                  <ProgressItem key={index}>
                    {item.category}: {item.progress}%
                  </ProgressItem>
                ))
              ) : (
                <ProgressItem>
                  진행상황: 언어 선택후 게임을 진행해주세요.
                </ProgressItem>
              )}
              <StartButton onClick={handleStartClick}>
                모험하러가기!
              </StartButton>
            </ProgressWrapper>
          </UserProgress>
        ) : (
          <>
            <LoginButton src={loginbtn} onClick={handleLoginClick} />
            <SpeechBubbleLeft src={leftSpeech} onClick={handleSpeechClick} />
            <SpeechBubbleRight src={rightSpeech} onClick={handleSpeechClick} />
          </>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
}

// 스타일 컴포넌트
const UserProgress = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;

export default Start;
