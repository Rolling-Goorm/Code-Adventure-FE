// src/pages/SelectLanguage.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name, Strong, LanguageButton } from '../styles/styled';
import AvatarImg from '../assets/avatar.png';
import sayImg from '../assets/say.png';

const mockLanguages = [
  {
    id: 1,
    name: 'JAVA',
  },
  {
    id: 2,
    name: 'JAVASCRIPT',
  },
];

const SelectLanguage = ({ setIsLoggedIn }) => {
  const { user } = useContext(AuthContext); // AuthContext 사용
  const [speechBubbleText, setSpeechBubbleText] = useState('');
  const [languages] = useState(mockLanguages); // 목 데이터를 사용
  const [loading] = useState(false);
  const [error] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    if (user) {
      setSpeechBubbleText(
        `${user.nickname}님, 환영합니다! 언어를 선택하고 모험을 시작해요`,
      );
      console.log('User info:', user); // 유저 정보 콘솔에 출력
    }
  }, [user]);

  const navigate = useNavigate();

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    setSpeechBubbleText(`${language.name.toUpperCase()}로 모험 시작하기!!`);
  };

  const handleLanguageMove = () => {
    console.log(`selectLanguage / Type selected: ${selectedLanguage.name}`); // 콘솔 로그 추가
    navigate('/selectCategory', {
      state: {
        languageType: selectedLanguage.name,
        programmingLanguageId: selectedLanguage.id,
      },
    }); // selectStage 페이지로 이동하면서 languageType 상태 전달
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Main.Wrapper>
      <Header isLoggedIn={user} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          사용할 <Strong>언어</Strong>를 선택해주세요
        </Name>
        {languages.map((language) => (
          <LanguageButton
            key={language.id}
            onClick={() => handleLanguageSelection(language)}
          >
            {language.name.toUpperCase()}
          </LanguageButton>
        ))}
        {speechBubbleText && (
          <SpeechBubbleWrapper>
            <Avatar src={AvatarImg} alt="avatarImg" />
            <SpeechBubble>
              <TextWrapper>
                {speechBubbleText}
                {selectedLanguage && (
                  <NextArrow onClick={handleLanguageMove}>→</NextArrow>
                )}
              </TextWrapper>
            </SpeechBubble>
          </SpeechBubbleWrapper>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

SelectLanguage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const SpeechBubbleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 25px;
  position: relative;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  animation: ${bounce} 1s infinite;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.3));
`;

const SpeechBubble = styled.div`
  background-image: url(${sayImg});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 10px 20px 10px 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  width: 300px; /* 말풍선의 너비를 줄임 */
  height: 60px; /* 말풍선의 높이를 줄임 */
  text-align: center;
  font-size: 14px; /* 텍스트 크기를 줄임 */
  position: relative;
  top: -10px;
`;

const TextWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px 0px 50px;
  display: flex;
  flex: 1; /* 남은 공간을 차지하게 설정 */
`;

const NextArrow = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: black;
  font-weight: bold;
  &:hover {
    color: #007bff;
    font-size: 26px;
  }
`;

export default SelectLanguage;
