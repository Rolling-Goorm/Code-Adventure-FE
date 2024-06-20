import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Api } from '../api/ApiClient.ts';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Main from '../components/Main';
import Header from '../components/Header';
import { Name, Strong, LanguageButton } from '../styles/styled';
import AvatarImg from '../assets/avatar.png';
import sayImg from '../assets/say.png';

// Initialize the API client
const api = new Api();

// API에서 프로그래밍 언어 목록을 가져오는 함수
const fetchProgrammingLanguages = async () => {
  console.log('Fetching programming languages...');
  try {
    const response = await api.programmingLanguage.programmingLanguageList();
    console.log('API response:', response);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

const SelectLanguage = ({ isLoggedIn, setIsLoggedIn }) => {
  const {
    data: languages,
    isLoading,
    error,
  } = useQuery('programmingLanguages', fetchProgrammingLanguages);
  const [languageType, setLanguageType] = useState('');
  const navigate = useNavigate();

  const handleLanguageSelection = (language) => {
    setLanguageType(language);
  };

  const handleLanguageMove = () => {
    navigate('/selectCategory', { state: { languageType } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Main.Wrapper>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Layout.PageContent>
        <Name>
          사용할 <Strong>언어</Strong>를 선택해주세요
        </Name>
        {languages.map((language) => (
          <LanguageButton
            key={language.id}
            onClick={() => handleLanguageSelection(language.id)}
          >
            {language.name.toUpperCase()}
          </LanguageButton>
        ))}
        {languageType && (
          <SpeechBubbleWrapper>
            <Avatar src={AvatarImg} alt="avatarImg" />
            <SpeechBubble>
              <TextWrapper>
                {languageType.toUpperCase()}로 모험 시작하기
                <NextArrow onClick={handleLanguageMove}>→</NextArrow>
              </TextWrapper>
            </SpeechBubble>
          </SpeechBubbleWrapper>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

SelectLanguage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
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
  width: 300px;
  height: 60px;
  text-align: center;
  font-size: 14px;
  position: relative;
  top: -10px;
`;

const TextWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 5px 0px 0px 50px;
  display: flex;
  flex: 1;
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
